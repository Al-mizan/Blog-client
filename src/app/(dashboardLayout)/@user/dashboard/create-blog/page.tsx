import { CreateBlogFormClient } from "@/components/modules/user/createBlog/CreateBlogFormClient";
import { CreateBlogFormServer } from "@/components/modules/user/createBlog/CreateBlogFormServer";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreatingBlog() {

    const { data } = await blogService.getBlogPosts({}, { cache: 'no-store' });

    return (
        <div>
            {/* <CreateBlogFormServer /> */}
            <CreateBlogFormClient />
            {
                data?.data?.map((blog: BlogPost) => (
                    <div key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.content}</p>
                        <p>Tags: {blog?.tags?.join(', ')}</p>
                        <br />
                    </div>
                ))
            }
        </div>
    );
}