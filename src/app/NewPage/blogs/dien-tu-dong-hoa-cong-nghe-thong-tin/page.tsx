// src/app/NewPage/blogs/dien-tu-dong-hoa-cong-nghe-thong-tin/page.tsx
'use client';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import PublicationCard from '@/components/display-block/PublicationCard';
import BlogFormModal from './BlogFormModal'; 
import { BlogPost } from '@/interfaces/blogs/interface';

export default function DienTuDongHoa() {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

    const itemsPerPage = 3;

    const fetchData = async () => {
        try {
            const res = await fetch('/api/blogs/dien-tu-dong-hoa-cntt');
            const data = await res.json();
            setBlogPosts(data.blogPosts);
        } catch (error) {
            console.error('Failed to fetch blog posts:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = () => {
        setCurrentPost(null);
        setIsModalOpen(true); 
    };

    const handleEdit = (post: BlogPost) => {
        setCurrentPost(post); 
        setIsModalOpen(true); 
    };


    const handleSubmit = async (post: BlogPost) => {
        const method = post.id ? 'PUT' : 'POST';
        const url = '/api/blogs/dien-tu-dong-hoa-cntt';
    
        // Ensure that optional fields can be left empty
        const bodyContent = post.id
            ? { id: post.id, updatedPost: post } // For edit (PUT request)
            : { newPost: { ...post, id: undefined } }; // For adding a new post (POST request)
    
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyContent),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error submitting post:', errorData.message);
            return;
        }
    
        fetchData(); // Refresh blog posts
        setIsModalOpen(false); // Close the modal after submission
    };
    

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/blogs/dien-tu-dong-hoa-cntt?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchData(); 
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Blogs" />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    {isAdmin && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd} // Open modal for adding new post
                            >
                                Thêm
                            </button>
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-4">Lĩnh vực: Điện - Tự động hóa</h2>

                    <div className="grid grid-cols-3 gap-4">
                        {blogPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((post) => (
                            <PublicationCard
                                key={post.id}
                                date={post.date}
                                title={post.title}
                                href={post.href}
                                imageUrl={post.imageUrl}
                                imageAlt={post.title}
                                onEdit={() => handleEdit(post)}
                                onDelete={() => handleDelete(post.id)}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>

                    <PgControl
                        currentPage={currentPage}
                        totalPages={Math.ceil(blogPosts.length / itemsPerPage)}
                        onNextPage={() => setCurrentPage((prev) => prev + 1)}
                        onPrevPage={() => setCurrentPage((prev) => prev - 1)}
                    />
                </div>
            </div>

            {/* Add/Edit Modal */}
            <BlogFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={currentPost || undefined} // Pass undefined for a new entry to clear fields
            />
        </div>
    );
}