"use client";
import { useState, useEffect } from 'react';
import CooperationSection from "@/components/frame/CooperationSection";
import cooperationData from "@/data/cooperations.json";
import PgControl from '@/components/display-block/PgControl';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import NewsList from '@/components/display-block/news/NewsList';
import CooperationEventFormModal from './hop-tacFormModal';
import {CooperationEvent} from '@/interfaces/hop-tac/interface';

const { domesticCooperation } = cooperationData;

export default function NewsPage() {
    const [newsData, setNewsData] = useState<CooperationEvent[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNews, setCurrentNews] = useState<CooperationEvent | undefined>();

    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 3; // Number of events per page

    const isAdmin = true; // Change based on actual user status

    // Fetch news data from API
    const fetchNewsData = async () => {
        try {
            const res = await fetch('/api/hop-tac/hop-tac-khoi-han-lam');
            const data = await res.json();
            const eventsWithIds = data.cooperationEventData.map((event: CooperationEvent) => ({
                ...event,
                id: event.id || new Date().toISOString(), // Ensure id is always a string
            }));
            setNewsData(eventsWithIds);
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    useEffect(() => {
        fetchNewsData();
    }, []);

    const handleAdd = () => {
        setCurrentNews(undefined); 
        setIsModalOpen(true);
    };

    const handleEdit = (item: CooperationEvent) => {
        setCurrentNews(item); 
        setIsModalOpen(true);
    };

    const handleDelete = async (item: CooperationEvent) => {
        try {
            const res = await fetch(`/api/hop-tac/hop-tac-khoi-han-lam?id=${item.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchNewsData(); 
            } else {
                console.error('Failed to delete news item');
            }
        } catch (error) {
            console.error('Error deleting news item:', error);
        }
    };

    const handleSubmit = async (event: CooperationEvent) => {
        const isEdit = !!event.id; 
        const method = isEdit ? 'PUT' : 'POST';
        const url = '/api/hop-tac/hop-tac-khoi-han-lam';
        
        const bodyContent = isEdit
            ? { id: event.id, updatedEvent: event } 
            : { newEvent: event }; 
    
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyContent),
        });
    
        if (!response.ok) {
            console.error('Error submitting event:', await response.json());
            return;
        }
    
        fetchNewsData(); 
        setIsModalOpen(false); 
    };

    // Get paginated news
    const paginatedNews = newsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Hợp tác" />
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-end mb-4">
                        {isAdmin && (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm
                            </button>
                        )}
                    </div>

                    {/* News List */}
                    <NewsList
                        news={paginatedNews}
                        isAdmin={isAdmin}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    
                    <PgControl
                        currentPage={currentPage}
                        totalPages={Math.ceil(newsData.length / itemsPerPage)}
                        onNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(newsData.length / itemsPerPage)))}
                        onPrevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    />

                    {!isModalOpen && (
                        <CooperationSection
                            title={domesticCooperation.title}
                            items={domesticCooperation.items}
                        />
                    )}

                    
                </div>
            </div>

            <CooperationEventFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={currentNews} // Pass undefined for a new entry to clear fields
            />
        </div>
    );
}

