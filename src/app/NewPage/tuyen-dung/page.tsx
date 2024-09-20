'use client';
import { useState, useEffect } from 'react';
import FormDangKy from './form-dang-ky';
import FormDangTin from './form-dang-tin';
import FormEditDescriptionBanner from './FormEditDescriptionBanner';
import Breadcrumb from "@/components/breadcrumb";
import { useAuth } from '@/components/providers/AuthProvider';
import PositionCard from '@/components/display-block/PositionCard';
import Description from './Description';  

export default function TuyenDungPage() {
    const [isDangTinModalOpen, setIsDangTinModalOpen] = useState(false);
    const [isDangKyModalOpen, setIsDangKyModalOpen] = useState(false);
    const [isEditBannerModalOpen, setIsEditBannerModalOpen] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<any>(null); 
    const [recruitmentData, setRecruitmentData] = useState<any>(null);
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const opendangkyModal = () => setIsDangKyModalOpen(true);
    const closedangkyModal = () => setIsDangKyModalOpen(false);

    const openDangTinModal = (position: any = null) => {
        setCurrentPosition(position);  
        setIsDangTinModalOpen(true);
    };

    // Function to refetch recruitment data
    const fetchRecruitmentData = async () => {
        try {
            const response = await fetch('/api/tuyen-dung');
            if (!response.ok) {
                throw new Error(`Failed to fetch recruitment data: ${response.statusText}`);
            }
            const data = await response.json();
            setRecruitmentData(data);
        } catch (error) {
            console.error('Error fetching recruitment data:', error);
        }
    };

    const closeDangTinModal = async () => {
        setIsDangTinModalOpen(false);
        await fetchRecruitmentData(); // Refetch data when modal closes
    };

    const openEditBannerModal = () => setIsEditBannerModalOpen(true);
    const closeEditBannerModal = () => setIsEditBannerModalOpen(false);

    const { bannerSrc, description, positions } = recruitmentData || {};

    const handleDelete = async (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này không?')) {
            try {
                const response = await fetch(`/api/tuyen-dung?id=${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setRecruitmentData((prevData: any) => ({
                        ...prevData,
                        positions: prevData.positions.filter((position: any) => position.id !== id),
                    }));
                    console.log(`Xóa tin tuyển dụng với ID: ${id}`);
                } else {
                    console.error('Xóa không thành công');
                }
            } catch (error) {
                console.error('Error deleting recruitment position:', error);
            }
        }
    };

    useEffect(() => {
        fetchRecruitmentData();
    }, []);

    if (!recruitmentData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            <Breadcrumb />
            <div className="flex space-x-4">
                <div className="side-menu flex-none w-1/5"></div>

                <div className="flex-1">
                    {/* Using the new Description component */}
                    <Description
                        bannerSrc={bannerSrc}
                        description={description}
                        isAdmin={isAdmin}
                        openEditBannerModal={openEditBannerModal}
                    />

                    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Danh sách các vị trí tuyển dụng</h2>

                        {isAdmin && (
                            <div className="flex mb-4 space-x-2">
                                <a href="/NewPage/tuyen-dung/list"
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">
                                    Xem danh sách ứng tuyển
                                </a>
                                <button
                                    onClick={() => openDangTinModal()}  
                                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                                >
                                    Đăng tin tuyển dụng &gt;&gt;
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Add a check to ensure positions is an array before mapping */}
                            {Array.isArray(positions) && positions.map((position: any, index: number) => (
                                <PositionCard
                                    key={index}
                                    position={{
                                        ...position,
                                        requirements: position.requirements.split('\n') // Display requirements as array
                                    }}
                                    isAdmin={isAdmin}
                                    onEdit={openDangTinModal}
                                    onDelete={handleDelete}
                                    onApply={opendangkyModal}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isEditBannerModalOpen && (
                <FormEditDescriptionBanner
                    recruitmentData={recruitmentData}
                    closeModal={closeEditBannerModal}
                    updateRecruitmentData={setRecruitmentData}
                />
            )}

            {isDangTinModalOpen && (
                <FormDangTin
                    position={currentPosition}
                    closeModal={closeDangTinModal}
                    updateRecruitmentData={setRecruitmentData}
                />
            )}

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
        </div>
    );
}
