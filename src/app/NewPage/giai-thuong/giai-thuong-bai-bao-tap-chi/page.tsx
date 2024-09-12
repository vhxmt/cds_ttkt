// src/app/giai-thuong/giai-thuong-khac/page.tsx
'use client'
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import data from '@/data/giai-thuong/giai-thuong-bai-bao-hoi-nghi/data.json';
import {useAuth} from "@/components/providers/AuthProvider";

interface Award {
    recipients: string;
    award: string;
    organization: string;
    year: number;
    achievement: string;
}

interface AwardData {
    awardData: Award[];
}

export default function BaiBaoKhac() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Access the data from the imported JSON
    const { awardData }: AwardData = data;

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = awardData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(awardData.length / itemsPerPage);

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
        console.log("Thêm cán bộ");
    };
    const handleEdit = (index: Award) => {
        console.log("Sửa lĩnh vực nghiên cứu tại vị trí:", index);
    };

    const handleDelete = (index: Award) => {
        console.log("Xóa lĩnh vực nghiên cứu tại vị trí:", index);
    };
    // Define table headers and columns
    const headers = [
        'Người nhận giải', 'Giải thưởng', 'Tổ chức', 'Năm', 'Thành tích'
    ];

    const columns = [
        'recipients', 'award', 'organization', 'year', 'achievement',
    ];
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Giải thưởng" />

                <div className="w-3/4 p-4 border-l border-gray-300">

                    <h3 className="text-xl font-semibold mb-2 text-center">Giải thưởng Bài báo Hội nghị</h3>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                        <TableHeader headers={headers} />
                        </thead>
                        <tbody>
                        {currentItems.map((item, index) => (
                            <TableRow
                                key={index}
                                rowData={item}
                                columns={columns}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleDelete(item)}
                            />
                        ))}
                        </tbody>
                    </table>
                    {isAdmin && (
                        <div className="mb-4 mt-4">
                            <button
                                onClick={handleAdd}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Thêm
                            </button>
                        </div>
                    )}
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
