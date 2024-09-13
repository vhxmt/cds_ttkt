'use client';
import { useState } from 'react';

// Define the unified interface for the form data
interface ContactData {
    schoolName: string;
    address: string;
    phone: string;
    officeHours: string;
    email: string;
    facebookPage: string;
    bannerImageSrc: string; // For banner image URL
    bannerAltText: string;
}

interface ContactFormProps {
    initialData: ContactData; // Expecting the unified data structure
    onSubmit: (formData: FormData) => void;
    onClose: () => void;
    refreshData: () => void; // Callback to refresh data
}

export default function ContactForm({ initialData, onSubmit, onClose, refreshData }: ContactFormProps) {
    const [formData, setFormData] = useState<ContactData>(initialData);
    const [banner, setBanner] = useState<File | null>(null); // For file uploads
    const [isUploading, setIsUploading] = useState<boolean>(false); // Track the file upload status
    const [bannerPath, setBannerPath] = useState<string>(initialData.bannerImageSrc); // For preview

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);

            // Handle the file upload immediately
            const formDataToSend = new FormData();
            formDataToSend.append('banner', file);

            setIsUploading(true); // Mark as uploading

            try {
                const response = await fetch('/api/lien-he/thong-tin-lien-he/upload', {
                    method: 'POST',
                    body: formDataToSend,
                });

                const data = await response.json();
                if (response.ok) {
                    setBannerPath(data.filePath); // Update the banner path for preview and store it
                } else {
                    console.error('Banner upload failed:', data.message);
                }
            } catch (error) {
                console.error('Error uploading banner:', error);
            } finally {
                setIsUploading(false); // Mark as upload finished
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Ensure the form isn't submitted until the file upload is done
            if (isUploading) {
                alert('Please wait for the file upload to complete');
                return;
            }

            // Submit the form data including the updated banner path
            const formDataToSend = new FormData();
            formDataToSend.append('contactInfo', JSON.stringify({ ...formData, bannerImageSrc: bannerPath }));

            // Call the API to update the JSON file
            const response = await fetch('/api/lien-he/thong-tin-lien-he', {
                method: 'PUT',
                body: formDataToSend,
            });

            if (response.ok) {
                onClose(); // Close the form on success
                refreshData(); // Refresh the contact data after successful update
            } else {
                const errorData = await response.json();
                console.error('Error updating contact info:', errorData.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-xl mb-4">Sửa thông tin liên hệ</h2>
                <form onSubmit={handleSubmit}>
                    {/* Contact Info Fields */}
                    <div className="mb-4">
                        <label className="block mb-1">Tên trường</label>
                        <input
                            type="text"
                            name="schoolName"
                            value={formData.schoolName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Thời gian liên hệ</label>
                        <input
                            type="text"
                            name="officeHours"
                            value={formData.officeHours}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Facebook page</label>
                        <input
                            type="url"
                            name="facebookPage"
                            value={formData.facebookPage}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Banner Upload */}
                    <div className="mb-4">
                        <label className="block mb-1">Banner Image</label>
                        <input type="file" name="banner" accept="image/*" onChange={handleBannerChange} />
                        {bannerPath && (
                            <div className="mt-2">
                                <img src={bannerPath} alt={formData.bannerAltText} className="w-full rounded-lg" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                            onClick={onClose}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            disabled={isUploading} // Disable submit button while uploading
                        >
                            {isUploading ? 'Uploading...' : 'Cập nhật'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
