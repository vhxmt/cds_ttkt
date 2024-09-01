// src/app/nghien-cuu/bang-sang-che/page.tsx
'use client'
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import { patents } from '@/data/nghien-cuu/bang-sang-che/data';
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
                {/* Side Menu */}
                <SideMenu currentSection="Nghiên cứu" />
                
                <div className="w-3/4 p-4 border-l border-gray-300">

                        <h3 className="text-xl font-semibold mb-2 text-center">Danh sách bằng sáng chế</h3>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">STT</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Họ và tên tác giả</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">SC/GPHI</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Tên SC/GPHI</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Ngày nộp</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Năm nộp</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Số nhận đơn</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Năm cấp bằng độc quyền</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Ngày cấp văn bằng</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Số văn bằng</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Số QĐ cấp</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Đơn vị</th>
                            </tr>
                            </thead>
                            <tbody>
                            {patents.map((patent, index) => (
                                <tr className="border-b" key={index}>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.stt}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.author}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.type}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.title}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.submissionDate}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.submissionYear}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.applicationNumber}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.grantYear}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.grantDate}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.grantNumber}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{patent.decisionNumber}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{patent.unit}</td>
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