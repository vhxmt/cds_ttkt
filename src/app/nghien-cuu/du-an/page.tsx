import Image from 'next/image';

export default function bangsangche() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className="flex-none w-1/4">
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        Trang chủ &gt;&gt; Nghiên cứu &gt;&gt; <a href="/nghien-cuu/du-an" className="text-[#BD1E1E] ">Dự án</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/nghien-cuu/huong-nghien-cuu" className="text-[#BD1E1E] ">Hướng nghiên cứu</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/nghien-cuu/du-an" className="text-[#BD1E1E] underline ">Dự án</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/nghien-cuu/bang-sang-che" className="text-[#BD1E1E]">Bằng sáng chế</a>
                    </div>
                </div>
                
                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">SEEE Dự án</h2>

                    {/* Project List */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold">2022.12 ~ 2024.06</h3>
                            <ul className="list-disc pl-5">
                                <li>Phát triển thuật toán điều khiển không cảm biến cho SPMSM</li>
                                <li>Nhà tài trợ: LCTEK Co.</li>
                                <li>Xếp loại dự án: Cấp cơ sở</li>
                                <li>Đơn vị chủ trì: Đại học Bách khoa Hà Nội</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold">2022.06 ~ 2025.02</h3>
                            <ul className="list-disc pl-5">
                                <li>Phòng thí nghiệm nghiên cứu cơ bản về hệ thống năng lượng tích hợp của tàu điện chạy bằng pin nhiên liệu</li>
                                <li>Nhà tài trợ: Quỹ nghiên cứu quốc gia Việt Nam (NRF)</li>
                                <li>Xếp loại dự án: Cấp quốc gia</li>
                                <li>Đơn vị chủ trì: Đại học Bách khoa Hà Nội</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold">2021.03 ~ 2024.02</h3>
                            <ul className="list-disc pl-5">
                                <li>Công nghệ đối với việc chuyển đổi năng lượng và quản lý năng lượng cho các lưới điện siêu nhỏ thân thiện với môi trường tại các cảng biển trong tương lai</li>
                                <li>Nhà tài trợ: Quỹ nghiên cứu quốc gia Việt Nam (NRF)</li>
                                <li>Xếp loại dự án: Cấp cơ sở</li>
                                <li>Đơn vị chủ trì: Đại học Bách khoa Hà Nội</li>
                            </ul>
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
            </div>
        </div>
    );
}