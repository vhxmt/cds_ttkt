"use client";
import CooperationSection from "@/components/frame/CooperationSection";
import { domesticCooperation } from "@/data/cooperations";
import SideMenu from '@/components/display-block/SideMenu';

import Breadcrumb from '@/components/breadcrumb';
import NewsList from '@/components/display-block/news/NewsList';

const newsData = [
    {
        imageSrc: "/image/thiet-bi/Oscilloscope.png",
        title: "Lễ ký kết Thỏa thuận hợp tác MOU...",
        date: "19/12/2022 12:02:00"
    },
    {
        imageSrc: "/image/thiet-bi/Oscilloscope.png",
        title: "MAPR 2023 CfP Submission Deadline...",
        date: "19/12/2022 12:00:00"
    },
    {
        imageSrc: "/image/thiet-bi/Oscilloscope.png",
        title: "Lễ ký kết Thỏa thuận hợp tác (MOU)...",
        date: "19/12/2022 11:57:00"
    }
    // Add more news items as needed
];


export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Main Container */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Hợp tác" />

                {/* Main content */}
                <div className="flex-1">
                    {/* News List */}
                    <NewsList news={newsData} />
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
