'use client'
import SideMenu from '@/components/display-block/SideMenu';
import { menuItems } from '@/data/nghien-cuu/menu-data';
import Breadcrumb from '@/components/breadcrumb';

export default function BangSangChe() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu menuItems={menuItems} />
                
                <div className="w-3/4 p-4 border-l border-gray-300">

                        <h3 className="text-xl font-semibold mb-2">Danh sách bằng sáng chế</h3>
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                            <tr className="bg-gray-200 border-b">
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">STT</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Họ và tên tác giả</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">SC/GPHI</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Tên SC/GPHI</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Ngày nộp</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Năm nộp</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Số nhận đơn</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Năm cấp bằng độc quyền</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Ngày cấp văn bằng</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Số văn bằng</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-r border-gray-300">Số QĐ cấp</th>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Đơn vị</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b">
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">1</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Lương Ngọc Lợi</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">GPHI</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Buồng trộn, vòi phun hỗn hợp nước - khí nén dùng trong công nghệ dập bụi làm mát</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">13-08</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">2013</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">2-2013-00195</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">2021</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">20-09-21</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">2719</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">14600w/QĐ-SHTT</td>
                                <td className="px-4 py-2 text-sm text-gray-700 border-r border-gray-300">Trường Cơ khí</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
    );
}