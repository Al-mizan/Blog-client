import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userService } from './services/user.service';
import { Roles } from './constants/roles';


export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    let isAuthenticated = false;
    let isAdmin = false;

    const { data } = await userService.getSession();
    // console.log(data);

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user?.role === Roles.ADMIN;
    }
    if (!isAuthenticated) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (isAdmin && pathname.startsWith('/dashboard')) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin-dashboard';
        return NextResponse.redirect(url);
    }

    if (!isAdmin && pathname.startsWith('/admin-dashboard')) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/admin-dashboard', '/admin-dashboard/:path*'],
}