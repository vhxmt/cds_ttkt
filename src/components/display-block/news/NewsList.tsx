// src/components/display-block/NewsList.tsx
import React from 'react';
import NewsItem from '@/components/display-block/news/NewsItem';

interface News {
    id: string; // Add the id field
    imageSrc: string;
    title: string;
    date: string;
    href: string; // Add href field for the link
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
                    key={item.id} // Use item.id as the key
                    imageSrc={item.imageSrc}
                    title={item.title}
                    date={item.date}
                    href={item.href} // Pass href prop to NewsItem
                    isAdmin={isAdmin}
                    onEdit={() => onEdit && onEdit(item)}
                    onDelete={() => onDelete && onDelete(item)}
                />
            ))}
        </div>
    );
};

export default NewsList;
