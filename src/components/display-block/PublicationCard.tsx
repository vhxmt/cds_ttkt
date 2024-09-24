// src/components/PublicationCard.tsx
import Image from 'next/image';
import {useAuth} from "@/components/providers/AuthProvider";

interface PublicationCardProps {
    date?: string; // Allow undefined
    title: string;
    href?: string; // Allow undefined
    imageUrl?: string; // Allow undefined
    imageAlt: string;
    onEdit: () => void;
    onDelete: () => void;
    isAdmin: boolean;
}

export default function PublicationCard({date, title, imageUrl, imageAlt, href, onEdit, onDelete}: PublicationCardProps) {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    return (
        <div className="border border-blue-400 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <a href={href} className="block mb-4">
                <div className="bg-gray-200 h-48 mb-4 flex items-center justify-center">
                    {imageUrl && <Image src={imageUrl} alt={imageAlt} width={200} height={200} />}
                </div>
                <p className="text-blue-600 text-sm mb-2">{date}</p>
                <p className="font-semibold">{title}</p>
            </a>
            {isAdmin && (
                <div className="flex space-x-2 mt-4">
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
    );
}
