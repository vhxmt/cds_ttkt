'use client';
import SideMenu from '@/components/display-block/SideMenu';
import { menuItems } from '@/data/blogs/menu-data';
import Breadcrumb from '@/components/breadcrumb';
import Image from 'next/image';

export default function DienTuVienThong() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu menuItems={menuItems} />

                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">Lĩnh vực: Điện tử viễn thông</h2>
                    
                    {/* Grid Layout for Publications */}
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((item, index) => (
                            <div key={index} className="border border-blue-400 rounded-lg p-4">
                                <div className="bg-gray-200 h-48 mb-4 flex items-center justify-center">
                                <Image
                                        src="/cover.jpg"
                                        alt="Thumbnail"
                                        width={600}
                                        height={600}
                                        className="flex h-auto object-cover rounded-lg"
                                />
                                </div>
                                <p className="text-blue-600 text-sm mb-2">18/5/2023</p>
                                <p className="font-semibold">
                                    {index === 0 && 'Thiết kế vi mạch và hệ thống nhúng (IC Design and Embedded Systems)'}
                                    {index === 1 && 'Kỹ thuật y sinh (Biomedical Engineering)'}
                                    {index === 2 && 'Công nghệ mạng tiên tiến và ứng dụng thông minh (Advanced Networking and Smart Applications)'}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border rounded bg-gray-300">1</button>
                            <button className="px-3 py-1 border rounded">2</button>
                            <button className="px-3 py-1 border rounded">3</button>
                            <button className="px-3 py-1 border rounded">4</button>
                            <button className="px-3 py-1 border rounded">5</button>
                            <button className="px-3 py-1 border rounded">6</button>
                            <button className="px-3 py-1 border rounded">7</button>
                            <button className="px-3 py-1 border rounded">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
