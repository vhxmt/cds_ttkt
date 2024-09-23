'use client'
import { useState, useCallback } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Banner from '@/components/display-block/Banner';
import Breadcrumb from '@/components/breadcrumb';
import data from '@/data/tin-tuc-su-kien/tin-tuc/tin-tuc.json';
import { useAuth } from '@/components/providers/AuthProvider';

export default function NewsPage() {
  const {tuyendung, sections, banner, notifications, newsData, events, studentsNewsData, additionalNews } = data;
  const [newsList, setNewsList] = useState(additionalNews);
  const { isLoggedIn, user } = useAuth();
  const isAdmin = isLoggedIn && user?.role === 'admin';

  const handleAdd = useCallback(async () => {
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

      setNewsList((prevList) => [...prevList, { ...newNews, id: Date.now().toString() }]);
    } catch (error) {
      console.error('Thêm tin tức thất bại:', error);
    }
  }, []);

  const handleEdit = useCallback(async (id: string) => {
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

      setNewsList((prevList) =>
          prevList.map((newsItem) =>
              newsItem.id === id ? { ...newsItem, ...updatedNews } : newsItem
          )
      );
    } catch (error) {
      console.error('Sửa tin tức thất bại:', error);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      console.log(result.message);

      setNewsList((prevList) => prevList.filter((newsItem) => newsItem.id !== id));
    } catch (error) {
      console.error('Xóa tin tức thất bại:', error);
    }
  }, []);

  return (
      <div className="max-w-6xl mx-auto p-4 mt-6">
        <Banner src={banner.src} alt={banner.alt} />
        <Breadcrumb />
        <div className="flex space-x-4">
          <SideMenu currentSection="Tin tức/Sự kiện" />
          <div className="flex-1">
            <div className="flex bg-white mb-10 flex-wrap">
              {/* Cột đầu tiên: Tin tức nổi bật */}
              <div className="w-full md:w-2/3 p-4">
                <div className="flex flex-wrap">
                  <h1 className="text-green-700 text-2xl mb-4 font-bold">Thông báo</h1>
                  {notifications.map((news, index) => (
                      <div className="flex flex-wrap mb-6" key={news.title}>
                        <div className="w-full md:w-5/12 p-2">
                          <div className="mb-4">
                            <a href={news.viewAllUrl} title={news.title}>
                              <img src={news.imageUrl} alt={news.title} className="w-full h-auto" />
                            </a>
                          </div>
                          <div>
                            <h5 className="text-lg font-bold mb-2">
                              <a className="text-blue-600 hover:underline" href={news.viewAllUrl} title={news.title}>
                                {news.title}
                              </a>
                            </h5>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12 p-2">
                          <ul className="list-disc pl-5">
                            {news.links.map((link, i) => (
                                <li className="mb-2" key={i}>
                                  <a className="text-blue-600 hover:underline" href={link.url} title={link.title}>
                                    {link.title}
                                  </a>
                                </li>
                            ))}
                          </ul>
                          <a className="text-blue-600 hover:underline" href={news.viewAllUrl}>
                            Xem tất cả
                          </a>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Cột thứ hai: Tin tức sinh viên */}
              <div className="w-full md:w-1/3 p-4">
                <h1 className="text-green-700 text-2xl mb-4 font-bold">Sự kiện</h1>

                <div className="flex flex-wrap">
                  <ul className="list-disc pl-5">
                    {events.map((news, index) => (
                        <li className="mb-4" key={index}>
                          <a className="text-blue-600 hover:underline" href={news.url} title={news.title}>
                            {news.title}
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
                {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Thêm tin
                      </button>
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Sửa
                      </button>
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                )}
              </div>
            </div>

            <div className="flex bg-white mb-10 flex-wrap">
              {/* Cột đầu tiên: Tin tức nổi bật */}
              <div className="w-full md:w-2/3 p-4">
                <div className="flex flex-wrap">
                  <h1 className="text-green-700 text-2xl mb-4 font-bold">Tin tức nổi bật</h1>

                  {newsData.map((news, index) => (
                      <div className="flex flex-wrap mb-6" key={news.title}>
                        <div className="w-full md:w-5/12 p-2">
                          <div className="mb-4">
                            <a href={news.viewAllUrl} title={news.title}>
                              <img src={news.imageUrl} alt={news.title} className="w-full h-auto" />
                            </a>
                          </div>
                          <div>
                            <h5 className="text-lg font-bold mb-2">
                              <a className="text-blue-600 hover:underline" href={news.viewAllUrl} title={news.title}>
                                {news.title}
                              </a>
                            </h5>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12 p-2">
                          <ul className="list-disc pl-5">
                            {news.links.map((link, i) => (
                                <li className="mb-2" key={i}>
                                  <a className="text-blue-600 hover:underline" href={link.url} title={link.title}>
                                    {link.title}
                                  </a>
                                </li>
                            ))}
                          </ul>
                          <a className="text-blue-600 hover:underline" href={news.viewAllUrl}>
                            Xem tất cả
                          </a>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Cột thứ hai: Tin tức sinh viên */}
              <div className="w-full md:w-1/3 p-4">
                <h1 className="text-green-700 text-2xl mb-4 font-bold">Tin tức sinh viên</h1>

                <div className="flex flex-wrap">
                  <ul className="list-disc pl-5">
                    {studentsNewsData.map((news, index) => (
                        <li className="mb-4" key={index}>
                          <a className="text-blue-600 hover:underline" href={news.url} title={news.title}>
                            {news.title}
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
                {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Thêm tin
                      </button>
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Sửa
                      </button>
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                )}
              </div>
            </div>

            <div className="flex bg-white mb-10 flex-wrap">
              {/* Cột đầu tiên: Tin tức nổi bật */}
              <div className="w-full md:w-2/3 p-4">

                <div className="flex flex-wrap">
                  <h1 className="text-green-700 text-2xl mb-4 font-bold">Tin tức tuyển sinh</h1>

                  {sections.map((news, index) => (
                      <div className="flex flex-wrap mb-6" key={news.title}>
                        <div className="w-full md:w-5/12 p-2">
                          <div className="mb-4">
                            <a href={news.viewAllUrl} title={news.title}>
                              <img src={news.imageUrl} alt={news.title} className="w-full h-auto" />
                            </a>
                          </div>
                          <div>
                            <h5 className="text-lg font-bold mb-2">
                              <a className="text-blue-600 hover:underline" href={news.viewAllUrl} title={news.title}>
                                {news.title}
                              </a>
                            </h5>
                          </div>
                        </div>
                        <div className="w-full md:w-7/12 p-2">
                          <ul className="list-disc pl-5">
                            {news.links.map((link, i) => (
                                <li className="mb-2" key={i}>
                                  <a className="text-blue-600 hover:underline" href={link.url} title={link.title}>
                                    {link.title}
                                  </a>
                                </li>
                            ))}
                          </ul>
                          <a className="text-blue-600 hover:underline" href={news.viewAllUrl}>
                            Xem tất cả
                          </a>
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Cột thứ hai: Tin tức sinh viên */}
              <div className="w-full md:w-1/3 p-4">
                <h1 className="text-green-700 text-2xl mb-4 font-bold">Tuyển dụng</h1>

                <div className="flex flex-wrap">
                  <ul className="list-disc pl-5">
                    {tuyendung.map((news, index) => (
                        <li className="mb-4" key={index}>
                          <a className="text-blue-600 hover:underline" href={news.url} title={news.title}>
                            {news.title}
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
                {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Thêm tin
                      </button>
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Sửa
                      </button>
                      <button
                          // thêm xử lý vào đây
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                )}
              </div>
            </div>

            {newsList.map((newsItem) => (
                <div key={newsItem.id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    <a href={newsItem.link} className="text-blue-600 hover:underline">
                      {newsItem.title}
                    </a>
                  </h3>
                  <p className="text-gray-700 mb-4">{newsItem.description}</p>
                  {isAdmin && (
                      <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(newsItem.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Sửa
                        </button>
                        <button
                            onClick={() => handleDelete(newsItem.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                  )}
                </div>
            ))}
            {isAdmin && (
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Thêm tin tức
                </button>
            )}
          </div>
        </div>
      </div>
  );
}
