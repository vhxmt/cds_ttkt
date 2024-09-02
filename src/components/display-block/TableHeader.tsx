// src/components/display-block/TableHeader.tsx
import React from 'react';

interface TableHeaderProps {
    headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
    return (
        <tr className="bg-gray-200 border-b">
            {headers.map((header, index) => (
                <th
                    key={index}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300"
                >
                    {header}
                </th>
            ))}
        </tr>
    );
};

export default TableHeader;
