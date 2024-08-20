import Image from 'next/image';

export default function BaiTrinhBayHoiNghi() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className="flex-none w-1/4">
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        Trang chủ &gt;&gt; Giải thưởng &gt;&gt; <a href="/giai-thuong/giai-thuong-bai-trinh-bay-hoi-nghi" className="text-[#BD1E1E] ">Giải thưởng bài trình bày hội nghị</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/giai-thuong/giai-thuong-bai-bao-hoi-nghi" className="text-[#BD1E1E]">Giải thưởng bài báo hội nghị</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/giai-thuong/giai-thuong-bai-bao-tap-chi" className="text-[#BD1E1E]">Giải thưởng bài báo tạp chí</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/giai-thuong/giai-thuong-bai-trinh-bay-hoi-nghi" className="text-[#BD1E1E] underline">Giải thưởng bài trình bày hội nghị</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/giai-thuong/giai-thuong-khac" className="text-[#BD1E1E]">Giải thưởng khác</a>
                    </div>
                </div>
                

                    <div className="max-w-4xl mx-auto p-4">

                        <h3 className="text-xl font-semibold mb-2">Giải thưởng Bài báo Tạp chí</h3>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Người nhận giải</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Giải thưởng</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Tổ chức</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Năm</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Thành tích</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">D. Menzi</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Giải thưởng Bài thuyết trình hay nhất</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Hội nghị và Triển lãm Điện tử công suất ứng dụng lần thứ 38 (APEC 2023), Orlando, FL, Hoa Kỳ từ ngày 19 đến 23 tháng 3 năm 2023</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">2023</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Hệ thống chỉnh lưu PFC tăng cường Buck-Boost ba pha một tầng cách ly hai chiều mới</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

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
    );
}