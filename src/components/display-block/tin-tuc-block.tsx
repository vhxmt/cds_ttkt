// components/display-block/tin-tuc-block.tsx
'use client';
import { useState } from 'react';
import PgControl from '@/components/display-block/PgControl';

interface NewsSectionProps {
  title: string;
  items: { title: string; url: string }[];
  itemsPerPage: number;
  isAdmin: boolean;
  onAddItem?: (newItem: { title: string; url: string }) => void;
  onEditItem?: (index: number, updatedItem: { title: string; url: string }) => void;
  onDeleteItem?: (index: number) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, items, itemsPerPage, isAdmin, onAddItem, onEditItem, onDeleteItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleAdd = () => {
    const newItem = { title: 'New Item', url: '#' };
    if (onAddItem) onAddItem(newItem);
  };

  const handleEdit = (index: number) => {
    const updatedItem = { title: 'Updated Title', url: '#' };
    if (onEditItem) onEditItem(index, updatedItem);
  };

  const handleDelete = (index: number) => {
    if (onDeleteItem) onDeleteItem(index);
  };

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-4"> {/* Updated to w-full for full width */}
      <h1 className="text-green-700 text-2xl mb-4 font-bold">{title}</h1>
      <ul className="list-disc pl-5">
        {currentItems.map((item, index) => (
          <li className="mb-4" key={index}>
            <a className="text-blue-600 hover:underline" href={item.url} title={item.title}>
              {item.title}
            </a>
            {isAdmin && (
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleEdit(index)}>Sửa</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(index)}>Xóa</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <PgControl
        currentPage={currentPage}
        totalPages={totalPages}
        onNextPage={() => handlePageChange('next')}
        onPrevPage={() => handlePageChange('prev')}
      />

      {isAdmin && (
        <div className="flex space-x-2">
          <button className="px-4 mt-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleAdd}>Thêm tin</button>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
