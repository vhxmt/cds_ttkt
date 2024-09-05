import Image from 'next/image';
import {useAuth} from "@/components/providers/AuthProvider";

interface UserInfoProps {
    name: string;
    title: string;
    mail: string;
    tel: string;
    imageUrl: string;
    onEdit: () => void;
    onDelete: () => void;
    isAdmin: boolean; // Thêm prop để kiểm tra quyền admin
}

export default function UserInfo({ name, title, mail, tel, imageUrl, onEdit, onDelete }: UserInfoProps) {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    return (
        <div className="flex items-start mb-4 p-4 border border-gray-300 rounded-lg">
            {/* Information */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <p className="text-lg">{title}</p>
                <p className="text-sm text-gray-600">Mail: {mail}</p>
                <p className="text-sm text-gray-600">Tel: {tel}</p>
            </div>

            {/* Avatar */}
            <div className="w-24 h-32 bg-gray-300 overflow-hidden flex-shrink-0">
                <Image
                    src={imageUrl}
                    alt={`Avatar of ${name}`}
                    width={96}
                    height={128}
                    className="object-cover"
                />
            </div>

            {/* Action Buttons */}
            {isAdmin && (
                <div className="flex flex-col space-y-2 ml-4">
                    <button
                        onClick={onEdit}
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    >
                        Sửa
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Xóa
                    </button>
                </div>
            )}
        </div>
    );
}
