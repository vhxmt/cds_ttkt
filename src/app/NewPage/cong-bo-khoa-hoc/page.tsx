"use client";
import React, { useState, useEffect } from 'react';
import PgControl from '@/components/display-block/PgControl';
import Breadcrumb from "@/components/breadcrumb";
import SideMenu from '@/components/display-block/SideMenu';
import filterData from '@/data/cong-bo-khoa-hoc/filters.json';
import { useAuth } from "@/components/providers/AuthProvider";
import ArticleForm from './ArticleForm'; 
import { mainData } from '@/interfaces/cong-bo-khoa-hoc/interface'; 

interface Filter {
    id: string;
    label: string;
}

export default function CongBoKhoaHoc() {
    const { filters } = filterData;
    const [mainData, setMainData] = useState<mainData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [yearRange, setYearRange] = useState({ from: 1980, to: new Date().getFullYear() });
    const [filterApplied, setFilterApplied] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
    const [appliedYearRange, setAppliedYearRange] = useState({ from: 1980, to: new Date().getFullYear() });
    const [error, setError] = useState<string | null>(null);
    const [currentMainData, setCurrentMainData] = useState<mainData | null>(null);
    const [showForm, setShowForm] = useState(false);

    const fetchMainData = async () => {
        try {
            const res = await fetch('/api/cong-bo-khoa-hoc');
            if (!res.ok) throw new Error('Failed to fetch mainData');
            const data = await res.json();
            setMainData(data.mainData);
        } catch (err) {
            setError('Error loading mainData');
        }
    };

    useEffect(() => {
        fetchMainData();
    }, []);

    const applyFilters = () => {
        setAppliedFilters(selectedFilters);
        setAppliedYearRange(yearRange);
        setFilterApplied(true);
        setCurrentPage(1);
    };

    const filteredMainData = mainData.filter(mainData => {
        const matchesFilter = appliedFilters.length === 0 || appliedFilters.includes(mainData.type);
        const matchesYearRange = mainData.releaseYear >= appliedYearRange.from && mainData.releaseYear <= appliedYearRange.to;
        return matchesFilter && matchesYearRange;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredMainData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredMainData.length / itemsPerPage);

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

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleAdd = () => {
        setCurrentMainData(null);
        setShowForm(true);
    };

    const handleEdit = (id: number) => {
        const mainDataToEdit = mainData.find(mainData => mainData.id === id);
        setCurrentMainData(mainDataToEdit || null);
        setShowForm(true);
    };

    const handleFormSubmit = async (mainData: mainData) => {
        const url = currentMainData ? `/api/cong-bo-khoa-hoc?id=${mainData.id}` : '/api/cong-bo-khoa-hoc';
        const method = currentMainData ? 'PUT' : 'POST';
        
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...mainData, id: String(mainData.id) }), // Ensure ID is sent as a string
        });
    
        fetchMainData(); // Refresh the data after adding or updating
        setShowForm(false); // Close the form
    };
    
    

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/cong-bo-khoa-hoc?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setMainData(mainData.filter(mainData => mainData.id !== id));
            } else {
                console.error('Failed to delete mainData');
            }
        } catch (error) {
            console.error('Error deleting mainData:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    {/* Filter Section */}
                    <div className="flex p-4 border-l border-gray-300">
                        <div className="flex-none w-1/2 p-4">
                            <h3>Bộ lọc:</h3>
                            {filters.map(filter => (
                                <div key={filter.id}>
                                    <input
                                        type="checkbox"
                                        id={filter.id}
                                        onChange={() => handleFilterChange(filter.id)}
                                        checked={selectedFilters.includes(filter.id)}
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

                    {/* "Lọc" button */}
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={applyFilters}
                        >
                            Lọc
                        </button>
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

                    <div className="space-y-6">
                        {currentItems.map(mainData => (
                            <div key={mainData.id} className="flex space-x-4 border-b pb-4">
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h4 className="font-bold text-lg">{mainData.title}</h4>
                                        <p className="text-sm text-gray-600">{mainData.releaseDay}/{mainData.releaseMonth}/{mainData.releaseYear}</p>
                                        <p className="text-sm text-gray-600">{mainData.author}</p>
                                        <p className="text-sm text-gray-600">{mainData.conference}</p>
                                        <a href={mainData.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            Read more
                                        </a>
                                    </div>
                                    {isAdmin && (
                                        <div className="flex space-x-2 mt-2">
                                            <button
                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                                onClick={() => handleEdit(mainData.id)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                onClick={() => handleDelete(mainData.id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />
                </div>
            </div>

            {/* Render the form for adding or editing */}
            {showForm && (
                <ArticleForm
                    article={currentMainData}
                    filters={filters}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
