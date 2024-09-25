// src/app/NewsPage/tin-tuc-su-kien/tin-tuc.tsx
'use client';
import { useState, useEffect } from 'react';
import NewsSection from '@/components/display-block/tin-tuc-block';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from '@/components/providers/AuthProvider';
import { NewsItem } from '@/interfaces/tin-tuc-su-kien/tin-tuc/interface';

export default function NewsPage() {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = isLoggedIn && user?.role === 'admin';
  const itemsPerPage = 10;

  // State to store fetched data
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsResponse = await fetch('/api/tin-tuc-su-kien/tin-tuc');

        if (!newsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await newsResponse.json();
        console.log('Fetched Data:', data); // Check the structure of the fetched data
        setNewsData(data.newsData); // Set the flat newsData array
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler for adding a news item
  const handleAddNews = async (newItem: NewsItem) => {
    try {
      const response = await fetch('/api/tin-tuc-su-kien/tin-tuc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        const updatedNews = await response.json();
        setNewsData(updatedNews.newsData); // Update with the new flat newsData array
      }
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  // Handler for updating a news item
  const handleEditNews = async (id: string, updatedItem: NewsItem) => {
    try {
      const response = await fetch('/api/tin-tuc-su-kien/tin-tuc', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, updatedItem }), // Send item id and updated data
      });
      if (response.ok) {
        const updatedNews = await response.json();
        setNewsData(updatedNews.newsData); // Update with the new flat newsData array
      }
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  // Handler for deleting a news item
  const handleDeleteNews = async (id: string) => {
    try {
      const response = await fetch('/api/tin-tuc-su-kien/tin-tuc', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Send the id of the item to delete
      });
      if (response.ok) {
        const updatedNews = await response.json();
        setNewsData(updatedNews.newsData); // Update with the new flat newsData array
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      <Breadcrumb />
      <div className="flex space-x-4">
        <SideMenu currentSection="Tin tức/Sự kiện" />
        <div className="flex-1">
          <div className="flex bg-white mb-10 flex-wrap">
            {/* Tin tức nổi bật */}
            <NewsSection
              title="Tin tức nổi bật"
              items={newsData || []} // Use newsData state directly
              itemsPerPage={itemsPerPage}
              isAdmin={isAdmin}
              onAddItem={handleAddNews}
              onEditItem={handleEditNews}
              onDeleteItem={handleDeleteNews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
