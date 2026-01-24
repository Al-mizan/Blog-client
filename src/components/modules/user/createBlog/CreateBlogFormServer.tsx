import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export function CreateBlogFormServer() {

    async function createBlog(formData: FormData) {
        'use server';
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const tags = formData.get('tags') as string;
        const blogData = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        }
        console.log(JSON.stringify(blogData));
        const cookiesStore = await cookies();

        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookiesStore.toString()
            },
            body: JSON.stringify(blogData),
        });
        if (!res.ok) {
            throw new Error('Failed to create blog');
        }
        else {
            revalidateTag("blogPosts", "max");
            // updateTag("blogPosts"); // ai line r upurer line same kaj kore just aktu slide diff ase
        }

    }

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Create blog</CardTitle>
                <CardDescription>you can write your blog here</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="blog-form" action={createBlog}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input id="title" type="text" name="title" placeholder="Blog title" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="content">Content</FieldLabel>
                            <Textarea id="content" name="content" placeholder="Blog content" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
                            <Input id="tags" name="tags" placeholder="next js, web" required />
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" form="blog-form" className="w-full">Submit</Button>
            </CardFooter>
        </Card>
    );
}