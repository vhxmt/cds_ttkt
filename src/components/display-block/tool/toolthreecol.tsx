import React from 'react';

interface Tool {
    id: string;
    title: string;
    imgSrc: string;
    description: string;
}

interface ToolThreeColProps {
    tools: Tool[]; // Array of tools
    isAdmin: boolean;
    onAdd?: () => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const ToolThreeCol: React.FC<ToolThreeColProps> = ({ tools, isAdmin, onAdd, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-3 gap-8 mb-12">
            {tools.map((tool) => (
                <div key={tool.id} className="text-center">
                    <img
                        src={tool.imgSrc}
                        alt={tool.title}
                        className="w-full h-auto object-cover rounded-lg mb-4"
                        style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <h3 className="text-lg font-semibold">{tool.title}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{tool.description}</p>

                    {isAdmin && (
                        <div className="flex justify-center space-x-2 mt-4">
                            {onEdit && (
                                <button
                                    onClick={() => onEdit(tool.id)} // Pass the tool id to the onEdit handler
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Sửa
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={() => onDelete(tool.id)} // Pass the tool id to the onDelete handler
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
            {isAdmin && onAdd && (
                <div className="col-span-3 flex justify-center mt-4">
                    <button
                        onClick={onAdd}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Thêm
                    </button>
                </div>
            )}
        </div>
    );
};

export default ToolThreeCol;
