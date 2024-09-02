// src/app/giai-thuong/giai-thuong-khac/page.tsx
// src/app/giai-thuong/giai-thuong-khac/page.tsx
'use client'
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import data from '@/data/giai-thuong/giai-thuong-khac/data.json';

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

    // Define table headers and columns
    const headers = [
        'Người nhận giải', 'Giải thưởng', 'Tổ chức', 'Năm', 'Thành tích'
    ];

    const columns = [
        'recipients', 'award', 'organization', 'year', 'achievement'
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Giải thưởng" />
                
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h3 className="text-xl font-semibold mb-2 text-center">Giải thưởng Khác</h3>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <TableHeader headers={headers} />
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <TableRow key={index} rowData={item} columns={columns} />
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
