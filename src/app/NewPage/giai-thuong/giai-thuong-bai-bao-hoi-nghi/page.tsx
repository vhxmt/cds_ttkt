// src/app/giai-thuong/giai-thuong-khac/page.tsx
'use client';
import { useState, useEffect, useCallback } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import { useAuth } from "@/components/providers/AuthProvider";

interface Award {
    recipients: string;
    award: string;
    organization: string;
    year: number;
    achievement: string;
}

export default function BaiBaoKhac() {
    const [currentPage, setCurrentPage] = useState(1);
    const [awardData, setAwardData] = useState<Award[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const itemsPerPage = 3;

    // Fetch the awards from the API
    const fetchAwards = useCallback(async () => {
        setIsLoading(true); // Set loading state before fetching data
        try {
            const response = await fetch('/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log("Fetched awardData: ", data);  // Debugging log
            setAwardData(data || []);  // Ensure it's an array
        } catch (error) {
            console.error('Failed to fetch awards:', error);
            setIsError(true);  // Set error state
        } finally {
            setIsLoading(false);  // Set loading to false
        }
    }, []); // Add an empty dependency array to ensure it doesn't recreate unnecessarily

    useEffect(() => {
        fetchAwards();
    }, [fetchAwards]);

    // Pagination logic
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

    const handleAdd = async () => {
        const newAward: Award = {
            recipients: "New Recipient",
            award: "New Award",
            organization: "New Organization",
            year: 2024,
            achievement: "New Achievement",
        };

        try {
            const response = await fetch('/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAward),
            });

            if (response.ok) {
                await fetchAwards();  // Refetch the data after successfully adding a new award
            } else {
                console.error('Failed to add award:', await response.json());
            }
        } catch (error) {
            console.error('Failed to add award:', error);
        }
    };

    const handleEdit = async (award: Award) => {
        const updatedAward: Award = { ...award, recipients: 'Updated Recipient' };

        try {
            const response = await fetch(`/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi?year=${award.year}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAward),
            });

            if (response.ok) {
                await fetchAwards();  // Refetch the data after successfully editing an award
            }
        } catch (error) {
            console.error('Failed to update award:', error);
        }
    };

    const handleDelete = async (award: Award) => {
        try {
            const response = await fetch(`/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi?year=${award.year}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchAwards();  // Refetch the data after successfully deleting an award
            }
        } catch (error) {
            console.error('Failed to delete award:', error);
        }
    };

    const headers = ['Người nhận giải', 'Giải thưởng', 'Tổ chức', 'Năm', 'Thành tích', 'Thao tác'];
    const columns = ['recipients', 'award', 'organization', 'year', 'achievement'];
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

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
                                        onEdit={() => handleEdit(item)}
                                        onDelete={() => handleDelete(item)}
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
        </div>
    );
}
