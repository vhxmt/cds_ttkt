import Image from 'next/image';
import convertClassName from '@/utils/format-menu';
import {eventDetails} from "@/data/tin-tuc-su-kien/su-kien/thao-luan-chuyen-de-body";
import SideMenu from '@/components/display-block/SideMenu';
import { menuItems } from '@/data/tin-tuc-su-kien/su-kien/menu-data';
import Breadcrumb from '@/components/breadcrumb';

export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu menuItems={menuItems} />


                {/* Container chứa banner và hai ô */}
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
                        {eventDetails.semesters.map((semester, index) => (
                            <div key={index}>
                                <h3 className="text-l font-semibold mt-6 mb-2 font-inter">
                                    {semester.title}
                                </h3>
                                <ul className="list-disc pl-5 mb-6 text-l font-inter">
                                    {semester.dates.map((date, dateIndex) => (
                                        <li key={dateIndex}>{date}</li>
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