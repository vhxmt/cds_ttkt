// src/app/NewPage/nhan-luc/can-bo/page.tsx
"use client";
import { useState, useEffect } from 'react';
import UserInfo from '@/components/display-block/UserInfo';
import Banner from '@/components/display-block/Banner';
import PgControl from '@/components/display-block/PgControl';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from "@/components/providers/AuthProvider";
import StaffForm from './form-nhan-luc'; 

interface Staff {
    id: string; 
    name: string;
    title: string;
    mail: string;
    tel: string;
    imageUrl: string;
}

export default function NewsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [staffData, setStaffData] = useState<Staff[]>([]);
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null); // Track editing state
    const [isFormVisible, setIsFormVisible] = useState(false); // Show/hide form
    const itemsPerPage = 5;
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    useEffect(() => {
        // Fetch data from the API
        const fetchStaffData = async () => {
            try {
                const response = await fetch('/api/nhan-luc/can-bo');
                if (response.ok) {
                    const data = await response.json();
                    setStaffData(data.staffData);
                } else {
                    console.error('Failed to fetch staff data');
                }
            } catch (error) {
                console.error('Error fetching staff data:', error);
            }
        };

        fetchStaffData();
    }, []);

    const handleSubmitForm = async (staff: Staff, imageFile?: File) => {
        try {
            let imageUrl = staff.imageUrl;
    
            // Handle image upload if a new image is provided
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
    
                const uploadResponse = await fetch('/api/nhan-luc/upload', {
                    method: 'POST',
                    body: formData,
                });
    
                if (uploadResponse.ok) {
                    const data = await uploadResponse.json();
                    imageUrl = data.imageUrl; // Get the uploaded image URL
                } else {
                    console.error('Image upload failed');
                    return;
                }
            }
    
            // Generate a random ID for new staff if not editing
            const id = editingStaff ? editingStaff.id : `${Date.now()}`; // Use timestamp as ID
    
            const method = editingStaff ? 'PUT' : 'POST';
            const url = editingStaff
                ? `/api/nhan-luc/can-bo?id=${editingStaff.id}`
                : '/api/nhan-luc/can-bo';
    
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...staff, imageUrl, id }), // Include the ID
            });
    
            if (response.ok) {
                const updatedStaff = await response.json();
                setStaffData((prev) => {
                    if (editingStaff) {
                        return prev.map((s) => (s.id === editingStaff.id ? updatedStaff : s));
                    }
                    return [...prev, updatedStaff]; // Add new staff data
                });
                setIsFormVisible(false);
                setEditingStaff(null);
            } else {
                console.error('Failed to submit staff data');
            }
        } catch (error) {
            console.error('Error submitting staff data:', error);
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

    const handleDelete = async (staff: Staff) => {
        try {
            const response = await fetch(`/api/nhan-luc/can-bo?id=${staff.id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Refetch staff data after deletion
                const fetchStaffData = async () => {
                    try {
                        const response = await fetch('/api/nhan-luc/can-bo');
                        if (response.ok) {
                            const data = await response.json();
                            setStaffData(data.staffData); // Update state with latest data
                        } else {
                            console.error('Failed to fetch staff data');
                        }
                    } catch (error) {
                        console.error('Error fetching staff data:', error);
                    }
                };
    
                fetchStaffData();
            } else {
                console.error('Failed to delete staff');
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
        }
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
                    <Banner src="/banner.png" alt="Banner" />

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

                            {currentItems.map((staff) => (
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
                            ))}

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