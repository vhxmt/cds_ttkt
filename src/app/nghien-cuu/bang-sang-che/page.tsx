// src/app/patents/bang-sang-che.tsx
'use client';
import Breadcrumb from '@/components/breadcrumb';
import { patents } from '@/data/nghien-cuu/bang-sang-che/data';
import SideMenu from '@/components/display-block/SideMenu';
import { menuItems } from '@/data/nghien-cuu/menu-data';
import PgControl from '@/components/display-block/PgControl';
import { useState } from 'react';

export default function BangSangChe() {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

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
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Sidebar Menu */}
                <SideMenu menuItems={menuItems} />

                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">Danh sách bằng sáng chế</h2>

                    {/* Patent Table */}
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">STT</th>
                                <th className="border border-gray-300 px-4 py-2">Họ và tên tác giả</th>
                                <th className="border border-gray-300 px-4 py-2">SC/GPHI</th>
                                <th className="border border-gray-300 px-4 py-2">Tên SC/GPHI</th>
                                <th className="border border-gray-300 px-4 py-2">Ngày nộp</th>
                                <th className="border border-gray-300 px-4 py-2">Năm nộp</th>
                                <th className="border border-gray-300 px-4 py-2">Số nhận đơn</th>
                                <th className="border border-gray-300 px-4 py-2">Năm cấp bằng độc quyền</th>
                                <th className="border border-gray-300 px-4 py-2">Ngày cấp văn bằng</th>
                                <th className="border border-gray-300 px-4 py-2">Số văn bằng</th>
                                <th className="border border-gray-300 px-4 py-2">Số QĐ cấp</th>
                                <th className="border border-gray-300 px-4 py-2">Đơn vị</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patents.map((patent, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">{patent.stt}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.author}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.scGphi}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.submissionDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.submissionYear}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.applicationNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.grantedYear}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.grantDate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.documentNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.decisionNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{patent.department}</td>
                                </tr>
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
