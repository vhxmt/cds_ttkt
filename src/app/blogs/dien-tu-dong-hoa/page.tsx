// src/app/blogs/dien-tu-dong-hoa/page.tsx
'use client'
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import blogData from '@/data/blogs/dien-tu-dong-hoa/data.json';
import PublicationCard from '@/components/display-block/PublicationCard';
import { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider'; // Import useAuth

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
    const { isLoggedIn, user } = useAuth(); // Lấy thông tin user và trạng thái đăng nhập
    const isAdmin = isLoggedIn && user?.role === 'admin'; // Xác định quyền admin

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

    const handleAdd = () => {
        console.log("Thêm bài viết mới");
        // Thực hiện hành động thêm bài viết mới ở đây
    };

    function handleDelete(post: BlogPost) {
        
    }

    function handleEdit(post: BlogPost) {
        
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Blogs" />

                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    {/* Nút "Thêm" */}
                    {isAdmin && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm
                            </button>
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-4">Lĩnh vực: Điện - Tự động hóa</h2>

                    <div className="grid grid-cols-3 gap-4">
                        {currentItems.map((post: BlogPost, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <PublicationCard
                                date={post.date}
                                title={post.title}
                                imageAlt="Image Placeholder"
                                href={post.href}
                                imageUrl={post.imageUrl}
                                onEdit={() => handleEdit(post)} // Truyền hàm xử lý
                                onDelete={() => handleDelete(post)} // Truyền hàm xử lý
                                isAdmin/>

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
