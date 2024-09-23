// src/app/Detail.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/breadcrumb';
import Description from '@/components/display-block/Description';
import SearchForm from '@/components/frame/SearchForm';

interface DetailData {
  id: string;
  title: string;
  bannerSrc?: string;
  description: string | string[];
  imageUrl?: string; // Include image URL if available
}

export default function DetailPage() {
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [searchResults, setSearchResults] = useState<DetailData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query; // Get the ID query parameter

  // Fetch data based on the ID parameter
  const fetchData = async () => {
    if (!id) return; // If no ID is provided, do not fetch
    try {
      const response = await fetch(`/api/blogs/detail?id=${id}`);
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
  }, [id]);

  const handleSearchResults = (results: DetailData[]) => {
    setSearchResults(results);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <Breadcrumb />
      <div className="flex flex-col items-center space-y-6">
        {/* Search Form */}
        <SearchForm onSearchResults={handleSearchResults} />

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results w-full">
            {searchResults.map((item) => (
              <div key={item.id} className="p-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-full max-h-60 object-cover rounded-lg shadow-md mb-4" />
                )}
                <Description description={item.description} />
              </div>
            ))}
          </div>
        )}

        {/* Detail Data */}
        {detailData && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
