'use client'
import Image from 'next/image';
import data from "@/data/tin-tuc-su-kien/su-kien/thao-luan-chuyen-de-body.json";
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from "@/components/providers/AuthProvider";

const { eventDetails } = data;

export default function NewsPage() {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleEditSemester = () => {
        // Xử lý logic khi người dùng muốn sửa thông tin của một học kỳ
    };

    const handleDeleteSemester = () => {
        // Xử lý logic khi người dùng muốn xóa thông tin của một học kỳ
    };

    const handleEditDate = () => {
        // Xử lý logic khi người dùng muốn sửa thông tin của một ngày cụ thể
    };

    const handleDeleteDate = () => {
        // Xử lý logic khi người dùng muốn xóa thông tin của một ngày cụ thể
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Tin tức/Sự kiện" />
                <div className="flex-1">
                    <div className="p-6 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 font-inter mt-4 mb-10 text-center">
                            {eventDetails.title}
                        </h2>
                        <div className="mb-4">
                            <Image
                                src={eventDetails.bannerSrc}
                                alt="Banner"
                                width={1200}
                                height={400}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                        {eventDetails.description.map((paragraph, index) => (
                            <p key={index} className="text-l mb-4 font-bold font-inter">
                                {paragraph}
                            </p>
                        ))}
                        {eventDetails.semesters.map((semester, semesterIndex) => (
                            <div key={semesterIndex} className="mb-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-l font-semibold mt-6 mb-2 font-inter">
                                        {semester.title}
                                    </h3>
                                    {isAdmin && (
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleEditSemester()}
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSemester()}
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <ul className="list-disc pl-5 text-l font-inter">
                                    {semester.dates.map((date, dateIndex) => (
                                        <li key={dateIndex} className="flex justify-between items-center mb-2">
                                            <span>{date}</span>
                                            {isAdmin && (
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleEditDate()}
                                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteDate()}
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
