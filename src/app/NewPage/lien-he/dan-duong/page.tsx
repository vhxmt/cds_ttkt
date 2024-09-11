// src/pages/danduong.tsx
'use client'
import Image from 'next/image';
import labData from "@/data/lien-he/dan-duong.json"; // Import the JSON data
import Breadcrumb from "@/components/breadcrumb";
import SideMenu from "@/components/display-block/SideMenu";
import { useState } from 'react';
import {useAuth} from "@/components/providers/AuthProvider";

export default function DanDuong() {
    const { headers, labCategories } = labData; // Extract headers and labCategories from labData
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleAdd = () => {
        console.log("Thêm phòng thí nghiệm");
        // Add your add logic here
    };

    const handleEdit = (lab: { id: number; name: string; location: string; leader: string; contactInfo: string; postalCode: string }) => {
        console.log("Sửa phòng thí nghiệm:", lab);
        // Add your edit logic here
    };

    const handleDelete = (lab: { id: number; name: string; location: string; leader: string; contactInfo: string; postalCode: string }) => {
        console.log("Xóa phòng thí nghiệm:", lab);
        // Add your delete logic here
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Main Container */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Liên hệ" />
                {/* Container with banner and tables */}
                <div className="flex-1">
                    {/* Banner Image */}
                    <div className="mb-4">
                        <Image
                            src="/image/lien-he/dan-duong/banner.png" // Change to your banner image path
                            alt="Banner"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    <div className="max-w-4xl mx-auto p-4">
                        <h2 className="text-2xl font-semibold mb-4">Danh sách các Phòng thí nghiệm</h2>

                        {labCategories.map((category) => (
                            <div key={category.title} className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                    <thead>

                                    <tr className="bg-gray-200 border-b">
                                        {headers.map((header, index) => (
                                            <th key={index} className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">
                                                {header}
                                            </th>
                                        ))}
                                        {isAdmin && (
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">
                                                Hành động
                                            </th>
                                        )}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {category.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={headers.length + (isAdmin ? 1 : 0)} className="px-4 py-2 text-center text-gray-700">
                                                Không có dữ liệu
                                            </td>
                                        </tr>
                                    ) : (
                                        category.data.map((lab, index) => (
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
                                                            onClick={() => handleEdit(lab)}
                                                            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                                                        >
                                                            Sửa
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(lab)}
                                                            className=" mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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
                                    <div className="mb-4 mt-4">
                                        <button
                                            onClick={handleAdd}
                                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
