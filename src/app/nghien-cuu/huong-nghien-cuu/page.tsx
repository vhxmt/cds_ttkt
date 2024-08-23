import Image from 'next/image';

export default function bangsangche() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}

                <div className="flex-none w-1/4">
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        Trang chủ &gt;&gt; Nghiên cứu &gt;&gt; <a href="/nghien-cuu/huong-nghien-cuu" className="text-[#BD1E1E] ">Hướng nghiên cứu</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/nghien-cuu/huong-nghien-cuu" className="text-[#BD1E1E] underline">Hướng nghiên cứu</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/nghien-cuu/du-an" className="text-[#BD1E1E] ">Dự án</a>
                    </div>
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        <a href="/nghien-cuu/bang-sang-che" className="text-[#BD1E1E]">Bằng sáng chế</a>
                    </div>
                </div>


                {/* Main Content */}
                <div className="w-3/4 p-4 border-l border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">SEEE Hướng nghiên cứu</h2>
                    
                    {/* Research Focus Areas */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-200 text-center py-8 rounded-lg bg-gray-300">Lý thuyết điều khiển và ứng dụng</div>
                        <div className="bg-gray-200 text-center py-8 rounded-lg ">Năng lượng điện</div>
                        <div className="bg-gray-200 text-center py-8 rounded-lg bg-gray-300">Hệ thống điện và năng lượng</div>
                        <div className="bg-gray-200 text-center py-8 rounded-lg bg-gray-300">Lưới điện thông minh</div>
                    </div>

                    {/* Research Description */}
                    <div className="text-base mb-8">
                        Nghiên cứu của CAP Group về Điện tử công suất bao gồm kiểm soát, chuyển đổi, truyền tải và thu thập năng lượng điện. Trọng tâm đặc biệt dành cho công nghệ DC điện áp cao và hệ thống truyền tải điện không dây.
                    </div>

                    {/* Related News */}
                    <h3 className="text-xl font-semibold mb-4">Các tin liên quan</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">#1: Các thành tựu & giải thưởng của Phòng thí nghiệm</h4>
                                <p className="text-gray-600">ABCD</p>
                            </div>
                            <a href="#" className="text-[#BD1E1E]">Chi tiết &gt;&gt;</a>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">#2: Thông báo về CFP của Hội nghị</h4>
                                <p className="text-gray-600">ABCD</p>
                            </div>
                            <a href="#" className="text-[#BD1E1E]">Chi tiết &gt;&gt;</a>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold">#3: Tổng kết hoạt động tham gia Hội nghị & Giao lưu</h4>
                                <p className="text-gray-600">ABCD</p>
                            </div>
                            <a href="#" className="text-[#BD1E1E]">Chi tiết &gt;&gt;</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}