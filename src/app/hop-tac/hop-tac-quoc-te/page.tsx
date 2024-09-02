"use client";
import CooperationSection from "@/components/frame/CooperationSection";
import cooperationData from "@/data/cooperations.json";
import cooperationEventData from "@/data/hop-tac/cooperationEventData.json"; 
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import NewsList from '@/components/display-block/news/NewsList';

const { internationalCooperation } = cooperationData;
const { cooperationEventData: newsData } = cooperationEventData; 

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
                        title={internationalCooperation.title}
                        items={internationalCooperation.items}
                    />
                </div>
            </div>
        </div>
    );
}
