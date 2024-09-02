// src/app/nghien-cuu/bang-sang-che/page.tsx
'use client'
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import data from '@/data/nghien-cuu/bang-sang-che/data.json';

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

export default function BangSangChe() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

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
        'Số văn bằng', 'Số QĐ cấp', 'Đơn vị'
    ];
    
    const columns = [
        'stt', 'author', 'type', 'title', 'submissionDate', 
        'submissionYear', 'applicationNumber', 'grantYear', 'grantDate', 
        'grantNumber', 'decisionNumber', 'unit'
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Nghiên cứu" />
                
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h3 className="text-xl font-semibold mb-2 text-center">Danh sách bằng sáng chế</h3>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <TableHeader headers={headers} />
                        </thead>
                        <tbody>
                            {currentItems.map((patent, index) => (
                                <TableRow key={index} rowData={patent} columns={columns} />
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
