// src/pages/news.tsx
'use client'
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Banner from '@/components/display-block/Banner';
import Breadcrumb from '@/components/breadcrumb';
import data from '@/data/tin-tuc-su-kien/tin-tuc/tin-tuc.json';
import { useAuth } from '@/components/providers/AuthProvider';
import PgControl from '@/components/display-block/PgControl';

const ITEMS_PER_PAGE = 5
export default function NewsPage() {
  const { banner, featuredNews, events, additionalNews } = data;
  const [newsList, setNewsList] = useState(additionalNews);
  const { isLoggedIn, user } = useAuth();
  const isAdmin = isLoggedIn && user?.role === 'admin';

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(additionalNews.length / ITEMS_PER_PAGE);

  // Lấy danh sách tin tức cho trang hiện tại
  const currentNewsList = additionalNews.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleAdd = async () => {
    try {
      const newNews = {
        title: 'New News',
        description: 'Content of new news',
        link: 'https://example.com',
        image: 'https://example.com/image.png'
      };
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews),
      });
      const result = await response.json();
      console.log(result.message);

      // Cập nhật danh sách tin tức sau khi thêm
      setNewsList((prevList) => [...prevList, { ...newNews, id: Date.now().toString() }]);
    } catch (error) {
      console.error('Thêm tin tức thất bại:', error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const updatedNews = {
        title: 'Updated Title',
        description: 'Updated Content',
        link: 'https://example.com',
        image: 'https://example.com/image.png'
      };
      const response = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedNews }),
      });
      const result = await response.json();
      console.log(result.message);

      // Cập nhật danh sách tin tức sau khi sửa
      setNewsList((prevList) =>
          prevList.map((newsItem) =>
              newsItem.id === id ? { ...newsItem, ...updatedNews } : newsItem
          )
      );
    } catch (error) {
      console.error('Sửa tin tức thất bại:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      console.log(result.message);

      // Cập nhật danh sách tin tức sau khi xóa
      setNewsList((prevList) => prevList.filter((newsItem) => newsItem.id !== id));
    } catch (error) {
      console.error('Xóa tin tức thất bại:', error);
    }
  };

  return (
      <div className="max-w-6xl mx-auto p-4 mt-6">
        <Breadcrumb />
        <div className="flex space-x-4">
          <SideMenu currentSection="Tin tức/Sự kiện" />
          <div className="flex-1">
            <Banner src={banner.src} alt={banner.alt} />
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-semibold">SEEE Tin tức & Sự kiện</h1>
              {isAdmin && (
                  <button
                      onClick={handleAdd}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Thêm Tin Tức
                  </button>
              )}
            </div>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                <header className="flex items-center mb-4">
                  <h1 className="text-2xl font-semibold">Tin tức mới nhất</h1>
                </header>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {featuredNews.map((newsItem, index) => (
                      <li key={index}>
                        <a href={newsItem.link} className="text-blue-600 hover:underline">
                          {newsItem.title}
                        </a>
                      </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                <header className="flex items-center mb-4">
                  <h1 className="text-2xl font-semibold">Sự kiện sắp diễn ra</h1>
                </header>
                <div className="space-y-4">
                  {events.map((event, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="text-lg font-semibold mb-2">
                          <a href={event.link} className="text-blue-600 hover:underline">
                            {event.title}
                          </a>
                        </h3>
                        <p className="text-gray-700 mb-4">{event.description}</p>
                        <a href={event.link} className="text-blue-600 hover:underline">
                          Chi tiết
                        </a>
                      </div>
                  ))}
                </div>
              </div>
            </div>
            {currentNewsList.map((newsItem) => (
                <div key={newsItem.id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    <a href={newsItem.link} className="text-blue-600 hover:underline">
                      {newsItem.title}
                    </a>
                  </h3>
                  <img src={newsItem.image} alt={newsItem.title} className="w-full h-20 mb-2" />
                  <p className="text-gray-700 mb-4">{newsItem.description}</p>
                  {isAdmin && (
                      <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(newsItem.id)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                        >
                          Sửa
                        </button>
                        <button
                            onClick={() => handleDelete(newsItem.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                        >
                          Xóa
                        </button>
                      </div>
                  )}
                </div>
            ))}

            {/* Component Phân trang */}
            <PgControl
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
            />
          </div>
        </div>
      </div>
  );
}
