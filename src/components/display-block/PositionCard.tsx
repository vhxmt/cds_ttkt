// src/components/PositionCard.tsx
import React from 'react';

interface Position {
    id: string;
    title: string;
    description: string;
    requirements: string[];
}

interface PositionCardProps {
    position: Position;
    isAdmin: boolean;
    onEdit: (position: Position) => void;
    onDelete: (id: string) => void;
    onApply: () => void;
}

const PositionCard: React.FC<PositionCardProps> = ({ position, isAdmin, onEdit, onDelete, onApply }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{position.title}</h3>
                <p className="text-l text-gray-700 mb-4">{position.description}</p>
                <h4 className="text-lg font-semibold mb-2 text-gray-700">Yêu cầu tuyển dụng:</h4>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    {position.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                    ))}
                </ul>

                <button
                    onClick={onApply}
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Đăng ký ngay &gt;&gt;
                </button>

                {isAdmin && (
                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={() => onEdit(position)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
                        >
                            Sửa
                        </button>
                        <button
                            onClick={() => onDelete(position.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                        >
                            Xóa
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PositionCard;
