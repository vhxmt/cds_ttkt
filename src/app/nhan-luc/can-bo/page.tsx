// src/pages/nhan-luc/can-bo/page.tsx
"use client";

import { useState } from 'react';
import UserInfo from '@/components/display-block/UserInfo';
import Banner from '@/components/display-block/Banner';
import PgControl from '@/components/display-block/PgControl';
import SideMenu from '@/components/display-block/SideMenu';
import data from '@/data/nhan-luc/can-bo/data.json'; // Import JSON as default export
import Breadcrumb from '@/components/breadcrumb';

// Define types for your data
interface Staff {
    name: string;
    title: string;
    mail: string;
    tel: string;
    imageUrl: string;
}

interface Data {
    staffData: Staff[];
    menuItems: Array<{ label: string; href: string }>;
}

export default function NewsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Access the data from the imported JSON
    const { staffData }: Data = data;

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = staffData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(staffData.length / itemsPerPage);

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
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Sidebar menu */}
                <SideMenu currentSection="Nhân lực" />

                {/* Main content */}
                <div className="flex-1">
                    {/* Banner */}
                    <Banner src="/banner.png" alt="Banner" />

                    {/* Display currentItems */}
                    {currentItems.map((staff, index) => (
                        <UserInfo
                            key={index}
                            name={staff.name}
                            title={staff.title}
                            mail={staff.mail}
                            tel={staff.tel}
                            imageUrl={staff.imageUrl}
                        />
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
