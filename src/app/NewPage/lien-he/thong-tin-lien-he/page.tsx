// src/pages/ThongTinLienHe.tsx
'use client'
import Image from 'next/image';
import contactData from "@/data/lien-he/thong-tin-lien-he.json"; // Import JSON data
import Breadcrumb from "@/components/breadcrumb";
import SideMenu from "@/components/display-block/SideMenu";
import { useState } from 'react';
import {useAuth} from "@/components/providers/AuthProvider";

export default function ThongTinLienHe() {
    const { contactInfo, banner } = contactData; // Extract contactInfo and banner
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleEdit = () => {
        console.log("Sửa thông tin liên hệ");
        // Add your edit logic here
    };

    const handleDelete = () => {
        console.log("Xóa thông tin liên hệ");
        // Add your delete logic here
    };

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
                            src={banner.imageSrc} // Use banner data from JSON
                            alt={banner.altText}
                            width={banner.width}
                            height={banner.height}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="text-xl font-semibold mb-4 text-gray-800 text-center">
                            {contactInfo.schoolName}
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Địa chỉ liên hệ:</p>
                            <p>{contactInfo.address}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Điện thoại:</p>
                            <p>{contactInfo.phone}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Thời gian liên hệ:</p>
                            <p>{contactInfo.officeHours}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Email:</p>
                            <p><a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">{contactInfo.email}</a></p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Facebook page:</p>
                            <p><a href={contactInfo.facebookPage} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{contactInfo.facebookPage}</a></p>
                        </div>
                        {isAdmin && (
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={handleEdit}
                                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
