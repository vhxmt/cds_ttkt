"use client";

import React, { useState, useEffect } from 'react';
import PgControl from '@/components/display-block/PgControl';
import Breadcrumb from "@/components/breadcrumb";
import SideMenu from '@/components/display-block/SideMenu';
import filterData from '@/data/cong-bo-khoa-hoc/filters.json';
import { useAuth } from "@/components/providers/AuthProvider";
import ArticleForm from './ArticleForm'; // Import the ArticleForm component

interface Article {
    id: number;
    title: string;
    releaseDay: string;
    releaseYear: number;
    author: string;
    conference: string;
    url: string;
    type: string; // Add the 'type' field
}

interface Filter {
    id: string;
    label: string;
}

export default function CongBoKhoaHoc() {
    const { filters } = filterData;
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [yearRange, setYearRange] = useState({ from: 1980, to: 2024 });
    const [error, setError] = useState<string | null>(null);
    
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null); // Define currentArticle state
    const [showForm, setShowForm] = useState(false); // Define showForm state

    const fetchArticles = async () => {
        try {
            const res = await fetch('/api/cong-bo-khoa-hoc');
            if (!res.ok) throw new Error('Failed to fetch articles');
            const data = await res.json();
            setArticles(data.articles);
        } catch (err) {
            setError('Error loading articles');
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);
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

    // Filter articles based on the selected filters and year range
    const filteredArticles = articles.filter(article => {
        const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(article.type);
        const matchesYearRange = article.releaseYear >= yearRange.from && article.releaseYear <= yearRange.to;
        return matchesFilter && matchesYearRange;
    });

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleAdd = () => {
        setCurrentArticle(null); // Clear the current article for new addition
        setShowForm(true); // Show the form
    };

    const handleEdit = (id: number) => {
        const articleToEdit = articles.find(article => article.id === id);
        setCurrentArticle(articleToEdit || null);
        setShowForm(true); // Show the form
    };

    const handleFormSubmit = async (article: Article) => {
        if (currentArticle) {
            // Update the existing article
            await fetch(`/api/cong-bo-khoa-hoc?id=${article.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article),
            });
            setArticles(prev => prev.map(a => (a.id === article.id ? article : a)));
        } else {
            // Add a new article
            await fetch('/api/cong-bo-khoa-hoc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article),
            });
            setArticles(prev => [...prev, article]);
        }

        setShowForm(false); // Close the form
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/cong-bo-khoa-hoc?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                setArticles(articles.filter(article => article.id !== id));
            } else {
                console.error('Failed to delete article');
            }
        } catch (error) {
            console.error('Error deleting article:', error);
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

                    <div className="space-y-6">
                        {currentItems.map(article => (
                            <div key={article.id} className="flex space-x-4 border-b pb-4">
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h4 className="font-bold text-lg">{article.title}</h4>
                                        <p className="text-sm text-gray-600">{article.releaseDay}/{article.releaseYear}</p>
                                        <p className="text-sm text-gray-600">{article.author}</p>
                                        <p className="text-sm text-gray-600">{article.conference}</p>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            Read more
                                        </a>
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
                    article={currentArticle}  
                    filters={filters}         
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                />
            
            )}
        </div>
    );
}
