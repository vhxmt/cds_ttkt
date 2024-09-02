// src/components/display-block/TableRow.tsx
import React from 'react';

interface TableRowProps {
    rowData: any;
    columns: string[];
}

const TableRow: React.FC<TableRowProps> = ({ rowData, columns }) => {
    return (
        <tr className="border-b">
            {columns.map((column, index) => (
                <td
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300"
                >
                    {rowData[column]}
                </td>
            ))}
        </tr>
    );
};

export default TableRow;
