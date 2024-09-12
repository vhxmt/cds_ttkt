'use client';
import { useState, useEffect } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from '@/components/providers/AuthProvider';
import ResearchAreaFormModal from './ResearchAreaFormModal';
import RelatedNewsFormModal from './RelatedNewsFormModal';

interface ResearchArea {
    name: string;
    highlight?: boolean;
    description?: string;
    relatedNews?: RelatedNews[];
}

interface RelatedNews {
    id: number;
    title: string;
    description: string;
    link: string;
}

interface ResearchData {
    title: string;
    researchAreas: ResearchArea[];
    description: string;
    relatedNews: RelatedNews[];
}

export default function HuongNghienCuu() {
    const [researchData, setResearchData] = useState<ResearchData | null>(null);
    const [selectedAreaIndex, setSelectedAreaIndex] = useState<number>(0);
    const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [currentArea, setCurrentArea] = useState<ResearchArea | undefined>(undefined);
    const [currentNews, setCurrentNews] = useState<RelatedNews | undefined>(undefined);
    const [previousSelectedAreaName, setPreviousSelectedAreaName] = useState<string>(''); // Track previous selected area

    const fetchData = async () => {
        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu');
            const data = await response.json();
            setResearchData(data);
    
            if (data.researchAreas.length > 0) {
                const index = data.researchAreas.findIndex(
                    (area: ResearchArea) => area.name === previousSelectedAreaName // Explicitly define the type here
                );
                setSelectedAreaIndex(index >= 0 ? index : 0); // Set back to the previous area if it exists
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, [previousSelectedAreaName]); // Refetch data when the selected area name changes

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    if (!researchData) {
        return <div>Loading...</div>;
    }

    const { title, researchAreas = [] } = researchData;
    const selectedArea = researchAreas[selectedAreaIndex] || { name: '', description: '', relatedNews: [] };

    const handleAreaClick = (index: number) => {
        setSelectedAreaIndex(index);
        setPreviousSelectedAreaName(researchAreas[index].name); // Store the current selected area's name
    };

    const handleAddResearchArea = () => {
        setCurrentArea(undefined);
        setIsAreaModalOpen(true);
    };

    const handleEditResearchArea = (index: number) => {
        setCurrentArea(researchAreas[index]);
        setIsAreaModalOpen(true);
    };

    const handleDeleteResearchArea = async (index: number) => {
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
                await fetchData(); // Refetch data after deleting the area
            } else {
                console.error('Failed to delete area:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    const handleAddNews = () => {
        setCurrentNews(undefined);
        setIsNewsModalOpen(true);
    };

    const handleEditNews = (newsId: number) => {
        const newsToEdit = selectedArea.relatedNews?.find((news) => news.id === newsId);
        setCurrentNews(newsToEdit);
        setIsNewsModalOpen(true);
    };

    const handleDeleteNews = async (id: number) => {
        const areaName = selectedArea.name;

        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ areaName, newsId: id }),
            });

            if (response.ok) {
                await fetchData(); // Refetch the data after deleting the news
            } else {
                console.error('Failed to delete news:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleAreaSubmit = async (area: ResearchArea) => {
        const method = currentArea ? 'PUT' : 'POST';
        const url = '/api/nghien-cuu/huong-nghien-cuu';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    areaName: currentArea?.name, // Only pass areaName if editing
                    area,
                    type: 'area',
                }),
            });

            if (response.ok) {
                setPreviousSelectedAreaName(area.name); // Remember the area name
                await fetchData(); // Refetch data after adding/editing
                setIsAreaModalOpen(false);
            } else {
                console.error('Failed to submit area:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting area:', error);
        }
    };

    const handleNewsSubmit = async (news: RelatedNews) => {
        const method = currentNews ? 'PUT' : 'POST';
        const areaName = selectedArea.name;

        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    areaName,
                    news,
                    type: 'news',
                }),
            });

            if (response.ok) {
                setPreviousSelectedAreaName(areaName); // Remember the area name
                await fetchData(); // Refetch data after adding/editing news
                setIsNewsModalOpen(false);
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
                                onClick={handleAddResearchArea}
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
                                className={`py-8 rounded-lg text-center ${selectedAreaIndex === index ? 'bg-gray-200' : 'bg-gray-300'}`}
                            >
                                {area.name}
                                {isAdmin && (
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <button
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                            onClick={() => handleEditResearchArea(index)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                            onClick={() => handleDeleteResearchArea(index)}
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
                        {selectedArea.relatedNews?.map((news) => (
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
                                        <>
                                            <button
                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                                onClick={() => handleEditNews(news.id)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                onClick={() => handleDeleteNews(news.id)}
                                            >
                                                Xóa
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals for adding/editing */}
            {isAreaModalOpen && (
                <ResearchAreaFormModal
                    isOpen={isAreaModalOpen}
                    onClose={() => setIsAreaModalOpen(false)}
                    onSubmit={handleAreaSubmit}
                    initialData={currentArea}
                />
            )}

            {isNewsModalOpen && (
                <RelatedNewsFormModal
                    isOpen={isNewsModalOpen}
                    onClose={() => setIsNewsModalOpen(false)}
                    onSubmit={handleNewsSubmit}
                    initialData={currentNews}
                />
            )}
        </div>
    );
}
