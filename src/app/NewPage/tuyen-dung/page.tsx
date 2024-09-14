//@/app/tuyen-dung/page.tsx
'use client'
import { useState } from 'react';
import Image from 'next/image';
import data from '@/data/tuyen-dung/tuyen-dung.json'; // Import JSON as default export
import FormDangKy from '@/components/display-block/form-dang-ky';
import FormDangTin from '@/components/display-block/form-dang-tin';
import Breadcrumb from "@/components/breadcrumb";
import { useAuth } from '@/components/providers/AuthProvider';
// Hàm xử lý sự kiện sửa tin tuyển dụng
const handleEdit = (id: string) => {
    // Logic sửa tin tuyển dụng, có thể mở modal hoặc chuyển trang
    console.log(`Chỉnh sửa tin tuyển dụng với ID: ${id}`);
};

// Hàm xử lý sự kiện xóa tin tuyển dụng
const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này không?')) {
        // Logic xóa tin tuyển dụng
        console.log(`Xóa tin tuyển dụng với ID: ${id}`);
    }
};

// Hàm xử lý sự kiện thêm tin tuyển dụng mới
const handleAddRecruitment = () => {
    // Logic thêm tin tuyển dụng, có thể mở modal hoặc chuyển đến trang tạo mới
    console.log('Thêm tin tuyển dụng mới');
};

export default function TuyenDungPage() {
    const [isDangTinModalOpen, setIsDangTinModalOpen] = useState(false);
    const [isDangKyModalOpen, setIsDangKyModalOpen] = useState(false);
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';
    const opendangkyModal = () => setIsDangKyModalOpen(true);
    const closedangkyModal = () => setIsDangKyModalOpen(false);
    const opendangtinModal = () => setIsDangTinModalOpen(true);
    const closedangtinModal = () => setIsDangTinModalOpen(false);

    // Access the correct structure from the imported data
    const { recruitmentData } = data;
    const { bannerSrc, description, positions } = recruitmentData;

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            <Breadcrumb />
            <div className="flex space-x-4">
                <div className="side-menu flex-none w-1/5"></div>

                {/* Container chứa nội dung tuyển dụng */}
                <div className="flex-1">
                    {/* Ô chứa ảnh banner tuyển dụng */}
                    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden mb-6">
                        {/* Ảnh banner tuyển dụng */}
                        <div className="mb-4">
                            <Image
                                src={bannerSrc}
                                alt="Banner Tuyển dụng"
                                width={1200}
                                height={400}
                                className="w-full h-auto object-cover rounded-t-lg"
                            />
                        </div>

                        {/* Nội dung mô tả tuyển dụng */}
                        <div className="p-4">
                            <p className="text-lg text-gray-700 mb-4">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Danh sách các vị trí tuyển dụng */}
                    {isAdmin && (
                        <div className="flex mb-4 space-x-2">
                            <a href="/NewPage/tuyen-dung/list"
                               className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                                Xem danh sách ứng tuyển
                            </a>
                            {/* Nút thêm tin tuyển dụng */}
                            <button
                                onClick={opendangtinModal}
                                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                            >
                                Đăng tin tuyển dụng &gt;&gt;
                            </button>
                        </div>
                    )}


                    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách các vị trí tuyển dụng</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {positions.map((position, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{position.title}</h3>
                                        <p className="text-l text-gray-700 mb-4">
                                            {position.description}
                                        </p>
                                        <h4 className="text-lg font-semibold mb-2 text-gray-700">Đối tượng tuyển dụng:</h4>
                                        <ul className="list-disc list-inside mb-4 text-gray-700">
                                            {position.requirements.map((req, idx) => (
                                                <li key={idx}>{req}</li>
                                            ))}
                                        </ul>

                                        <button
                                            onClick={opendangkyModal}
                                            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                                        >
                                            Đăng ký ngay &gt;&gt;
                                        </button>

                                        {/* Chỉ hiển thị nếu người dùng là quản trị viên */}
                                        {isAdmin && (
                                            <div className="mt-4 flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(position.id)}
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(position.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>

            {/* Modal đăng ký */}
            {isDangKyModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={closedangkyModal}
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
            {isDangTinModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                        <button
                            onClick={closedangtinModal}
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
                        <FormDangTin />
                    </div>
                </div>
            )}
        </div>
    );
}
