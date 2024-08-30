// src/components/PublicationCard.tsx
import Image from 'next/image';

interface PublicationCardProps {
    date: string;
    title: string;
    imageUrl?: string;
    imageAlt: string;
    href: string; // Link to the detailed page of the post
}

export default function PublicationCard({ date, title, imageUrl, imageAlt, href }: PublicationCardProps) {
    return (
        <a href={href} className="border border-blue-400 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gray-200 h-48 mb-4 flex items-center justify-center">
            </div>
            <p className="text-blue-600 text-sm mb-2">{date}</p>
            <p className="font-semibold">{title}</p>
        </a>
    );
}
