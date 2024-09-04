'use client';
import { useState, useEffect } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from '@/components/providers/AuthProvider'; // Import hook để kiểm tra quyền admin

// Define the types for the data based on the JSON structure
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
    const [selectedAreaIndex, setSelectedAreaIndex] = useState<number>(0); // Default to the first item

    useEffect(() => {
        import('@/data/nghien-cuu/huong-nghien-cuu/data.json')
            .then((module) => {
                setResearchData(module.default as ResearchData);
                // Set default selected area to the first one if data is available
                if (module.default && module.default.researchAreas.length > 0) {
                    setSelectedAreaIndex(0);
                }
            })
            .catch((error) => console.error('Error loading JSON data:', error));
    }, []);

    // Get user authentication and role information
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    if (!researchData) {
        return <div>Loading...</div>;
    }

    const { title, researchAreas } = researchData;
    const selectedArea = researchAreas[selectedAreaIndex];

    const handleAreaClick = (index: number) => {
        setSelectedAreaIndex(index);
    };

    const handleAdd = () => {
        console.log("Thêm lĩnh vực nghiên cứu mới");
    };

    const handleEdit = (index: number) => {
        console.log("Sửa lĩnh vực nghiên cứu tại vị trí:", index);
    };

    const handleDelete = (index: number) => {
        console.log("Xóa lĩnh vực nghiên cứu tại vị trí:", index);
    };

    const handleEditNews = (id: number) => {
        console.log("Sửa tin liên quan với ID:", id);
    };

    const handleDeleteNews = (id: number) => {
        console.log("Xóa tin liên quan với ID:", id);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nghiên cứu" />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    {/* Nút "Thêm" */}
                    {isAdmin && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm
                            </button>
                        </div>
                    )}

                    <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
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
                    <h3 className="text-xl font-semibold mb-4">Các tin liên quan</h3>
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
