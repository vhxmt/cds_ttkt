// src/components/display-block/Description.tsx
import React from 'react';
import Image from 'next/image';

interface DescriptionProps {
    bannerSrc: string;
    description: string;
    isAdmin: boolean;
    openEditBannerModal: () => void;
}

const Description: React.FC<DescriptionProps> = ({ bannerSrc, description, isAdmin, openEditBannerModal }) => {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden mb-6">
            <div className="mb-4">
                <Image
                    src={bannerSrc}
                    alt="Banner Tuyển dụng"
                    width={1200}
                    height={400}
                    className="w-full h-auto object-cover rounded-t-lg"
                />
            </div>
            <div className="p-4">
                <p className="text-lg text-gray-700 mb-4">{description}</p>

                {isAdmin && (
                    <button
                        onClick={openEditBannerModal}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
                    >
                        Chỉnh sửa thông tin và Banner
                    </button>
                )}
            </div>
        </div>
    );
};

export default Description;
