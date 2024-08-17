"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsPage() {
    const staffData = [
        {
            name: "TS. Nguyễn Vũ Thanh",
            title: "Trưởng khoa Điện",
            mail: "email1@example.com",
            tel: "123-456-789",
            imageUrl: "/path-to-image-1.png"
        },
        {
            name: "TS. Phùng Anh Tuấn",
            title: "Phó trưởng khoa Điện",
            mail: "email2@example.com",
            tel: "987-654-321",
            imageUrl: "/path-to-image-2.png"
        },
        {
            name: "TS. Nguyễn Quốc Minh",
            title: "Phó trưởng khoa Điện",
            mail: "email3@example.com",
            tel: "555-555-555",
            imageUrl: "/path-to-image-3.png"
        },
        {
            name: "TS. Trần Văn Tài",
            title: "Giảng viên",
            mail: "email4@example.com",
            tel: "111-222-333",
            imageUrl: "/path-to-image-4.png"
        },
        {
            name: "TS. Lê Thị Hồng",
            title: "Giảng viên",
            mail: "email5@example.com",
            tel: "444-555-666",
            imageUrl: "/path-to-image-5.png"
        },
        {
            name: "TS. Vũ Quang Minh",
            title: "Giảng viên",
            mail: "email6@example.com",
            tel: "777-888-999",
            imageUrl: "/path-to-image-6.png"
        },
        {
            name: "TS. Đặng Thị Hà",
            title: "Giảng viên",
            mail: "email7@example.com",
            tel: "000-111-222",
            imageUrl: "/path-to-image-7.png"
        },
        {
            name: "TS. Nguyễn Hữu Thắng",
            title: "Phó Trưởng phòng",
            mail: "email8@example.com",
            tel: "333-444-555",
            imageUrl: "/path-to-image-8.png"
        },
        {
            name: "TS. Lê Anh Tuấn",
            title: "Trưởng bộ môn",
            mail: "email9@example.com",
            tel: "666-777-888",
            imageUrl: "/path-to-image-9.png"
        },
        {
            name: "TS. Phạm Thị Lan",
            title: "Giảng viên",
            mail: "email10@example.com",
            tel: "999-000-111",
            imageUrl: "/path-to-image-10.png"
        },
        {
            name: "TS. Vũ Thị Thu",
            title: "Giảng viên",
            mail: "email11@example.com",
            tel: "222-333-444",
            imageUrl: "/path-to-image-11.png"
        },
        {
            name: "TS. Phan Quốc Việt",
            title: "Giảng viên",
            mail: "email12@example.com",
            tel: "555-666-777",
            imageUrl: "/path-to-image-12.png"
        },
        {
            name: "TS. Trần Văn Nam",
            title: "Giảng viên",
            mail: "email13@example.com",
            tel: "888-999-000",
            imageUrl: "/path-to-image-13.png"
        }
    ];
    

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // check data tương ứng với mỗi page 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = staffData.slice(indexOfFirstItem, indexOfLastItem);

    // check tổng số page theo số lượng dataset
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

    const menuItems = [
        { label: 'Cán bộ', href: './nhan-luc/can-bo' },
        { label: 'Học viên Thạc sĩ', href: './hoc-vien-thac-si' },
        { label: 'Học viên tiến sĩ', href: '/hoc-vien-tien-si' },
        { label: 'CTV NC', href: '/ctv-nc' },
        { label: 'NCV sau TS', href: '/ncv-sau-ts' },
        { label: 'Cựu SV', href: '/cuu-sv' },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="container-nav text-red-600 text-lg mb-4">
                <p className="font-bold">Trang chủ &gt;&gt; Nhân lực &gt;&gt; Cán bộ</p>
            </div>
            <div className="flex space-x-4">
                {/* Sidebar menu */}
                <div className="flex-none w-1/3">
                    {menuItems.map((item, index) => (
                        <div key={index} className="text-red-600 text-lg mb-4">
                            <Link href={item.href}>
                                <p className={`cursor-pointer ${item.label === 'Học viên Thạc sĩ' ? 'underline' : ''}`}>
                                    {item.label}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Main content */}
                <div className="flex-1">
                    {/* Ảnh banner */}
                    <div className="mb-4">
                        <Image
                            src="/banner.png"
                            alt="Banner"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>



                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4 space-x-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'}`}
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1 border bg-white">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}