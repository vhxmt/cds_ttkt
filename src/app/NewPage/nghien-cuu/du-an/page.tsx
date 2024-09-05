// src/app/NewPage/nghien-cuu/du-an/page.tsx
'use client';
import { useState, useEffect } from 'react';
import PgControl from '@/components/display-block/PgControl';
import Breadcrumb from '@/components/breadcrumb';
import SideMenu from '@/components/display-block/SideMenu';
import { useAuth } from '@/components/providers/AuthProvider';
import ProjectForm, { Project } from './form-du-an'; // Import the new component

export default function DuAn() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formProject, setFormProject] = useState<Project | null>(null);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const response = await fetch('/api/nghien-cuu/du-an');
        const data = await response.json();
        setProjects(data.projects);
    };

    const handleAdd = () => {
        setFormProject(null); // No project means it's for adding a new one
        setIsFormOpen(true); // Open the form
    };

    const handleEdit = (project: Project) => {
        setFormProject(project); // Set the current project to edit
        setIsFormOpen(true); // Open the form
    };

    const handleSubmit = async (project: Project) => {
        if (project.id) {
            // Update existing project
            await fetch(`/api/nghien-cuu/du-an?id=${project.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
        } else {
            // Add new project
            await fetch('/api/nghien-cuu/du-an', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project),
            });
        }
        fetchProjects(); // Re-fetch data after submitting
        setIsFormOpen(false); // Close the form
    };

    const handleDelete = async (id: string) => {
        if (!id) {
            console.error('Project ID is missing');
            return;
        }
        await fetch(`/api/nghien-cuu/du-an?id=${id}`, {
            method: 'DELETE',
        });
        fetchProjects(); 
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);
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

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nghiên cứu" />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    
                    <h2 className="text-2xl font-semibold mb-4 text-center">Danh sách dự án</h2>
                    {isAdmin && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm dự án
                            </button>
                        </div>
                    )}
                    {currentItems.map((project) => (
                        <div key={project.id} className="mb-6 p-4 border border-gray-300 rounded-lg">
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
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            Xóa
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />
                </div>
            </div>
            {isFormOpen && (
                <ProjectForm
                    project={formProject || undefined}
                    onSubmit={handleSubmit}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
}
