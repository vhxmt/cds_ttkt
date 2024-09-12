// src/pages/NewsPage.tsx
"use client";
import CooperationSection from "@/components/frame/CooperationSection";
import cooperationData from "@/data/cooperations.json";
import cooperationEventData from "@/data/hop-tac/cooperationEventData.json";
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import NewsList from '@/components/display-block/news/NewsList';
import PgControl from "@/components/display-block/PgControl";
import {useState} from "react";

const { domesticCooperation } = cooperationData;
const { cooperationEventData: newsData } = cooperationEventData;

const handleAdd = () => {
    console.log("Thêm cán bộ");
};

const handleEdit = (item: { imageSrc: string; title: string; date: string }) => {
    // Logic to edit news item
    console.log('Edit item:', item);
};

const handleDelete = (item: { imageSrc: string; title: string; date: string }) => {
    // Logic to delete news item
    console.log('Delete item:', item);
};

export default function NewsPage() {
    const isAdmin = true; // Change based on actual user status
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const newsPerPage = 5; // Số lượng tin tức trên mỗi trang

    // Tính tổng số trang
    const totalPages = Math.ceil(newsData.length / newsPerPage);

    // Lấy danh sách tin tức cho trang hiện tại
    const currentNews = newsData.slice(
        (currentPage - 1) * newsPerPage,
        currentPage * newsPerPage
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
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Hợp tác" />

                {/* Main content */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-end mb-4">
                        {isAdmin && (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleAdd}
                            >
                                Thêm
                            </button>
                        )}
                    </div>
                    {/* News List */}
                    <NewsList
                        news={newsData}
                        isAdmin={isAdmin}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <PgControl
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={onNextPage}
                        onPrevPage={onPrevPage}
                    />

                    {/* Cooperation Section */}
                    <CooperationSection
                        title={domesticCooperation.title}
                        items={domesticCooperation.items}
                    />
                </div>
            </div>
        </div>
    );
}
