'use client'
import SideMenu from '@/components/display-block/SideMenu';
import { menuItems } from '@/data/giai-thuong/menu-data';
import Breadcrumb from '@/components/breadcrumb';

export default function BaiBaoHoiNghi() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu menuItems={menuItems} />
                
                <div className="w-3/4 p-4 border-l border-gray-300">

                        <h3 className="text-xl font-semibold mb-2">Giải thưởng Bài báo Hội nghị</h3>
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
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">H.Sarnago, O.Lucia, D.Menzi, J.W.Kolar</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Giải thưởng Bài báo hay nhất</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Hội nghị quốc tế lần thứ 17 của IEEE về khả năng tương thích, điện tử công suất và kỹ thuật điện (CPE-POWERENG 2023), Tallinn, Estonia, ngày 14-16 tháng 6 năm 2023</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">2023</td>
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