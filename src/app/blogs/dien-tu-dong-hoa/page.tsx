// src/app/blogs/dien-tu-dong-hoa/page.tsx
'use client'
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import blogData from '@/data/blogs/dien-tu-dong-hoa/data.json'; 
import PublicationCard from '@/components/display-block/PublicationCard';
import { useState } from 'react';

// Define the types for the blog posts
export interface BlogPost {
    title: string;
    date: string;
    description: string;
    imageUrl: string;
    href: string;
}

export interface BlogData {
    blogPosts: BlogPost[];
}

export default function DienTuDongHoa() {
    // Type the blogData import
    const blogPosts = (blogData as BlogData).blogPosts;  

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogPosts.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Blogs" />

                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">Lĩnh vực: Điện - Tự động hóa</h2>
                    
                    <div className="grid grid-cols-3 gap-4">
                        {currentItems.map((post: BlogPost, index) => (
                            <PublicationCard
                                key={index}
                                date={post.date}
                                title={post.title}
                                imageAlt="Image Placeholder"
                                href={post.href}
                                imageUrl={post.imageUrl} // Optional image URL
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />
                </div>
            </div>
        </div>
    );
}
