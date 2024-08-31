// src/app/nghien-cuu/du-an.tsx
'use client';
import { useState } from 'react';
import PgControl from '@/components/display-block/PgControl';
import Breadcrumb from '@/components/breadcrumb';
import { projects } from '@/data/nghien-cuu/du-an/data';
import SideMenu from '@/components/display-block/SideMenu';

export default function DuAn() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

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

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Nghiên cứu" />

                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4 text-center">SEEE Dự án</h2>

                    {/* Project List */}
                    {currentItems.map((project, index) => (
                        <div key={index} className="mb-6">
                            <h3 className="text-lg font-semibold">{project.duration}</h3>
                            <h4 className="font-medium">{project.title}</h4>
                            <ul className="list-disc list-inside">
                                {project.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
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
