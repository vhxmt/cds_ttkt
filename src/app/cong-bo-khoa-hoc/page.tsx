// Cong-bo-khoa-hoc.tsx
import React, { useState } from 'react';
import { filters } from '@/data/cong-bo-khoa-hoc/data1';
import { articles, Article } from '@/data/cong-bo-khoa-hoc/data2';

const CongBoKhoaHoc: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [yearRange, setYearRange] = useState({ from: 1998, to: 2024 });

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
        <div className="flex">
            <div className="w-1/4 p-4">
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
                <div className="mt-4">
                    <label>Lọc theo năm: </label>
                    <input
                        type="number"
                        name="from"
                        value={yearRange.from}
                        onChange={handleYearChange}
                        className="ml-2 border p-1"
                        min="1998"
                    />
                    <span className="mx-2">to</span>
                    <input
                        type="number"
                        name="to"
                        value={yearRange.to}
                        onChange={handleYearChange}
                        className="border p-1"
                        max={new Date().getFullYear()}
                    />
                </div>
            </div>
            <div className="w-3/4 p-4">
                {filteredArticles.map((article: Article) => (
                    <div key={article.id} className="mb-4">
                        {/* <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" /> */}
                        <h4 className="mt-2 font-bold">{article.title}</h4>
                        <p className="text-gray-600">{article.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CongBoKhoaHoc;
