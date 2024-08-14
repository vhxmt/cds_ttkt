import Image from 'next/image';

export default function Thaoluanchuyende() {
    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className="flex-none w-1/3">
                    <div className="font-inter font-bold text-[14px] text-[#BD1E1E] mb-4">
                        Trang chủ &gt;&gt; Tin tức và sự kiện &gt;&gt; <a href="/tin-tuc-su-kien/su-kien" className="text-[#BD1E1E] underline">Sự kiện</a>
                    </div>
                    <div className="text-red-600 text-l mb-4 font-inter font-bold text-[14px] text-[#BD1E1E]">
                        <a href="/tin-tuc-su-kien/tin-tuc" className="text-[#BD1E1E] ">Tin tức</a>
                    </div>
                    <div className="text-red-600 text-l mb-4 font-inter font-bold text-[14px] text-[#BD1E1E]">
                        <a href="/tin-tuc-su-kien/su-kien" className="text-[#BD1E1E] underline"> Sự kiện</a>
                        <ul className="list-disc pl-5 mt-2 text-[13px] text-[#BD1E1E]">
                            <li><a href="/tin-tuc-su-kien/su-kien/thao-luan-chuyen-de" className="text-[#BD1E1E] underline hover:underline">Thảo luận chuyên đề hằng tuần</a></li>
                            <li><a href="/tin-tuc-su-kien/su-kien/su-kien-thuong-nien" className="hover:underline">Sự kiện thường niên</a></li>
                            <li><a href="/tin-tuc-su-kien/su-kien/khoa-hoc-ngan-han" className="hover:underline">Khóa học ngắn hạn</a></li>
                        </ul>
                    </div>
                </div>

                {/* Container chứa banner và hai ô */}
                <div className="flex-1">
                    {/* Ảnh banner */}
                    <div className="p-6 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 font-inter mt-4 mb-10 text-center">Thảo luận chuyên đề hằng tuần</h2>
                        <div className="mb-4">
                            <Image
                                src="/thao-luan-chuyen-de.png" // Đổi thành đường dẫn đến ảnh banner của bạn
                                alt="Banner"
                                width={1200}
                                height={400}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                        <p className="text-l mb-4 font-bold font-inter">
                            Quá trình chuyển đổi năng lượng đòi hỏi nhiều hơn là chỉ tiến bộ về công nghệ. Nó bao gồm một cách tiếp cận đa diện, nhận ra sự phức tạp và mối liên hệ giữa các hệ thống xã hội và hệ thống năng lượng của chúng ta.
                        </p>
                        <p className="text-l mb-4 font-bold font-inter">
                            Để hiểu rõ hơn về những kết nối này, những nhà đổi mới và người có sức ảnh hưởng từ khắp Alberta tham gia Phòng thí nghiệm Tương lai Năng lượng với tư cách là Nghiên cứu viên, Đại sứ và Đối tác để cùng nhau giải quyết những thách thức về năng lượng hiện tại và tương lai.
                        </p>
                        <h3 className="text-l font-semibold mt-6 mb-2 font-inter">Học kỳ I năm 2024</h3>
                        <ul className="list-disc pl-5 mb-6 text-l font-inter">
                            <li>Ngày 11 tháng 01 năm 2024:.....</li>
                            <li>Ngày 11 tháng 01 năm 2024:.....</li>
                            <li>Ngày 11 tháng 01 năm 2024:.....</li>
                            <li>Ngày 11 tháng 01 năm 2024:.....</li>
                            <li>Ngày 11 tháng 01 năm 2024:.....</li>
                        </ul>

                        <h3 className="text-l font-semibold mt-6 mb-2 font-inter">Học kỳ II năm 2024</h3>
                        <ul className="list-disc pl-5 text-l font-inter">
                            <li>Ngày 11 tháng 05 năm 2024:.....</li>
                            <li>Ngày 11 tháng 05 năm 2024:.....</li>
                            <li>Ngày 11 tháng 05 năm 2024:.....</li>
                            <li>Ngày 11 tháng 05 năm 2024:.....</li>
                            <li>Ngày 11 tháng 05 năm 2024:.....</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}