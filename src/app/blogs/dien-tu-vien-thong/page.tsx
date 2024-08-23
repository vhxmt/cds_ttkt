'use client';
import Image from 'next/image';

export default function DienTuVienThong() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className="flex-none w-1/4">
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        Trang chủ &gt;&gt; Blogs &gt;&gt; <a href="/blogs/dien-tu-vien-thong" className="text-[#BD1E1E]">Điện tử viễn thông</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/blogs/dien-tu-vien-thong" className="text-[#BD1E1E] underline">Điện tử viễn thông</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/blogs/dien-tu-dong-hoa" className="text-[#BD1E1E]">Điện - Tự động hóa</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/blogs/dien-tu-dong-hoa-cong-nghe-thong-tin" className="text-[#BD1E1E]">Điện - Tự động hóa - Công nghệ thông tin</a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">Lĩnh vực: Điện tử viễn thông</h2>
                    
                    {/* Grid Layout for Publications */}
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((item, index) => (
                            <div key={index} className="border border-blue-400 rounded-lg p-4">
                                <div className="bg-gray-200 h-48 mb-4 flex items-center justify-center">
                                    <span>Image Placeholder</span>
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
