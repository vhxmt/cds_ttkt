'use client';
import { useState, useEffect } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from '@/components/providers/AuthProvider'; // Import hook to check admin rights

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

    const fetchData = async () => {
        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu');
            const data = await response.json();
            setResearchData(data);
            if (data.researchAreas.length > 0) {
                setSelectedAreaIndex(0);
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

    // Safeguard against undefined researchAreas
    const { title, researchAreas = [] } = researchData;
    const selectedArea = researchAreas[selectedAreaIndex] || { name: '', description: '', relatedNews: [] };

    const handleAreaClick = (index: number) => {
        setSelectedAreaIndex(index);
    };

    const handleAdd = async () => {
        const newArea = {
            name: "New Research Area",
            description: "Description of new research area",
            relatedNews: [],
        };

        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'area', area: newArea }),
            });

            if (response.ok) {
                await fetchData(); // Refetch data after adding new area
            } else {
                console.error('Failed to add new area:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new area:', error);
        }
    };

    const handleEdit = async (index: number) => {
        const updatedArea = {
            ...researchAreas[index],
            name: "Updated Research Area",
        };

        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ areaName: researchAreas[index].name, area: updatedArea }),
            });

            if (response.ok) {
                await fetchData(); // Refetch data after updating the area
            } else {
                console.error('Failed to update area');
            }
        } catch (error) {
            console.error('Error updating area:', error);
        }
    };

    const handleDelete = async (index: number) => {
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

    const handleEditNews = async (id: number) => {
        // Implement the logic to edit related news via API
        console.log("Edit related news with ID:", id);
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
                await fetchData(); // Refetch data after deleting the news
            } else {
                console.error('Failed to delete news:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const handleAddNews = async () => {
        const newNews = {
            id: Math.max(...(selectedArea.relatedNews?.map(news => news.id) || [0]), 0) + 1, // Generate a new ID
            title: "New Related News",
            description: "Description of the new related news",
            link: "#",
        };

        const areaName = selectedArea.name;

        try {
            const response = await fetch('/api/nghien-cuu/huong-nghien-cuu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'news', areaName, news: newNews }),
            });

            if (response.ok) {
                await fetchData(); // Refetch data after adding new news
            } else {
                console.error('Failed to add new news:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding new news:', error);
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
                                onClick={handleAdd}
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
                                            onClick={() => handleDelete(index)}
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
        </div>
    );
}
