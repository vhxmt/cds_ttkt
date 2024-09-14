"use client";

import React, { useState, useEffect } from 'react';
import PgControl from '@/components/display-block/PgControl';
import Breadcrumb from "@/components/breadcrumb";
import Image from 'next/image';
import SideMenu from '@/components/display-block/SideMenu';
import data from '@/data/cong-bo-khoa-hoc/data.json';
import {useAuth} from "@/components/providers/AuthProvider";  // Import JSON data

// Define the types for the JSON data
interface Article {
    id: number;
    title: string;
    date: string;
    imageUrl: string;
}

interface Filter {
    id: string;
    label: string;
}

interface Data {
    articles: Article[];
    filters: Filter[];
}

export default function CongBoKhoaHoc() {
    const { articles, filters } = data as Data;  // Type the JSON import

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(articles.length / itemsPerPage);

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

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [yearRange, setYearRange] = useState({ from: 1980, to: 2024 });

    const handleFilterChange = (filterId: string) => {
        setSelectedFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(f => f !== filterId)
                : [...prev, filterId]
        );
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setYearRange(prev => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const filteredArticles = articles.filter(article => {
        // Implement filter logic here if needed based on selectedFilters and yearRange
        return true;
    });

    // Simulate a check for admin status (you would replace this with actual authentication logic)
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleAdd = () => {
        console.log("Thêm bài báo mới");
    };

    const handleEdit = (id: number) => {
        console.log("Sửa bài báo với ID:", id);
    };

    const handleDelete = (id: number) => {
        console.log("Xóa bài báo với ID:", id);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb/>
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    {/* Search Bar */}

                    <div className="flex p-4 border-l border-gray-300">
                        <div className="flex-none w-1/2 p-4">
                            <h3>Bộ lọc:</h3>
                            {filters.map(filter => (
                                <div key={filter.id}>
                                    <input
                                        type="checkbox"
                                        id={filter.id}
                                        onChange={() => handleFilterChange(filter.id)}
                                    />
                                    <label htmlFor={filter.id} className="ml-2">{filter.label}</label>
                                </div>
                            ))}
                        </div>

                        {/* Year Filter */}
                        <div className="w-1/2 mb-6 flex items-center space-x-4">
                            <div className="font-bold text-[14px]">Lọc theo năm:</div>
                            <input
                                type="number"
                                name="from"
                                value={yearRange.from}
                                onChange={handleYearChange}
                                className="w-20 p-2 border border-gray-300 rounded focus:outline-none"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                name="to"
                                value={yearRange.to}
                                onChange={handleYearChange}
                                className="w-20 p-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm
                            </button>
                        </div>
                    )}
                    {/* Publications List */}
                    <div className="space-y-6">
                        {currentItems.map(article => (
                            <div
                                key={article.id}
                                className="flex space-x-4 border-b pb-4"
                            >
                                <Image
                                    src={article.imageUrl}
                                    alt="Thumbnail"
                                    width={200}
                                    height={200}
                                    className="w-1/4 h-auto object-cover rounded-lg"
                                />
                                <div className="flex flex-col justify-between w-2/3">
                                    <div>
                                        <h4 className="font-bold text-lg">
                                            {article.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {article.date}
                                        </p>
                                    </div>
                                    {isAdmin && (
                                        <div className="flex space-x-2 mt-2">
                                            <button
                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                                onClick={() => handleEdit(article.id)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                onClick={() => handleDelete(article.id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

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
