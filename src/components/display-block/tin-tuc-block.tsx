// components/display-block/tin-tuc-block.tsx
'use client';
import { useState } from 'react';
import PgControl from '@/components/display-block/PgControl';
import { NewsItem } from '@/interfaces/tin-tuc-su-kien/tin-tuc/interface';

interface NewsSectionProps {
  title: string;
  items: NewsItem[];
  itemsPerPage: number;
  isAdmin: boolean;
  onAddItem?: (newItem: NewsItem) => void;
  onEditItem?: (id: string, updatedItem: NewsItem) => void;
  onDeleteItem?: (id: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  title,
  items = [],
  itemsPerPage,
  isAdmin,
  onAddItem,
  onEditItem,
  onDeleteItem,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Use a default value of 0 if items is undefined or empty
  const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAdd = () => {
    if (onAddItem) {
      const newItem: NewsItem = {
        id: '', // ID will be generated in the parent component or backend
        title: 'New Item',
        url: '#',
      };
      onAddItem(newItem); // Send the complete NewsItem object to the parent
    }
  };

  const handleEdit = (id: string) => {
    if (onEditItem) {
      const itemToEdit = items.find(item => item.id === id);
      if (itemToEdit) {
        const updatedItem: NewsItem = {
          ...itemToEdit,
          title: 'Updated Title',
        };
        onEditItem(id, updatedItem); // Use id and updated NewsItem
      }
    }
  };

  const handleDelete = (id: string) => {
    if (onDeleteItem) {
      onDeleteItem(id); // Call the parent function with the item's id
    }
  };

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full p-4">
      <h1 className="text-green-700 text-2xl mb-4 font-bold">{title}</h1>
      <ul className="list-disc pl-5">
        {currentItems.map((item) => (
          <li className="mb-4" key={item.id}>
            <a className="text-blue-600 hover:underline" href={item.url} title={item.title}>
              {item.title}
            </a>
            {isAdmin && (
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleEdit(item.id)} // Pass the item's id to handleEdit
                >
                  Sửa
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(item.id)} // Pass the item's id to handleDelete
                >
                  Xóa
                </button>
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
          <button className="px-4 mt-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleAdd}>
            Thêm tin
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
