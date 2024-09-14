'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CooperationSection from '@/components/frame/CooperationSection';
import cooperationData from '@/data/cooperations.json';
const { domesticCooperation, internationalCooperation } = cooperationData;

export default function Home() {
    const [homePageData, setHomePageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHomePageData = async () => {
            try {
                const response = await fetch('/api/homePage');
                if (!response.ok) {
                    throw new Error('Failed to fetch home page data');
                }
                const data = await response.json();
                setHomePageData(data.HomePageData); 
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHomePageData();
    }, []);

    if (loading) {return <p>Loading...</p>;}

    if (error) {return <p>Error: {error}</p>;}

    return (
        <main className="relative min-h-screen bg-gray-100 dark:bg-white">
            {/* Banner Section */}
            <div className="relative w-full h-[400px] overflow-hidden">
                <Image
                    src={homePageData.src}
                    alt={homePageData.alt}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                />
            </div>

            {/* Introduction Section */}
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    {homePageData.IntroductionTitle}
                </h1>
                <p className="mb-4">
                    {homePageData.IntroductionDescription}
                </p>
                <h2 className="text-xl font-semibold mb-2">
                    {homePageData.StrategicGoalsTitle}
                </h2>
                <ul className="list-disc list-inside mb-4">
                    {homePageData.StrategicGoalsItems.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Cooperation Sections */}
            <CooperationSection
                title={domesticCooperation.title}
                items={domesticCooperation.items}
            />
            <CooperationSection
                title={internationalCooperation.title}
                items={internationalCooperation.items}
            />
        </main>
    );
}
