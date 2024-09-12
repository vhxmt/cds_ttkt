'use client';
import { useState, useEffect } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from '@/components/providers/AuthProvider'; // Import hook to check admin rights
import ResearchAreaForm, { ResearchArea } from './form-huong-nghien-cuu';
import RelatedNewsForm, { RelatedNews } from './form-tin-tuc-lien-quan';
import PgControl from '@/components/display-block/PgControl';
interface ResearchData {
    title: string;
    researchAreas: ResearchArea[];
}

export default function HuongNghienCuu() {
    const [researchData, setResearchData] = useState<ResearchData | null>(null);
    const [selectedAreaIndex, setSelectedAreaIndex] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Số tin tức mỗi trang
    const [editAreaIndex, setEditAreaIndex] = useState<number | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isNewsFormVisible, setIsNewsFormVisible] = useState(false);
    const [editNewsIndex, setEditNewsIndex] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu');
            const data = await response.json();
            setResearchData(data);
            if (data.researchAreas.length > 0) {
                setSelectedAreaIndex(0);
                setCurrentPage(1); // Reset page khi dữ liệu thay đổi
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    if (!researchData) {
        return <div>Loading...</div>;
    }

    const { title, researchAreas = [] } = researchData || {};
    const selectedArea = researchAreas[selectedAreaIndex] || { name: '', description: '', relatedNews: [] };
    const totalPages = Math.ceil(selectedArea.relatedNews.length / itemsPerPage);

    const currentNews = selectedArea.relatedNews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleAreaClick = (index: number) => {
        setSelectedAreaIndex(index);
        setCurrentPage(1);
    };

    const handleSubmitArea = async (area: ResearchArea) => {
        const method = editAreaIndex !== null ? 'PUT' : 'POST';
        const url = '/api/nghien-cuu/huong-nghien-cuu';
        const body = editAreaIndex !== null
            ? { areaName: researchAreas[editAreaIndex].name, area }
            : { type: 'area', area };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchData();
                setIsFormVisible(false);
            } else {
                console.error('Failed to submit area');
            }
        } catch (error) {
            console.error('Error submitting area:', error);
        }
    };

    const handleDeleteResearchAreas = async (index: number) => {
        const areaName = researchAreas[index].name;

        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ areaName }),
            });

            if (response.ok) {
                await fetchData();
            } else {
                console.error('Failed to delete area:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    const handleAddResearchAreas = () => {
        setEditAreaIndex(null);
        setIsFormVisible(true);
    };

    const handleEdit = (index: number) => {
        setEditAreaIndex(index);
        setIsFormVisible(true);
    };

    const handleAddNews = () => {
        setEditNewsIndex(null);
        setIsNewsFormVisible(true);
    };

    const handleEditNews = (newsIndex: number) => {
        setEditNewsIndex(newsIndex);
        setIsNewsFormVisible(true);
    };

    const handleDeleteNews = async (newsId: number) => {
        const areaName = selectedArea.name;

        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ areaName, newsId }),
            });

            if (response.ok) {
                await fetchData();
                setSelectedAreaIndex(researchAreas.findIndex(area => area.name === areaName));
            } else {
                console.error('Failed to delete news:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };
    if (!researchData) {
        return <div>Loading...</div>;
    }
    const handleSubmitNews = async (news: RelatedNews) => {
        const method = editNewsIndex !== null ? 'PUT' : 'POST';
        const url = '/api/nghien-cuu/huong-nghien-cuu';
        const areaName = selectedArea.name;
        const body = editNewsIndex !== null
            ? { areaName, newsId: selectedArea.relatedNews[editNewsIndex].id, news }
            : { type: 'news', areaName, news };

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchData();
                setIsNewsFormVisible(false);
                setSelectedAreaIndex(researchAreas.findIndex(area => area.name === areaName));
            } else {
                console.error('Failed to submit news:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting news:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nghiên cứu" />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
                    {isAdmin && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAddResearchAreas}
                            >
                                Thêm hướng nghiên cứu
                            </button>
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {researchAreas.map((area, index) => (
                            <button
                                key={index}
                                onClick={() => handleAreaClick(index)}
                                className={`py-8 rounded-lg text-center ${
                                    selectedAreaIndex === index ? 'bg-gray-200' : 'bg-gray-300'
                                }`}
                            >
                                {area.name}
                                {isAdmin && (
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <button
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                            onClick={() => handleEdit(index)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                            onClick={() => handleDeleteResearchAreas(index)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="text-base mb-8">
                        {selectedArea.description}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Các tin liên quan</h3>
                        {isAdmin && (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAddNews}
                            >
                                Thêm tin liên quan
                            </button>
                        )}
                    </div>
                    <div className="space-y-6">
                        {currentNews.map((news, index) => (
                            <div key={news.id} className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold">{news.title}</h4>
                                    <p className="text-gray-600">{news.description}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <a href={news.link} className="text-[#BD1E1E]">
                                        Chi tiết &gt;&gt;
                                    </a>
                                    {isAdmin && (
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                                onClick={() => handleEditNews(index)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                onClick={() => handleDeleteNews(news.id)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />
                    {isFormVisible && (
                        <ResearchAreaForm
                            researchArea={editAreaIndex !== null ? researchAreas[editAreaIndex] : null}
                            onSubmit={handleSubmitArea}
                            onClose={() => setIsFormVisible(false)}
                        />
                    )}
                    {isNewsFormVisible && (
                        <RelatedNewsForm
                            relatedNews={editNewsIndex !== null ? selectedArea.relatedNews[editNewsIndex] : null}
                            onSubmit={handleSubmitNews}
                            onClose={() => setIsNewsFormVisible(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
