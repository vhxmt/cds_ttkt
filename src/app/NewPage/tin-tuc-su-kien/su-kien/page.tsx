'use client'
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import dataSuKien from '@/data/tin-tuc-su-kien/su-kien/su-kien.json';
import { useAuth } from '@/components/providers/AuthProvider';
import PgControl from '@/components/display-block/PgControl';
import eventData from "@/data/tin-tuc-su-kien/su-kien/khoa-hoc-body.json";

export default function NewsPage() {
    const { events } = dataSuKien;
    const { upcomingCourses } = eventData;
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    const eventsPerPage = 5;
    const coursesPerPage = 3;
    // State cho phân trang sự kiện
    const [currentTuyendungPage, setCurrentTuyendungPage] = useState(1);
    const totalTuyendungPages = Math.ceil(events.length / eventsPerPage);

    // State cho phân trang khóa học
    const [currentCoursesPage, setCurrentCoursesPage] = useState(1);
    const totalCoursesPages = Math.ceil(upcomingCourses.length / coursesPerPage);

    // Chuyển trang sự kiện
    const handleTuyendungPageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentTuyendungPage < totalTuyendungPages) {
            setCurrentTuyendungPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentTuyendungPage > 1) {
            setCurrentTuyendungPage(prevPage => prevPage - 1);
        }
    };

    // Chuyển trang khóa học
    const handleCoursesPageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentCoursesPage < totalCoursesPages) {
            setCurrentCoursesPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentCoursesPage > 1) {
            setCurrentCoursesPage(prevPage => prevPage - 1);
        }
    };

    // Các sự kiện cho trang hiện tại
    const currentTuyendungLinks = events.slice(
        (currentTuyendungPage - 1) * eventsPerPage,
        currentTuyendungPage * eventsPerPage
    );

    // Các khóa học cho trang hiện tại
    const currentCourses = upcomingCourses.slice(
        (currentCoursesPage - 1) * coursesPerPage,
        currentCoursesPage * coursesPerPage
    );

    const handleAdd = () => {
        console.log("Thêm khóa học");
    };

    const handleEdit = () => {
        console.log("Sửa khóa học");
    };

    const handleDelete = () => {
        console.log("Xóa khóa học");
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Tin tức/Sự kiện" />
                <div className="flex-1 flex flex-col space-y-4">
                    {/* Ô Sự kiện */}
                    <div className="flex bg-white mb-10 flex-wrap">
                        <div className="w-full p-4">
                            <h1 className="text-green-700 text-2xl mb-4 font-bold">Sự kiện</h1>
                            {isAdmin && (
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Thêm tin</button>
                                </div>
                            )}
                            <div className="flex flex-wrap">
                                <ul className="list-disc pl-5">
                                    {currentTuyendungLinks.map((item, index) => (
                                        <li className="mb-2" key={index}>
                                            <a className="text-blue-600 hover:underline" href={item.url} title={item.title}>
                                                {item.title}
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
                            <PgControl
                                currentPage={currentTuyendungPage}
                                totalPages={totalTuyendungPages}
                                onNextPage={() => handleTuyendungPageChange('next')}
                                onPrevPage={() => handleTuyendungPageChange('prev')}
                            />
                        </div>
                    </div>

                    {/* Ô Các khóa học sắp diễn ra */}
                    <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                        <header className="flex items-center mb-4">
                            <h1 className="text-2xl font-semibold">Các khóa học sắp diễn ra</h1>
                            {isAdmin && (
                                <button
                                    className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    onClick={handleAdd}
                                >
                                    Thêm
                                </button>
                            )}
                        </header>
                        {currentCourses.map((course, index) => (
                            <div key={index} className="p-6 max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg mb-6">
                                <h2 className="text-2xl font-semibold mb-4 font-inter">
                                    {course.date}: {course.name}
                                </h2>
                                <div className="mb-4">
                                    <p className="text-lg font-inter mb-2">
                                        <span className="font-semibold">Thời gian bắt đầu - kết thúc:</span>
                                        <span className="ml-2">{course.time}</span>
                                    </p>
                                    <p className="text-lg font-inter mb-2">
                                        <span className="font-semibold">Hình thức:</span>
                                        <span className="ml-2">{course.format}</span>
                                    </p>
                                    <p className="text-base font-semibold font-inter mt-2">
                                        {course.description}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    {isAdmin && (
                                        <>
                                            <button
                                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                                onClick={() => handleEdit()}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                                onClick={() => handleDelete()}
                                            >
                                                Xóa
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <PgControl
                            currentPage={currentCoursesPage}
                            totalPages={totalCoursesPages}
                            onNextPage={() => handleCoursesPageChange('next')}
                            onPrevPage={() => handleCoursesPageChange('prev')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
