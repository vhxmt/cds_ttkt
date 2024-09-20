// src/app/NewPage/nhan-luc/sinh-vien-tien-si/page.tsx
"use client";
import { useState, useEffect } from 'react';
import UserInfo from '@/components/display-block/UserInfo';
import Banner from '@/components/display-block/Banner';
import PgControl from '@/components/display-block/PgControl';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from "@/components/providers/AuthProvider";
import StaffForm from './form-sinh-vien-tien-si';
import { Staff } from '@/interfaces/nhan-luc/interface';

export default function NewsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [staffData, setStaffData] = useState<Staff[]>([]);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const itemsPerPage = 5;
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const fetchStaffData = async () => {
        setIsLoading(true);
        setHasError(false);
        try {
            const response = await fetch('/api/nhan-luc/sinh-vien-tien-si');
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data?.staffData)) {
                    setStaffData(data.staffData);
                } else {
                    setHasError(true);
                }
            } else {
                setHasError(true);
            }
        } catch (error) {
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStaffData();
    }, []);

    const handleSubmitForm = async (staff: Staff, imageFile?: File) => {
        try {
            let imageUrl = staff.imageUrl;

            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                const uploadResponse = await fetch('/api/nhan-luc/sinh-vien-tien-si/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (uploadResponse.ok) {
                    const data = await uploadResponse.json();
                    imageUrl = data.imageUrl;
                } else {
                    console.error('Image upload failed');
                    return;
                }
            }

            const id = editingStaff ? editingStaff.id : `${Date.now()}`;
            const method = editingStaff ? 'PUT' : 'POST';
            const url = editingStaff
                ? `/api/nhan-luc/sinh-vien-tien-si?id=${editingStaff.id}`
                : '/api/nhan-luc/sinh-vien-tien-si';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...staff, imageUrl, id }),
            });

            if (response.ok) {
                setIsFormVisible(false);
                setEditingStaff(null);
                fetchStaffData(); 
            } else {
                console.error('Failed to submit staff data');
            }
        } catch (error) {
            console.error('Error submitting staff data:', error);
        }
    };

    const handleDelete = async (staff: Staff) => {
        try {
            const response = await fetch(`/api/nhan-luc/sinh-vien-tien-si?id=${staff.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchStaffData(); 
            } else {
                console.error('Failed to delete staff');
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
    };

    const handleAdd = () => {
        setEditingStaff(null);
        setIsFormVisible(true);
    };

    const handleEdit = (staff: Staff) => {
        setEditingStaff(staff);
        setIsFormVisible(true);
    };

    const handleCancelForm = () => {
        setIsFormVisible(false);
        setEditingStaff(null);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = staffData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(staffData.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nhân lực" />

                <div className="flex-1">
                    <Banner src="/image/banner/banner.png" alt="Banner" />

                    {isFormVisible ? (
                        <StaffForm
                            initialData={editingStaff || undefined}
                            onSubmit={handleSubmitForm}
                            onCancel={handleCancelForm}
                        />
                    ) : (
                        <>
                            <div className="flex justify-end mb-4">
                                {isAdmin && (
                                    <button
                                        className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        onClick={handleAdd}
                                    >
                                        Thêm
                                    </button>
                                )}
                            </div>

                            {isLoading ? (
                                <p>Loading...</p>
                            ) : hasError ? (
                                <p>Error loading data. Please check the console for more details.</p>
                            ) : currentItems.length > 0 ? (
                                currentItems.map((staff) => (
                                    <div key={staff.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
                                        <UserInfo
                                            name={staff.name}
                                            title={staff.title}
                                            mail={staff.mail}
                                            tel={staff.tel}
                                            imageUrl={staff.imageUrl}
                                            onEdit={() => handleEdit(staff)}
                                            onDelete={() => handleDelete(staff)}
                                            isAdmin={isAdmin}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No data available</p>
                            )}

                            <PgControl
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onNextPage={handleNextPage}
                                onPrevPage={handlePrevPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
