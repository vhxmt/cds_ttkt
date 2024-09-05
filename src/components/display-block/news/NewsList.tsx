// src/components/display-block/NewsList.tsx
import React, { useState } from 'react';
import NewsItem from '@/components/display-block/news/NewsItem';

interface News {
    imageSrc: string;
    title: string;
    date: string;
}

interface NewsListProps {
    news: News[];
    isAdmin: boolean;
    onEdit?: (item: News) => void;
    onDelete?: (item: News) => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, isAdmin, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const paginatedNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="mb-8">
            {paginatedNews.map((item, index) => (
                <NewsItem
                    key={index}
                    imageSrc={item.imageSrc}
                    title={item.title}
                    date={item.date}
                    isAdmin={isAdmin}
                    onEdit={() => onEdit && onEdit(item)}
                    onDelete={() => onDelete && onDelete(item)}
                />
            ))}
            <div className="flex justify-center mt-6">
                <div className="flex space-x-1">
                    {Array.from({ length: Math.ceil(news.length / itemsPerPage) }).map((_, page) => (
                        <button
                            key={page}
                            onClick={() => handleClick(page + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === page + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsList;
