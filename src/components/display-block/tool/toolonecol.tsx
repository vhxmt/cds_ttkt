// src/components/display-block/tool/ToolOneCol.tsx
import React from 'react';

interface Tool {
    title: string;
    imgSrc: string;
    description: string;
}

interface ToolOneColProps {
    tool?: Tool;
    isAdmin: boolean; // Prop để kiểm tra quyền admin
    onAdd?: () => void; // Hàm xử lý sự kiện nhấn nút Thêm
    onEdit?: () => void; // Hàm xử lý sự kiện nhấn nút Sửa
    onDelete?: () => void; // Hàm xử lý sự kiện nhấn nút Xóa
}

const ToolOneCol: React.FC<ToolOneColProps> = ({ tool, isAdmin, onAdd, onEdit, onDelete }) => {
    if (!tool) {
        return null; // Trả về null nếu không có công cụ
    }

    return (
        <div className="text-center mb-12">
            <h3 className="text-lg font-semibold mb-4">{tool.title}</h3>
            <img
                src={tool.imgSrc}
                alt={tool.title}
                className="w-full h-auto object-cover rounded-lg mb-4"
                style={{ height: '400px', objectFit: 'contain' }}
            />
            <p className="text-sm text-gray-600 whitespace-pre-line">{tool.description}</p>

            {isAdmin && ( // Hiển thị các nút nếu là admin
                <div className="flex justify-center space-x-2 mt-4">
                    {onAdd && (
                        <button
                            onClick={onAdd}
                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                        >
                            Thêm
                        </button>
                    )}
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
};

export default ToolOneCol;
