'use client';
import { useState, useEffect } from 'react';
import PgControl from '@/components/display-block/PgControl';
import { NewsItem } from '@/interfaces/tin-tuc-su-kien/interface';
import NewsForm from './form/NewsForm';

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
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Ensure currentPage is within bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    // Log state values for debugging
    console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);
  }, [totalPages, currentPage]);

  // Function to handle page changes
  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to handle adding a new item
  const handleAdd = () => {
    setEditingItem(null);
    setFormVisible(true);
  };

  // Function to handle editing an existing item
  const handleEdit = (id: string) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setFormVisible(true);
    }
  };

  // Function to handle deleting an item
  const handleDelete = (id: string) => {
    if (onDeleteItem) {
      onDeleteItem(id); // Call the parent function with the item's id
    }
  };

  // Function to handle form submission
  const handleSubmitForm = (newsItem: NewsItem) => {
    if (editingItem && onEditItem) {
      onEditItem(newsItem.id, newsItem); // Update existing item
    } else if (!editingItem && onAddItem) {
      onAddItem(newsItem); // Add new item
    }
    setFormVisible(false);
  };

  // Function to handle form cancellation
  const handleCancelForm = () => {
    setFormVisible(false);
  };

  // Calculate items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const currentItems = items.slice(startIndex, endIndex); // Correct slicing

  // Log the current items for debugging
  console.log('Current Items:', currentItems);

  return (
    <div className="w-full p-4">
      <h1 className="text-green-700 text-2xl mb-4 font-bold">{title}</h1>
      {isAdmin && (
        <div className="flex space-x-2">
          <button className="px-4 mt-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleAdd}>
            Thêm tin
          </button>
        </div>
      )}
      {isFormVisible ? (
        <NewsForm
          initialData={editingItem || undefined} // Convert null to undefined here
          onSubmit={handleSubmitForm}
          onCancel={handleCancelForm}
        />
      ) : (
        <>
          <ul className="list-disc pl-5">
            {currentItems.map((item) => (
              <li className="mb-4" key={item.id}>
                <a className="text-blue-600 hover:underline" href={item.url} title={item.title}>
                  {item.title}
                </a>
                {isAdmin && (
                  <div className="flex space-x-2 mt-2">
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
        </>
      )}
    </div>
  );
};

export default NewsSection;
