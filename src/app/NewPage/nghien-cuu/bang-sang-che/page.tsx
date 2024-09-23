'use client';
import { useState, useEffect } from 'react';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import PgControl from '@/components/display-block/PgControl';
import TableHeader from '@/components/display-block/TableHeader';
import PatentForm, { Patent } from './PatentForm';
import { useAuth } from '@/components/providers/AuthProvider';

export default function BangSangChe() {
    const [patents, setPatents] = useState<Patent[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPatent, setEditingPatent] = useState<Patent | null>(null);

    // Fetch patents data from API
    const fetchPatents = async () => {
        try {
            const response = await fetch('/api/nghien-cuu/bang-sang-che');
            const data = await response.json();
            setPatents(data);
        } catch (error) {
            console.error('Error fetching patents:', error);
        }
    };

    useEffect(() => {
        fetchPatents(); // Fetch data on component mount
    }, []);

    const openForm = (patent?: Patent) => {
        setEditingPatent(patent || null); // If a patent is passed, it's editing; otherwise, it's adding
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (patent: Patent) => {
        try {
            if (editingPatent) {
                // Handle Edit
                await fetch(`/api/nghien-cuu/bang-sang-che?patentId=${editingPatent.stt}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(patent),
                });
            } else {
                // Handle Add (Auto-increment stt)
                const newPatent = {
                    ...patent,
                    stt: patents.length > 0 ? Math.max(...patents.map(p => p.stt)) + 1 : 1,
                };
                await fetch('/api/nghien-cuu/bang-sang-che', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPatent),
                });
            }
            fetchPatents(); // Refetch patents after adding/editing
            closeForm();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = patents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(patents.length / itemsPerPage);

    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    const handleDelete = async (patent: Patent) => {
        try {
            const response = await fetch(`/api/nghien-cuu/bang-sang-che?patentId=${patent.stt}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchPatents(); // Refetch the patents list after deletion
            } else {
                console.error('Failed to delete patent:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting patent:', error);
        }
    };

    const headers = [
        'STT',
        'Họ và tên tác giả',
        'SC/GPHI',
        'Tên SC/GPHI',
        'Ngày nộp',
        'Năm nộp',
        'Số nhận đơn',
        'Năm cấp bằng độc quyền',
        'Ngày cấp văn bằng',
        'Số văn bằng',
        'Số QĐ cấp',
        'Đơn vị',
        ...(isAdmin ? ['Thao tác'] : []),
    ];

    const columns = [
        'stt', 'author', 'type', 'title', 'submissionDate', 'submissionYear',
        'applicationNumber', 'grantYear', 'grantDate', 'grantNumber', 'decisionNumber', 'unit',
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nghiên cứu" />

                <div className="w-3/4 p-4 border-l border-gray-300">
                    {isAdmin && (
                        <div className="flex justify-end mb-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={() => openForm()}
                            >
                                Thêm
                            </button>
                        </div>
                    )}

                    <h3 className="text-xl font-semibold mb-2 text-center">Danh sách bằng sáng chế</h3>
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead>
                            <TableHeader headers={headers} />
                        </thead>
                        <tbody>
                            {currentItems.map((patent, index) => (
                                <tr key={index}>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="py-2 px-4 border-t">
                                            {patent[column as keyof Patent]}
                                        </td>
                                    ))}
                                    {isAdmin && (
                                        <td className="py-2 px-4 border-t">
                                            <div className="flex space-x-2">
                                                <button
                                                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                                                    onClick={() => openForm(patent)}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                    onClick={() => handleDelete(patent)}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={handleNextPage}
                        onPrevPage={handlePrevPage}
                    />
                </div>
            </div>

            {isFormOpen && (
                <PatentForm
                    initialData={editingPatent}
                    onSubmit={handleFormSubmit}
                    onClose={closeForm}
                />
            )}
        </div>
    );
}
