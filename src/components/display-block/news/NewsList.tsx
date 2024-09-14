// src/components/display-block/NewsList.tsx
import React from 'react';
import NewsItem from '@/components/display-block/news/NewsItem';

interface News {
    id: string; // Add the id field
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
    return (
        <div className="mb-8">
            {news.map((item) => (
                <NewsItem
                    key={item.id} // Change to use item.id
                    imageSrc={item.imageSrc}
                    title={item.title}
                    date={item.date}
                    isAdmin={isAdmin}
                    onEdit={() => onEdit && onEdit(item)}
                    onDelete={() => onDelete && onDelete(item)}
                />
            ))}
        </div>
    );
};

export default NewsList;
