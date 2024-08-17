import Image from 'next/image';
import convertClassName from "@/utils/format-menu";
import {labCategories} from "@/data/lien-he/dan-duong";

export default function danduong() {
    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className={convertClassName('container')}>
                    <div className={convertClassName('title')}>
                        Trang chủ &gt;&gt; Liên hệ &gt;&gt;
                        <a href="/lien-he/dan-duong" className={convertClassName('link')}>Dẫn đường</a>
                    </div>
                    <div className={convertClassName('text')}>
                        <a href="/lien-he/thong-tin-lien-he" className={convertClassName('link')}>Thông tin liên hệ</a>
                    </div>
                    <div className={convertClassName('text')}>
                        <a href="/lien-he/dan-duong" className={convertClassName('link')}>Dẫn đường</a>
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

                        {labCategories.map((category) => (
                            <div key={category.title}>
                                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
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
                                    {category.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-4 py-2 text-center text-gray-700">Không có dữ liệu</td>
                                        </tr>
                                    ) : (
                                        category.data.map((lab, index) => (
                                            <tr key={lab.id} className="border-b">
                                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{index + 1}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.name}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.location}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.leader}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.contactInfo}</td>
                                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">{lab.postalCode}</td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}