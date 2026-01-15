import { DEFAULT_DATA } from '../../utils/defaultData';
import BlogDetailClient from './BlogDetailClient';

// Generate static paths for all blog posts
export function generateStaticParams() {
    return DEFAULT_DATA.blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
    // Find the blog post by slug
    const blog = DEFAULT_DATA.blogs.find((b: any) => b.slug === params.slug);

    return <BlogDetailClient blog={blog} />;
}
