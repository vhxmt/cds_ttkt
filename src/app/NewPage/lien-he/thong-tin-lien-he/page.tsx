'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Breadcrumb from "@/components/breadcrumb";
import SideMenu from "@/components/display-block/SideMenu";
import { useAuth } from "@/components/providers/AuthProvider";
import ContactForm from './ContactForm';

// Define a unified interface for the data
interface ContactData {
    schoolName: string;
    address: string;
    phone: string;
    officeHours: string;
    email: string;
    facebookPage: string;
    bannerImageSrc: string;
    bannerAltText: string;
    bannerWidth: number;
    bannerHeight: number;
}

export default function ThongTinLienHe() {
    const [contactData, setContactData] = useState<ContactData | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false); // To toggle the form
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    // Fetch contact data from the API
    const fetchContactData = async () => {
        try {
            const response = await fetch('/api/lien-he/thong-tin-lien-he');
            const data = await response.json();

            // Ensure that the API response contains all the required fields
            if (data.schoolName && data.address && data.phone && data.officeHours && data.email && data.facebookPage && data.bannerImageSrc && data.bannerAltText && data.bannerWidth && data.bannerHeight) {
                setContactData(data); // Set the fetched data if all properties exist
            } else {
                console.error('Missing required fields in contact data:', data);
            }
        } catch (error) {
            console.error('Error fetching contact data:', error);
        }
    };

    useEffect(() => {
        fetchContactData(); // Fetch data on component mount
    }, []);

    const handleEdit = () => {
        setIsFormOpen(true); // Open the form when "Sửa" button is clicked
    };

    const handleCloseForm = () => {
        setIsFormOpen(false); // Close the form
    };

    const handleFormSubmit = async (formData: FormData) => {
        try {
            const response = await fetch('/api/lien-he/thong-tin-lien-he', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                await fetchContactData(); // Refresh data after successful update
                handleCloseForm(); // Close form after submission
            } else {
                console.error('Failed to update contact data');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (!contactData) {
        return <div>Loading...</div>; // Show a loading state while fetching
    }

    const {
        schoolName,
        address,
        phone,
        officeHours,
        email,
        facebookPage,
        bannerImageSrc,
        bannerAltText,
        bannerWidth,
        bannerHeight
    } = contactData;

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Liên hệ" />

                {/* Container with banner and contact info */}
                <div className="flex-1">
                    {/* Banner Image */}
                    <div className="mb-4">
                        <Image
                            src={bannerImageSrc} // Use banner data from API
                            alt={bannerAltText}
                            width={bannerWidth}
                            height={bannerHeight}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="text-xl font-semibold mb-4 text-gray-800 text-center">
                            {schoolName}
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Địa chỉ liên hệ:</p>
                            <p>{address}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Điện thoại:</p>
                            <p>{phone}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Thời gian liên hệ:</p>
                            <p>{officeHours}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Email:</p>
                            <p><a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a></p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Facebook page:</p>
                            <p><a href={facebookPage} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{facebookPage}</a></p>
                        </div>
                        {isAdmin && (
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={handleEdit}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                >
                                    Sửa
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Popup form for editing */}
            {isFormOpen && contactData && (
                <ContactForm
                    initialData={contactData} // Pass the current data to the form
                    onSubmit={handleFormSubmit}
                    onClose={handleCloseForm}
                    refreshData={fetchContactData} // Pass refresh function
                />
            )}
        </div>
    );
}
