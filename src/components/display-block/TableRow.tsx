// src/components/display-block/TableRow.tsx
import React from 'react';
import {useAuth} from "@/components/providers/AuthProvider";

interface TableRowProps {
    rowData: any; // Replace 'any' with appropriate type if necessary
    columns: string[];
    onEdit: () => void;
    onDelete: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ rowData, columns, onEdit, onDelete }) => {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    return (
        <tr className="text-left border-t">
            {columns.map((col, index) => (
                <td
                key={index}
                className="border border-gray-300 px-4 py-2"
                >
                {rowData[col]}
                </td>
            ))}
            {isAdmin && (
                <td className="p-2">
                    <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                        onClick={onEdit}
                    >
                        Sửa
                    </button>
                    <button
                        className="bg-red-500 mt-5 text-white py-1 px-3 rounded hover:bg-red-600"
                        onClick={onDelete}
                    >
                        Xóa
                    </button>
                </td>
            )}
        </tr>
    );
};

export default TableRow;
