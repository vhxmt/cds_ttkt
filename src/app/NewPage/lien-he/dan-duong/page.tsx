'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import SideMenu from '@/components/display-block/SideMenu';
import { useAuth } from '@/components/providers/AuthProvider';
import LabForm, { Lab } from './LabForm'; // Import the LabForm

// Define the types for lab data and categories
interface LabCategory {
    title: string;
    data: Lab[];
}

export default function DanDuong() {
    const [labCategories, setLabCategories] = useState<LabCategory[]>([]);
    const [newCategoryTitle, setNewCategoryTitle] = useState<string>(''); // For new category title
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Track which category is being added to
    const [labFormVisible, setLabFormVisible] = useState<boolean>(false);
    const [editingLab, setEditingLab] = useState<Lab | null>(null); // Track the lab being edited
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    // Fetch the labs from the API
    const fetchLabs = async () => {
        try {
            const response = await fetch('/api/lien-he/dan-duong');
            if (response.ok) {
                const data = await response.json();
                setLabCategories(data.labCategories);
            } else {
                console.error('Failed to fetch lab data');
            }
        } catch (error) {
            console.error('Error fetching lab data:', error);
        }
    };

    useEffect(() => {
        fetchLabs();
    }, []);

    // Handle adding a new category
    const handleAddCategory = async () => {
        if (!newCategoryTitle.trim()) {
            alert('Please enter a valid category title.');
            return;
        }

        const newCategory: LabCategory = {
            title: newCategoryTitle,
            data: [],
        };

        try {
            const response = await fetch('/api/lien-he/dan-duong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });

            if (response.ok) {
                setNewCategoryTitle(''); // Clear the input
                fetchLabs(); // Refresh the labs
            } else {
                console.error('Failed to add new category');
            }
        } catch (error) {
            console.error('Error adding new category:', error);
        }
    };

    // Handle deleting a category
    const handleDeleteCategory = async (categoryTitle: string) => {
        const confirmed = confirm(`Are you sure you want to delete the category "${categoryTitle}"?`);
        if (!confirmed) return;

        try {
            const response = await fetch('/api/lien-he/dan-duong', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryTitle }),
            });

            if (response.ok) {
                fetchLabs(); // Refresh the labs
            } else {
                console.error('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    // Handle adding a new lab
    const handleAddLab = (categoryTitle: string) => {
        setSelectedCategory(categoryTitle);
        setEditingLab(null); // Clear editing state
        setLabFormVisible(true); // Show the form
    };

    // Handle editing an existing lab
    const handleEditLab = (lab: Lab, categoryTitle: string) => {
        setSelectedCategory(categoryTitle);
        setEditingLab(lab); // Set the lab to be edited
        setLabFormVisible(true); // Show the form
    };

    // Handle submitting the lab form
    const handleSubmitLab = async (lab: Lab) => {
        try {
            const method = editingLab ? 'PUT' : 'POST';
            const endpoint = editingLab ? `/api/lien-he/dan-duong?id=${lab.id}` : '/api/lien-he/dan-duong';
            const body = JSON.stringify({ lab, categoryTitle: selectedCategory });

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });

            if (response.ok) {
                setLabFormVisible(false); // Hide the form
                setSelectedCategory(null);
                setEditingLab(null);
                fetchLabs(); // Refresh data after submission
            } else {
                console.error('Failed to save lab');
            }
        } catch (error) {
            console.error('Error saving lab:', error);
        }
    };

    // Handle deleting a lab
    const handleDeleteLab = async (labId: number, categoryTitle: string) => {
        try {
            const response = await fetch(`/api/lien-he/dan-duong?id=${labId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Re-sort IDs after deleting the lab
                const updatedCategories = labCategories.map(category => {
                    if (category.title === categoryTitle) {
                        const updatedData = category.data
                            .filter(lab => lab.id !== labId) // Filter out the deleted lab
                            .map((lab, index) => ({ ...lab, id: index + 1 })); // Reassign IDs
                        return { ...category, data: updatedData };
                    }
                    return category;
                });

                // Update the data on the server
                await fetch('/api/lien-he/dan-duong', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ labCategories: updatedCategories }),
                });

                setLabCategories(updatedCategories);
            } else {
                console.error('Failed to delete lab');
            }
        } catch (error) {
            console.error('Error deleting lab:', error);
        }
    };

    // Handle canceling the form
    const handleCancel = () => {
        setLabFormVisible(false); // Hide the form
        setEditingLab(null);
        setSelectedCategory(null);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Liên hệ" />
                <div className="flex-1">
                    <div className="mb-4">
                        <Image
                            src="/image/lien-he/dan-duong/banner.png"
                            alt="Banner"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    <div className="max-w-4xl mx-auto p-4">
                        <h2 className="text-2xl font-semibold mb-4">Danh sách các Phòng thí nghiệm</h2>

                        {/* Add New Category Section */}
                        {isAdmin && (
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Thêm danh mục mới</h3>
                                <div className="flex space-x-4 mb-4">
                                    <input
                                        type="text"
                                        value={newCategoryTitle}
                                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                                        placeholder="Tên danh mục mới"
                                        className="border border-gray-300 rounded-lg p-2 w-full"
                                    />
                                    <button
                                        onClick={handleAddCategory}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                    >
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        )}

                        {labCategories.map((category: LabCategory) => (
                            <div key={category.title} className="mb-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleDeleteCategory(category.title)}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                        >
                                            Xóa danh mục
                                        </button>
                                    )}
                                </div>
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                    <thead>
                                        <tr className="bg-gray-200 border-b">
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">STT</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Tên Phòng thí nghiệm</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Địa điểm hiện tại</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Trưởng nhóm nghiên cứu</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Thông tin liên hệ</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Mã bưu chính</th>
                                            {isAdmin && (
                                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Hành động</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.data.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="px-4 py-2 text-center text-gray-700">
                                                    Không có dữ liệu
                                                </td>
                                            </tr>
                                        ) : (
                                            category.data.map((lab: Lab, index: number) => (
                                                <tr key={lab.id} className="border-b">
                                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{index + 1}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.name}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.location}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.leader}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.contactInfo}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.postalCode}</td>
                                                    {isAdmin && (
                                                        <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">
                                                            <button
                                                                onClick={() => handleEditLab(lab, category.title)}
                                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                                            >
                                                                Sửa
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteLab(lab.id, category.title)}
                                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                            >
                                                                Xóa
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>

                                {isAdmin && (
                                    <button
                                        onClick={() => handleAddLab(category.title)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                                    >
                                        Thêm Phòng thí nghiệm
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Display LabForm when adding/editing */}
            {labFormVisible && (
                <LabForm
                    initialData={editingLab || undefined} // Convert null to undefined
                    onSubmit={handleSubmitLab}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
