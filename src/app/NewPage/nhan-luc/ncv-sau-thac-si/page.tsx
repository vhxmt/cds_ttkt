// src/pages/nhan-luc/can-bo/anotherPage.tsx
"use client";

import { useState } from 'react';
import UserInfo from '@/components/display-block/UserInfo';
import Banner from '@/components/display-block/Banner';
import PgControl from '@/components/display-block/PgControl';
import SideMenu from '@/components/display-block/SideMenu';
import { staffData } from '@/data/nhan-luc/can-bo/data.json';
import Breadcrumb from '@/components/breadcrumb';
import {useAuth} from "@/components/providers/AuthProvider";

export default function AnotherPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = staffData.slice(indexOfFirstItem, indexOfLastItem);

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

    const handleAdd = () => {
        console.log("Thêm cán bộ mới");
    };

    const handleEdit = (staff: any) => {
        console.log("Sửa thông tin cán bộ:", staff);
    };

    const handleDelete = (staff: any) => {
        console.log("Xóa cán bộ:", staff);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nhân lực" />

                <div className="flex-1">
                    <Banner src="/banner.png" alt="Banner" />

                    {/* Nút "Thêm" */}
                    <div className="flex justify-end mb-4">
                        {isAdmin && (
                            <button
                                className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm
                            </button>
                        )}
                    </div>

                    {/* Hiển thị các mục nhân sự */}
                    {currentItems.map((staff, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
                            <UserInfo
                                name={staff.name}
                                title={staff.title}
                                mail={staff.mail}
                                tel={staff.tel}
                                imageUrl={staff.imageUrl}
                                onEdit={() => handleEdit(staff)}
                                onDelete={() => handleDelete(staff)}
                                isAdmin
                            />
                            {/* Thêm các nút Sửa và Xóa */}

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
        </div>
    );
}
