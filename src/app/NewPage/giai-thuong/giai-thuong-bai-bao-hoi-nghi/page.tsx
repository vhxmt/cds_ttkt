'use client';
import { useState } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import TableRow from '@/components/display-block/TableRow';
import data from '@/data/giai-thuong/giai-thuong-bai-bao-hoi-nghi/data.json';
import AwardForm, { Award } from './form-bai-bao-hoi-nghi'; // Correct path
import { useAuth } from "@/components/providers/AuthProvider";

interface AwardData {
    awards: Award[];
}

export default function BaiBaoHoiNghi() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingAward, setEditingAward] = useState<Award | null>(null);
    const [awardList, setAwardList] = useState<Award[]>(data.awards); // Set initial state from data
    const itemsPerPage = 3;

    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    // Calculate indices for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = awardList.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(awardList.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleAdd = () => {
        setEditingAward(null);
        setShowForm(true);
    };

    const handleEdit = (award: Award) => {
        setEditingAward(award);
        setShowForm(true);
    };

    const handleDelete = async (award: Award) => {
        if (window.confirm('Are you sure you want to delete this award?')) {
            try {
                const response = await fetch(`/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi/${award.stt}`, { method: 'DELETE' });
                if (response.ok) {
                    const updatedList = awardList.filter((a) => a.stt !== award.stt);
                    setAwardList(updatedList);
                } else {
                    console.error('Failed to delete award:', await response.json());
                }
            } catch (error) {
                console.error('Failed to delete award:', error);
            }
        }
    };

    const handleFormSubmit = async (award: Award) => {
        if (award.stt) {
            // Editing existing award
            try {
                const response = await fetch(`/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi/${award.stt}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(award),
                });

                if (response.ok) {
                    const updatedList = awardList.map((a) =>
                        a.stt === award.stt ? award : a
                    );
                    setAwardList(updatedList);
                } else {
                    console.error('Failed to update award:', await response.json());
                }
            } catch (error) {
                console.error('Failed to update award:', error);
            }
        } else {
            // Adding new award
            try {
                const response = await fetch('/api/giai-thuong/giai-thuong-bai-bao-hoi-nghi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(award),
                });

                if (response.ok) {
                    const newAward = await response.json();
                    setAwardList([newAward, ...awardList]);
                } else {
                    console.error('Failed to add award:', await response.json());
                }
            } catch (error) {
                console.error('Failed to add award:', error);
            }
        }
        setShowForm(false);
    };

    const handleFormClose = () => {
        setShowForm(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Giải thưởng" />

                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h3 className="text-xl font-semibold mb-2 text-center">Giải thưởng Bài báo Hội nghị</h3>

                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <TableHeader headers={[
                                'Người nhận giải', 'Giải thưởng', 'Tổ chức', 'Năm', 'Thành tích'
                            ]} />
                        </thead>
                        <tbody>
                            {currentItems.map((award, index) => (
                                <TableRow
                                    key={index}
                                    rowData={award}
                                    columns={[
                                        'recipients', 'award', 'organization', 'year', 'achievement'
                                    ]}
                                    onEdit={() => handleEdit(award)}
                                    onDelete={() => handleDelete(award)}
                                />
                            ))}
                        </tbody>
                    </table>

                    {isAdmin && (
                        <div className="mb-4 mt-4">
                            <button
                                onClick={handleAdd}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            >
                                Thêm giải thưởng
                            </button>
                        </div>
                    )}

                    {/* Pagination Controls */}
                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />

                    {showForm && (
                        <AwardForm
                            award={editingAward}
                            onSubmit={handleFormSubmit}
                            onClose={handleFormClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
