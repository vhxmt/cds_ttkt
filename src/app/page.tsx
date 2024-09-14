'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CooperationSection from '@/components/frame/CooperationSection';
import HomePageForm from './HomePageForm';
import CooperationForm from './CooperationForm'; // Import the cooperation form component
import { useAuth } from "@/components/providers/AuthProvider";

export default function Home() {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const [homePageData, setHomePageData] = useState<any>(null);
    const [cooperationData, setCooperationData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isCooperationFormOpen, setIsCooperationFormOpen] = useState(false); // New state for cooperation form

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

        const fetchCooperationData = async () => {
            try {
                const response = await fetch('/api/cooperation');
                if (!response.ok) {
                    throw new Error('Failed to fetch cooperation data');
                }
                const data = await response.json();
                setCooperationData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchHomePageData();
        fetchCooperationData();
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
                setIsFormOpen(false);
            } else {
                console.error('Failed to update home page data');
            }
        } catch (error) {
            console.error('Error updating home page data:', error);
        }
    };

    // Handle cooperation form submission
    const handleCooperationSubmit = async (updatedData: any) => {
        try {
            const res = await fetch('/api/cooperation', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                setCooperationData(updatedData);
                setIsCooperationFormOpen(false);
            } else {
                console.error('Failed to update cooperation data');
            }
        } catch (error) {
            console.error('Error updating cooperation data:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Ensure that homePageData exists before accessing properties
    if (!homePageData) return <p>Error: Home page data is missing or invalid.</p>;

    const strategicGoalsItems = homePageData?.StrategicGoalsItems ? homePageData.StrategicGoalsItems.split('\n') : [];

    // Ensure that cooperationData is not null or undefined before accessing its properties
    if (!cooperationData || !cooperationData.domesticCooperation || !cooperationData.internationalCooperation) {
        return <p>Error: Cooperation data is missing or invalid.</p>;
    }

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
                <ul className="list-disc list-inside mb-4">
                    {strategicGoalsItems.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
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

            {/* Domestic Cooperation Section */}
            <CooperationSection
                title={cooperationData.domesticCooperation.title}
                items={cooperationData.domesticCooperation.items}
            />

            {isAdmin && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsCooperationFormOpen(true)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Edit Domestic Cooperation
                    </button>
                </div>
            )}

            {/* International Cooperation Section */}
            <CooperationSection
                title={cooperationData.internationalCooperation.title}
                items={cooperationData.internationalCooperation.items}
            />

            {isAdmin && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsCooperationFormOpen(true)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Edit International Cooperation
                    </button>
                </div>
            )}

            {/* Render the popup forms if they are open */}
            {isFormOpen && (
                <HomePageForm
                    initialData={homePageData}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}

            {isCooperationFormOpen && (
                <CooperationForm
                    initialData={cooperationData}
                    onSubmit={handleCooperationSubmit}
                    onCancel={() => setIsCooperationFormOpen(false)}
                />
            )}
        </main>
    );
}
