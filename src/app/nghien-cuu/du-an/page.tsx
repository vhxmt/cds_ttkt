'use client';
import { useState } from 'react';
import PgControl from '@/components/display-block/PgControl';
import Breadcrumb from '@/components/breadcrumb';
import data from '@/data/nghien-cuu/du-an/data.json'; // Import JSON as default export
import SideMenu from '@/components/display-block/SideMenu';
import { useAuth } from '@/components/providers/AuthProvider'; // Import hook để kiểm tra quyền admin

// Define the types for the projects
export interface Project {
    duration: string;
    title: string;
    details: string[];
}

interface ProjectData {
    projects: Project[];
}

export default function DuAn() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Access the data from the imported JSON
    const { projects }: ProjectData = data;

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(projects.length / itemsPerPage);

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
        console.log("Thêm dự án mới");
    };

    const handleEdit = (project: Project) => {
        console.log("Sửa dự án:", project);
    };

    const handleDelete = (project: Project) => {
        console.log("Xóa dự án:", project);
    };

    // Get user authentication and role information
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Nghiên cứu" />

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

                    <h2 className="text-2xl font-semibold mb-4 text-center">Danh sách dự án</h2>

                    {/* Project List */}
                    {currentItems.map((project, index) => (
                        <div key={index} className="mb-6 p-4 border border-gray-300 rounded-lg">
                            <h3 className="text-lg font-semibold">{project.duration}</h3>
                            <h4 className="font-medium">{project.title}</h4>
                            <ul className="list-disc list-inside mb-4">
                                {project.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                            <div className="flex justify-end space-x-2">
                                {isAdmin && (
                                    <>
                                        <button
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                            onClick={() => handleEdit(project)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(project)}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

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
