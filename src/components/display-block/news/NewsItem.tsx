// src/components/display-block/news/NewsItem.tsx
"use client";
import React from 'react';

interface NewsItemProps {
    imageSrc: string;
    title: string;
    date: string;
    href: string; // Add href prop for the link
    isAdmin: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ imageSrc, title, date, href, isAdmin, onEdit, onDelete }) => {
    return (
        <div className="flex items-center mb-10">
            <img
                src={imageSrc}
                alt={title}
                className="w-40 h-32 object-cover mr-12"
            />
            <div className="flex-1">
                <a href={href} target="_blank" rel="noopener noreferrer"> {/* Wrap title with link */}
                    <h3 className="font-bold text-lg mb-2 hover:underline">{title}</h3>
                </a>
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
