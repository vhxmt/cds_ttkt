// src/app/cong-bo-khoa-hoc/page.tsx
"use client";

import React, { useState } from 'react';
import PgControl from '@/components/display-block/PgControl';
import Breadcrumb from "@/components/breadcrumb";
import Image from 'next/image';
import SideMenu from '@/components/display-block/SideMenu';
import data from '@/data/cong-bo-khoa-hoc/data.json';  // Import JSON data

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

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            <Breadcrumb/>
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu  />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    {/* Search Bar */}
                    <div className="flex items-center mb-6">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                        />
                        <button className="bg-gray-200 p-2 rounded-r-lg">
                            <svg
                                className="h-6 w-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M4.75 10.5a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>

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

