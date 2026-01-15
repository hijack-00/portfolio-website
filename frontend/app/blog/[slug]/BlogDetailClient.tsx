'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '../../components/ParticlesBackground';

interface BlogDetailClientProps {
    blog: any;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
    const router = useRouter();
    const [matrixCode, setMatrixCode] = useState('');

    useEffect(() => {
        const generateMatrixCode = () => {
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            let result = '';
            for (let i = 0; i < 500; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            setMatrixCode(result);
        };

        generateMatrixCode();
        const interval = setInterval(generateMatrixCode, 150);
        return () => clearInterval(interval);
    }, []);

    if (!blog) {
        return (
            <div className="bg-black text-green-400 min-h-screen font-mono flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 text-green-400 animate-pulse">
                        &gt; ERROR_404
                    </h1>
                    <p className="text-green-300 mb-8">Blog post not found</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-green-400 text-black px-8 py-4 rounded-none hover:bg-green-300 transition-all duration-300 font-bold"
                    >
                        [RETURN_HOME]
                    </button>
                </div>
            </div>
        );
    }

    // Format date
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-black text-green-400 min-h-screen font-mono relative overflow-hidden">
            {/* Binary Rain Background */}
            <div className="fixed inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 text-xs leading-none break-all animate-pulse">
                    {matrixCode}
                </div>
            </div>

            {/* Particles Background */}
            <ParticlesBackground />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-green-400/40">
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <button
                        onClick={() => router.push('/')}
                        className="text-base sm:text-lg md:text-xl font-bold text-green-400 hover:text-green-200 transition-colors duration-300 animate-pulse"
                    >
                        <span className="text-green-300">&gt;</span> AADIL.KHAN
                    </button>
                    <button
                        onClick={() => router.push('/#blog')}
                        className="text-sm md:text-base text-green-400 hover:text-green-200 transition-colors duration-300"
                    >
                        [BACK_TO_BLOGS]
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 pt-24 pb-20 max-w-4xl relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/#blog')}
                    className="mb-8 inline-flex items-center text-green-400 hover:text-green-200 transition-colors duration-300"
                >
                    <i className="ri-arrow-left-line mr-2"></i>
                    [BACK_TO_ALL_BLOGS]
                </button>

                {/* Blog Header */}
                <div className="bg-black/60 border border-green-400/40 p-6 md:p-8 rounded-none backdrop-blur-sm mb-8">
                    <div className="flex flex-wrap gap-4 items-center mb-6">
                        <span className="text-xs text-green-400 bg-green-400/20 px-3 py-1 rounded-none">
                            {blog.category}
                        </span>
                        <span className="text-green-500 text-sm">{formattedDate}</span>
                        <span className="text-green-500 text-sm">{blog.readTime}</span>
                    </div>

                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-green-300 mb-4 animate-pulse">
                        <span className="text-green-400">&gt;</span> {blog.title}
                    </h1>

                    <p className="text-base md:text-lg text-green-200 leading-relaxed">
                        {blog.preview}
                    </p>
                </div>

                {/* Blog Content */}
                <div className="bg-black/60 border border-green-400/40 p-6 md:p-8 rounded-none backdrop-blur-sm">
                    <div className="prose prose-invert max-w-none">
                        <div className="text-green-200 leading-relaxed space-y-6">
                            {/* Display the content */}
                            <div className="whitespace-pre-line text-base md:text-lg">
                                {blog.content || 'Content is being prepared. Check back soon for the full article!'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <button
                        onClick={() => router.push('/#blog')}
                        className="w-full sm:w-auto border-2 border-green-400 text-green-400 px-6 py-3 rounded-none hover:bg-green-400 hover:text-black transition-all duration-300 font-bold"
                    >
                        [VIEW_ALL_BLOGS]
                    </button>
                    <button
                        onClick={() => router.push('/#contact')}
                        className="w-full sm:w-auto bg-green-400 text-black px-6 py-3 rounded-none hover:bg-green-300 transition-all duration-300 font-bold"
                    >
                        [CONTACT_ME]
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-green-400/40 relative z-10">
                <div className="container mx-auto text-center">
                    <p className="text-green-400 animate-pulse">
                        © 2024 Aadil Khan | IT Consultant • Developer • Ethical Hacker
                    </p>
                </div>
            </footer>
        </div>
    );
}
