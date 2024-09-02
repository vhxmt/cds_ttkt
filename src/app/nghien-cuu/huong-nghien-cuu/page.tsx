'use client';
import { useState, useEffect } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';

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

    if (!researchData) {
        return <div>Loading...</div>;
    }

    const { title, researchAreas } = researchData;
    const selectedArea = researchAreas[selectedAreaIndex];

    const handleAreaClick = (index: number) => {
        setSelectedAreaIndex(index);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nghiên cứu" />
                <div className="w-3/4 p-4 border-l border-gray-300">
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
                                <a href={news.link} className="text-[#BD1E1E]">
                                    Chi tiết &gt;&gt;
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
