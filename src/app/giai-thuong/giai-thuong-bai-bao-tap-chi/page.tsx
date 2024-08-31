// src/app/giai-thuong/giai-thuong-bai-bao-tap-chi/page.tsx
'use client'
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import { awardData } from '@/data/giai-thuong/giai-thuong-bai-bao-tap-chi/data';
import { useState } from 'react';

export default function BaiBaoTapChi() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

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
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Giải thưởng" />
                
                <div className="w-3/4 p-4 border-l border-gray-300">

                        <h3 className="text-xl font-semibold mb-2">Giải thưởng Bài báo Tạp Chí</h3>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Người nhận giải</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Giải thưởng</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Tổ chức</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Năm</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Thành tích</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{item.recipients}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{item.award}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{item.organization}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{item.year}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{item.achievement}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>

                </div>

                {/* Pagination Controls */}
                <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                />
            </div>
    );
}