'use client'
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Banner from '@/components/display-block/Banner';
import Breadcrumb from '@/components/breadcrumb';
import dataTinTuc from '@/data/tin-tuc-su-kien/tin-tuc/tin-tuc.json';
import { useAuth } from '@/components/providers/AuthProvider';
import dataTuyenDung from '@/data/tin-tuc-su-kien/tin-tuc/tuyen-dung.json';
import PgControl from '@/components/display-block/PgControl';

export default function NewsPage() {
  const { banner, newsData } = dataTinTuc;
  const { tuyendung } = dataTuyenDung;
  const { isLoggedIn, user } = useAuth();
  const isAdmin = isLoggedIn && user?.role === 'admin';
  const itemsPerPage = 5;

  const [currentNewsPage, setCurrentNewsPage] = useState(1);
  const [currentTuyendungPage, setCurrentTuyendungPage] = useState(1);

  const totalNewsPages = Math.ceil(newsData[0].links.length / itemsPerPage);
  const totalTuyendungPages = Math.ceil(tuyendung.length / itemsPerPage);

  const handlePageChange = (type: 'news' | 'tuyendung', direction: 'next' | 'prev') => {
    if (type === 'news') {
      if (direction === 'next' && currentNewsPage < totalNewsPages) {
        setCurrentNewsPage(prevPage => prevPage + 1);
      } else if (direction === 'prev' && currentNewsPage > 1) {
        setCurrentNewsPage(prevPage => prevPage - 1);
      }
    } else if (type === 'tuyendung') {
      if (direction === 'next' && currentTuyendungPage < totalTuyendungPages) {
        setCurrentTuyendungPage(prevPage => prevPage + 1);
      } else if (direction === 'prev' && currentTuyendungPage > 1) {
        setCurrentTuyendungPage(prevPage => prevPage - 1);
      }
    }
  };


  const currentNewsLinks = newsData[0].links.slice(
      (currentNewsPage - 1) * itemsPerPage,
      currentNewsPage * itemsPerPage
  );

  const currentTuyendung = tuyendung.slice(
      (currentTuyendungPage - 1) * itemsPerPage,
      currentTuyendungPage * itemsPerPage
  );

  return (
      <div className="max-w-6xl mx-auto p-4 mt-6">
        <Breadcrumb />
        <div className="flex space-x-4">
          <SideMenu currentSection="Tin tức/Sự kiện" />
          <div className="flex-1">
            <div className="flex bg-white mb-10 flex-wrap">
              {/* Tin tức nổi bật */}
              <div className="w-full md:w-1/2 p-4">
                <h1 className="text-green-700 text-2xl mb-4 font-bold">Tin tức nổi bật</h1>
                <div className="flex flex-wrap">
                  <ul className="list-disc pl-5">
                    {currentNewsLinks.map((link, index) => (
                        <li className="mb-2" key={index}>
                          <a className="text-blue-600 hover:underline" href={link.url} title={link.title}>
                            {link.title}
                          </a>
                          {isAdmin && (
                              <div className="flex space-x-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sửa</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Xóa</button>
                              </div>
                          )}
                        </li>
                    ))}
                  </ul>
                </div>

                {/* Phân trang Tin tức nổi bật */}
                <PgControl
                    currentPage={currentNewsPage}
                    totalPages={totalNewsPages}
                    onNextPage={() => handlePageChange('news', 'next')}
                    onPrevPage={() => handlePageChange('news', 'prev')}
                />
                {isAdmin && (
                    <div className="flex space-x-2">
                      <button className="px-4 mt-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Thêm tin</button>
                    </div>
                )}
              </div>

              {/* Tuyển dụng */}
              <div className="w-full md:w-1/2 p-4">
                <h1 className="text-green-700 text-2xl mb-4 font-bold">Tuyển dụng</h1>
                <ul className="list-disc pl-5">
                  {currentTuyendung.map((job, index) => (
                      <li className="mb-4" key={index}>
                        <a className="text-blue-600 hover:underline" href={job.url} title={job.title}>
                          {job.title}
                        </a>
                        {isAdmin && (
                            <div className="flex space-x-2">
                              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sửa</button>
                              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Xóa</button>
                            </div>
                        )}
                      </li>
                  ))}
                </ul>

                {/* Phân trang Tuyển dụng */}
                <PgControl
                    currentPage={currentTuyendungPage}
                    totalPages={totalTuyendungPages}
                    onNextPage={() => handlePageChange('tuyendung', 'next')}
                    onPrevPage={() => handlePageChange('tuyendung', 'prev')}
                />

                {isAdmin && (
                    <div className="flex space-x-2">
                      <button className="px-4 mt-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Thêm tin</button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
