import Image from 'next/image';

export default function danduong() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className="flex-none w-1/3">
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        Trang chủ &gt;&gt; Liên hệ &gt;&gt; <a href="/lien-he/dan-duong" className="text-[#BD1E1E] underline">Dẫn đường</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/lien-he/thong-tin-lien-he" className="text-[#BD1E1E]">Thông tin liên hệ</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/lien-he/dan-duong" className="text-[#BD1E1E] underline">Dẫn đường</a>
                    </div>
                </div>


                {/* Container chứa banner và hai ô */}
                <div className="flex-1">
                    {/* Ảnh banner */}
                    <div className="mb-4">
                        <Image
                            src="/banner-danduong.png" // Đổi thành đường dẫn đến ảnh banner của bạn
                            alt="Banner"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    <div className="max-w-4xl mx-auto p-4">
                        <h2 className="text-2xl font-semibold mb-4">Danh sách các Phòng thí nghiệm</h2>

                        <h3 className="text-xl font-semibold mb-2">A. Thuộc lĩnh vực Điện tử viễn thông</h3>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">STT</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Tên Phòng thí nghiệm</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Địa điểm hiện tại</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Trưởng nhóm nghiên cứu</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Thông tin liên hệ</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Mã bưu chính</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">1</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Phòng thí nghiệm A</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Địa điểm A</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Trưởng nhóm A</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Thông tin A</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">ABC123</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="max-w-4xl mx-auto p-4 mt-8">
                        <h3 className="text-xl font-semibold mb-2">B. Thuộc lĩnh vực Điện - Tự động hóa</h3>
                    </div>
                </div>

            </div>
        </div>
    );
}