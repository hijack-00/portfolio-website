import { DEFAULT_DATA } from '../../utils/defaultData';
import BlogDetailClient from './BlogDetailClient';

// Generate static paths for all blog posts
export function generateStaticParams() {
    return DEFAULT_DATA.blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    // Await params as required by Next.js 15
    const { slug } = await params;

    // Find the blog post by slug
    const blog = DEFAULT_DATA.blogs.find((b: any) => b.slug === slug);

    return <BlogDetailClient blog={blog} />;
}
