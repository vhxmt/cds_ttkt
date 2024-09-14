'use client';
import { useState } from 'react';
import data from '@/data/tuyen-dung/list/data.json';
import Breadcrumb from "@/components/breadcrumb";
import PgControl from '@/components/display-block/PgControl'; // Import component phân trang

export default function TuyenDungPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCV, setSelectedCV] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const applicantsPerPage = 5; // Số lượng ứng viên trên mỗi trang

    const openModal = (cv: string) => {
        setSelectedCV(cv);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(data.RecruitData.length / applicantsPerPage);

    // Lấy ứng viên cho trang hiện tại
    const currentApplicants = data.RecruitData.slice(
        (currentPage - 1) * applicantsPerPage,
        currentPage * applicantsPerPage
    );

    // Chuyển sang trang tiếp theo
    const onNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Quay lại trang trước
    const onPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            <Breadcrumb />

            <h1 className="text-2xl font-bold mb-6">Danh sách ứng tuyển</h1>

            {/* Hiển thị danh sách ứng viên */}
            <div className="grid grid-cols-1 gap-6">
                {currentApplicants.map((applicant, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold mb-4">{applicant.hoTen}</h2>

                        <div className="flex space-x-4 mb-4">
                            <div className="flex-1">
                                <p><strong>Số điện thoại:</strong> {applicant.soDienThoai}</p>
                            </div>
                            <div className="flex-1">
                                <p><strong>Email:</strong> {applicant.email}</p>
                            </div>
                        </div>

                        <div className="flex space-x-4 mb-4">
                            <div className="flex-1">
                                <p><strong>Vị trí đăng ký:</strong> {applicant.viTriDangKy}</p>
                            </div>
                            <div className="flex-1">
                                <p><strong>Định hướng nghiên cứu:</strong> {applicant.dinhHuongNghienCuu}</p>
                            </div>
                        </div>

                        <p><strong>Câu hỏi thắc mắc:</strong> {applicant.cauHoiThacMac}</p>

                        {/* Nút xem chi tiết nếu cần thêm */}
                    </div>
                ))}
            </div>

            {/* Component phân trang */}
            <PgControl
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={onNextPage}
                onPrevPage={onPrevPage}
            />

            {/* Modal hiển thị CV */}
            {isModalOpen && selectedCV && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 relative max-w-2xl w-full">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeModal}
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

                        {/* Xử lý hiển thị CV nếu cần */}
                    </div>
                </div>
            )}
        </div>
    );
}
