'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CooperationSection from '@/components/frame/CooperationSection';
import cooperationData from '@/data/cooperations.json';
import HomePageForm from './HomePageForm'; // Import the popup form component
import { useAuth } from "@/components/providers/AuthProvider";

const { domesticCooperation, internationalCooperation } = cooperationData;

export default function Home() {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const [homePageData, setHomePageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false); // State for opening the form

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
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchHomePageData();
    }, []);

    // Handle form submission
    const handleFormSubmit = async (updatedData: any) => {
        try {
            const res = await fetch('/api/homePage', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ HomePageData: updatedData }),
            });

            if (res.ok) {
                setHomePageData(updatedData);
                setIsFormOpen(false); // Close the form on success
            } else {
                console.error('Failed to update home page data');
            }
        } catch (error) {
            console.error('Error updating home page data:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Split StrategicGoalsItems into individual lines
    const strategicGoalsItems = homePageData.StrategicGoalsItems.split('\n');

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

                {/* Strategic Goals Section */}
                <h2 className="text-xl font-semibold mb-2">
                    {homePageData.StrategicGoalsTitle}
                </h2>
                <ul className="list-none list-inside mb-4">
                    {strategicGoalsItems.map((item: string, index: number) => (
                        <li key={index} style={{ textIndent: "1rem" }}>{item}</li>
                    ))}
                </ul>




                {/* Show Edit Button for Admin */}
                {isAdmin && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            <CooperationSection
                title={domesticCooperation.title}
                items={domesticCooperation.items}
            />
            <CooperationSection
                title={internationalCooperation.title}
                items={internationalCooperation.items}
            />

            {/* Render the popup form if it's open */}
            {isFormOpen && (
                <HomePageForm
                    initialData={homePageData}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </main>
    );
}
