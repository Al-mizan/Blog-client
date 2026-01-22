import { env } from "@/env";

const API_URL = env.API_URL;

//* No Dynamic and No { cache: no-store } : SSG -> Static Page
//* { cache: no-store } : SSR -> Dynamic Page
//* next: { revalidate: 10 } : ISR -> Mix between static and dynamic

interface GetBlogsParams {
    isFeatured?: boolean;
    search?: string;
}

interface ServiceOption {
    cache?: RequestCache;
    revalidate?: number;
}

export const blogService = {
    getBlogPosts: async function (
        params?: GetBlogsParams,
        options?: ServiceOption
    ) {
        try {
            const url = new URL(`${API_URL}/posts`);
            if(params) {
                Object.entries(params).forEach(([key, value]) => {
                    if(value !== undefined && value !== null && value !== '') {
                        url.searchParams.append(key, String(value));
                    }
                });
            }
            const config: RequestInit = {};
            if(options?.cache) {
                config.cache = options.cache;
            }
            if(options?.revalidate !== undefined) {
                config.next = { revalidate: options.revalidate };
            }

            const res = await fetch(url.toString(), config);
            if (!res.ok) {
                throw new Error("Failed to fetch posts");
            }
            const posts = await res.json();
            if (posts.success) {
                return {
                    data: posts.data,
                    error: null,
                }
            }
            else {
                throw new Error("Failed to fetch posts");
            }
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: { message: "Failed to fetch posts" },
                details: error instanceof Error ? error.message : String(error),
            }
        }
    },

    getBlogPostById: async function (id: string) {
        try {
            const url = new URL(`${API_URL}/posts/${id}`);
            const res = await fetch(url.toString());
            if (!res.ok) {
                throw new Error("Failed to fetch post");
            }
            const post = await res.json();
            if (post.success) {
                return {
                    data: post.data,
                    error: null,
                }
            }
            else {
                throw new Error("Failed to fetch post");
            }
        } catch (error) {
            console.error(error);
            return {
                data: null,
                error: { message: "Failed to fetch post" },
                details: error instanceof Error ? error.message : String(error),
            }
        }
    }
}