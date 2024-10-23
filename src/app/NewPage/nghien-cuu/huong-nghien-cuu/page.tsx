'use client';
import { useState, useEffect } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from '@/components/providers/AuthProvider';
import ResearchAreaFormModal from './ResearchAreaFormModal';
import RelatedNewsFormModal from './RelatedNewsFormModal';
import { ResearchData, ResearchArea, RelatedNews } from '@/interfaces/nghien-cuu/huong-nghien-cuu/interface';

export default function HuongNghienCuu() {
    const [researchData, setResearchData] = useState<ResearchData | null>(null);
    const [selectedAreaID, setSelectedAreaID] = useState<string | null>(null);
    const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [currentArea, setCurrentArea] = useState<ResearchArea | undefined>(undefined);
    const [currentNews, setCurrentNews] = useState<RelatedNews | undefined>(undefined);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu');
            const data: ResearchData = await response.json();
            setResearchData(data);
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

    const selectedArea = researchData.researchAreas.find(area => area.researchAreaID === selectedAreaID);

    const handleAreaClick = (researchAreaID: string) => {
        setSelectedAreaID(researchAreaID);
    };

    const handleAddResearchArea = () => {
        setCurrentArea(undefined);
        setIsAreaModalOpen(true);
    };

    const handleEditResearchArea = (area: ResearchArea) => {
        setCurrentArea(area);
        setIsAreaModalOpen(true);
    };

    const handleDeleteResearchArea = async (researchAreaID: string) => {
        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ researchAreaID, type: 'area' }), // Pass type 'area' to delete area and related news
            });
    
            if (response.ok) {
                await fetchData(); // Refetch data after deleting the area and its related news
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
    
    const handleEditNews = (news: RelatedNews) => {
        setCurrentNews(news);
        setIsNewsModalOpen(true);
    };

    const handleDeleteNews = async (id: string) => {
        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, type: 'news' }),
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
        const url = '/api/nghien-cuu/huong-nghien-cuu'; // This should match the API route
    
        const newArea = currentArea ? area : { ...area, researchAreaID: new Date().toISOString() };
    
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    area: newArea,
                    type: 'area',
                }),
            });
    
            if (response.ok) {
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
        const url = '/api/nghien-cuu/huong-nghien-cuu';
    
        // Ensure a unique ID is set if creating new related news and associate it with the selected area
        const newNews = {
            ...news,
            id: currentNews ? news.id : new Date().toISOString(), // Generate a new ID if not editing
            researchAreaID: selectedAreaID ?? news.researchAreaID // Use selectedAreaID if creating a new news
        };
    
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    researchAreaID: selectedAreaID, // Reference the selected research area
                    news: newNews,
                    type: 'news',
                }),
            });
    
            if (response.ok) {
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
                    <h2 className="text-2xl font-semibold mb-4 text-center">Hướng nghiên cứu</h2>
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
                        {researchData.researchAreas.map((area) => (
                            <button
                                key={area.researchAreaID}
                                onClick={() => handleAreaClick(area.researchAreaID ?? '')}
                                className={`py-8 rounded-lg text-center ${
                                    selectedAreaID === area.researchAreaID ? 'bg-gray-200' : 'bg-gray-300'
                                }`}
                            >
                                {area.name}
                                {isAdmin && (
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <button
                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                            onClick={() => handleEditResearchArea(area)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                            onClick={() => handleDeleteResearchArea(area.researchAreaID ?? '')}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="text-base mb-8">{selectedArea?.description}</div>
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
                        {researchData.relatedNews
                            .filter((news) => news.researchAreaID === selectedAreaID)
                            .map((news) => (
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
                                                    onClick={() => handleEditNews(news)}
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
                initialData={{
                    ...currentNews,
                    researchAreaID: selectedAreaID ?? '', // Ensure researchAreaID is a string
                    id: currentNews?.id ?? '', // Provide a default empty string if id is undefined
                    title: currentNews?.title ?? '', // Ensure title is a string
                    description: currentNews?.description ?? '', // Ensure description is a string
                    link: currentNews?.link ?? '', // Ensure link is a string
                }}
            />
            )}
        </div>
    );
}
