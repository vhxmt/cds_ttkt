'use client'
import SideMenu from '@/components/display-block/SideMenu';
import { menuItems } from '@/data/giai-thuong/menu-data';
import Breadcrumb from '@/components/breadcrumb';

export default function BaiBaoTapChi() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu menuItems={menuItems} />
                
                    <div className="w-3/4 p-4 border-l border-gray-300">

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
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">R.Giuffrida, R.Senti, J.W.Kolar, D.Bortis, et al.</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Giải thưởng Bài báo xuất sắc</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Tạp chí IEEE về các chủ đề mới nổi và chọn lọc trong điện tử công nghiệp</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">2024</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Thiết kế và chế tạo Thiết bị truyền động tuyến tính dạng ống nhỏ gọn cho trái tim nhân tạo mới</td>
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