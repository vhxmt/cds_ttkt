'use client'
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import data from '@/data/nghien-cuu/bang-sang-che/data.json';
import {useAuth} from "@/components/providers/AuthProvider";

// Define the type for the patents
export interface Patent {
    stt: number;
    author: string;
    type: string;
    title: string;
    submissionDate: string;
    submissionYear: string;
    applicationNumber: string;
    grantYear: string;
    grantDate: string;
    grantNumber: string;
    decisionNumber: string;
    unit: string;
}

interface PatentData {
    patents: Patent[];
}

interface BangSangCheProps {
    isAdmin: boolean; // Thêm prop để kiểm tra quyền admin
}

export default function BangSangChe() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    // Access the data from the imported JSON
    const { patents }: PatentData = data;

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patents.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(patents.length / itemsPerPage);

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

    // Define table headers and columns
    const headers = [
        'STT', 'Họ và tên tác giả', 'SC/GPHI', 'Tên SC/GPHI', 'Ngày nộp',
        'Năm nộp', 'Số nhận đơn', 'Năm cấp bằng độc quyền', 'Ngày cấp văn bằng',
        'Số văn bằng', 'Số QĐ cấp', 'Đơn vị', 'Thao tác'
    ];

    const columns = [
        'stt', 'author', 'type', 'title', 'submissionDate',
        'submissionYear', 'applicationNumber', 'grantYear', 'grantDate',
        'grantNumber', 'decisionNumber', 'unit'
    ];

    const handleAdd = () => {
        console.log("Thêm bằng sáng chế mới");
    };

    const handleEdit = (patent: Patent) => {
        console.log("Sửa thông tin bằng sáng chế:", patent);
    };

    const handleDelete = (patent: Patent) => {
        console.log("Xóa bằng sáng chế:", patent);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Nghiên cứu" />

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

                    <h3 className="text-xl font-semibold mb-2 text-center">Danh sách bằng sáng chế</h3>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                        <TableHeader headers={headers} />
                        </thead>
                        <tbody>
                        {currentItems.map((patent, index) => (
                            <TableRow
                                key={index}
                                rowData={patent}
                                columns={columns}
                                onEdit={() => handleEdit(patent)}
                                onDelete={() => handleDelete(patent)}
                            />
                        ))}
                        </tbody>
                    </table>

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
