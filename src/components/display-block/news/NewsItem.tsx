// src/components/display-block/news/NewsItem.tsx
"use client";
import React from 'react';

interface NewsItemProps {
    imageSrc: string;
    title: string;
    date: string;
    isAdmin: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ imageSrc, title, date, isAdmin, onEdit, onDelete }) => {
    return (
        <div className="flex items-center mb-10">
            <img
                src={imageSrc}
                alt={title}
                className="w-40 h-32 object-cover mr-12"
            />
            <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{date}</p>
                {isAdmin && (
                    <div className="mt-2 flex space-x-2">
                        {onEdit && (
                            <button
                                onClick={onEdit}
                                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                            >
                                Sửa
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={onDelete}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                                Xóa
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsItem;
