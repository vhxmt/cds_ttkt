'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/breadcrumb';
import Description from '@/components/display-block/Description'; // Import the Description component

interface DetailData {
    title: string;
    bannerSrc?: string;
    description: string | string[]; // Update to match the Description component's props
}

export default function DetailPage() {
    const [detailData, setDetailData] = useState<DetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const { type } = router.query; // Get the type query parameter

    // Fetch data based on the type parameter
    const fetchData = async () => {
        if (!type) return; // If no type is provided, do not fetch
        try {
            const response = await fetch(`/api/detail/${type}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch detail data: ${response.statusText}`);
            }
            const data: DetailData = await response.json();
            setDetailData(data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching detail data');
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!detailData) return <p>No data available</p>;

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            <Breadcrumb />
            <div className="flex flex-col items-center space-y-6">
                {/* Title */}
                <h1 className="text-3xl font-semibold text-center text-gray-800">{detailData.title}</h1>

                {/* Optional Banner */}
                {detailData.bannerSrc && (
                    <img
                        src={detailData.bannerSrc}
                        alt={detailData.title}
                        className="w-full max-h-60 object-cover rounded-lg shadow-md"
                    />
                )}

                {/* Description */}
                <Description description={detailData.description} />
            </div>
        </div>
    );
}
