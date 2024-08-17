'use client'
import { useState } from 'react';
import Image from 'next/image';
import { recruitmentData } from '@/data/tuyen-dung/tuyen-dung';
import convertClassName from "@/utils/format-menu";
import FormDangKy from '@/components/display-block/form-dang-ky';

export default function TuyenDungPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains('modal-background')) {
            closeModal();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            <div className="flex space-x-4">
                {/* Container chứa menu bên trái */}
                <div className={convertClassName('container')}>
                    <div className={convertClassName('title')}>
                        Trang chủ &gt;&gt; Tuyển dụng
                    </div>
                    <div className={convertClassName('text')}>
                        <a href="/tuyen-dung" className={convertClassName('link')}>Tuyển dụng</a>
                    </div>
                </div>

                {/* Container chứa nội dung tuyển dụng */}
                <div className="flex-1">
                    {/* Ô chứa ảnh banner tuyển dụng */}
                    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden mb-6">
                        {/* Ảnh banner tuyển dụng */}
                        <div className="mb-4">
                            <Image
                                src={recruitmentData.bannerSrc}
                                alt="Banner Tuyển dụng"
                                width={1200}
                                height={400}
                                className="w-full h-auto object-cover rounded-t-lg"
                            />
                        </div>

                        {/* Nội dung mô tả tuyển dụng */}
                        <div className="p-4">
                            <p className="text-lg text-gray-700 mb-4">
                                {recruitmentData.description}
                            </p>
                        </div>
                    </div>

                    {/* Danh sách các vị trí tuyển dụng */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách các vị trí tuyển dụng</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recruitmentData.positions.map((position, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <Image
                                        src={position.imageSrc}
                                        alt={position.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-auto object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{position.title}</h3>
                                        <p className="text-l text-gray-700 mb-4">
                                            {position.description}
                                        </p>
                                        <h4 className="text-lg font-semibold mb-2 text-gray-700">Đối tượng tuyển sinh:</h4>
                                        <ul className="list-disc list-inside mb-4 text-gray-700">
                                            {position.requirements.map((req, idx) => (
                                                <li key={idx}>{req}</li>
                                            ))}
                                        </ul>
                                        <button
                                            onClick={openModal}
                                            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                                        >
                                            Đăng ký ngay &gt;&gt;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal đăng ký */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <FormDangKy />
                    </div>
                </div>
            )}
        </div>
    );
}
