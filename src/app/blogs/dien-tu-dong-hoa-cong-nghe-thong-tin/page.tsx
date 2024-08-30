'use client'
import SideMenu from '@/components/display-block/SideMenu';
import { menuItems } from '@/data/blogs/menu-data';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import { blogPosts } from '@/data/blogs/dien-tu-dong-hoa-cntt/data';  
import PublicationCard from '@/components/display-block/PublicationCard';
import { useState } from 'react';

export default function DienTuDongHoaCNTT() {

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
                {/* Sidebar Menu */}
                <SideMenu menuItems={menuItems} />


                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">Lĩnh vực: Điện - Tự động hóa - Công nghệ thông tin</h2>
                    
                    <div className="grid grid-cols-3 gap-4">
                        {currentItems.map((post, index) => (
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
