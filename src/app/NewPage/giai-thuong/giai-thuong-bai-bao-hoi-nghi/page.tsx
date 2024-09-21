// src/app/NewPage/giai-thuong/giai-thuong-bai-bao-hoi-nghi/page.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import Modal from '../form';  // Import the Modal component
import { useAuth } from "@/components/providers/AuthProvider";
import { Award } from '@/interfaces/giai-thuong/interface'; 

export default function BaiBaoKhac() {
    const [currentPage, setCurrentPage] = useState(1);
    const [awardData, setAwardData] = useState<Award[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAward, setCurrentAward] = useState<Award | null>(null);  // For editing
    const itemsPerPage = 3;

    // Fetch the awards from the API
    const fetchAwards = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setAwardData(data || []);
        } catch (error) {
            console.error('Failed to fetch awards:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAwards();
    }, [fetchAwards]);

    // Open the modal for adding or editing
    const handleAdd = () => {
        setCurrentAward(null);  // Clear current data for adding
        setIsModalOpen(true);
    };

    const handleEdit = (award: Award) => {
        setCurrentAward(award);  // Load current data for editing
        setIsModalOpen(true);
    };

    const handleDelete = async (award: Award) => {
        try {
            const response = await fetch(`/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi?id=${award.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchAwards();  // Refetch the data after successfully deleting an award
            }
        } catch (error) {
            console.error('Failed to delete award:', error);
        }
    };

    const handleModalSubmit = async (award: Award) => {
        // Log the data being submitted to check for missing fields
        console.log("Submitting award:", award);
    
        const method = award.id ? 'PUT' : 'POST';
        const url = award.id
            ? `/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi?id=${award.id}`
            : '/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi';
    
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: award.id,
                    author: award.author,
                    title: award.title,
                    organization: award.organization,
                    year: award.year,
                    description: award.description,
                }), // Ensure all required fields are included in the request body
            });
    
            if (response.ok) {
                await fetchAwards();  // Refetch the data after successfully adding or editing an award
                setIsModalOpen(false);  // Close the modal after submission
            } else {
                console.error('Failed to submit award:', await response.json());
            }
        } catch (error) {
            console.error('Failed to submit award:', error);
        }
    };
    

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const headers = isAdmin
        ? ['Tác giả', 'Tiêu đề', 'Tổ chức', 'Năm', 'Mô tả', 'Thao tác']
        : ['Tác giả', 'Tiêu đề', 'Tổ chức', 'Năm', 'Mô tả'];

    const columns = ['author', 'title', 'organization', 'year', 'description']; // Updated to match new field names

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = awardData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(awardData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (isLoading) {
        return <p>Loading data...</p>;
    }

    if (isError) {
        return <p>Failed to load data. Please try again later.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Giải thưởng" />
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h3 className="text-xl font-semibold mb-2 text-center">Giải thưởng Bài báo Hội nghị</h3>

                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <TableHeader headers={headers} />
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        rowData={item}
                                        columns={columns}
                                        onEdit={isAdmin ? () => handleEdit(item) : () => {}}
                                        onDelete={isAdmin ? () => handleDelete(item) : () => {}}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={headers.length} className="text-center">
                                        No awards found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {isAdmin && (
                        <div className="mb-4 mt-4">
                            <button onClick={handleAdd} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Thêm giải thưởng
                            </button>
                        </div>
                    )}

                    <PgControl currentPage={currentPage} totalPages={totalPages} onNextPage={handleNextPage} onPrevPage={handlePrevPage} />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={currentAward || undefined}
            />
        </div>
    );
}
