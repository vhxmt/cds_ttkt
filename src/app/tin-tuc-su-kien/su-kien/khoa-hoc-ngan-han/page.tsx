import Image from 'next/image';
import {courseLibrary, upcomingCourses} from "@/data/tin-tuc-su-kien/su-kien/khoa-hoc-body";

export default function Khoahocnganhan() {
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
                            <li><a href="/tin-tuc-su-kien/su-kien/thao-luan-chuyen-de" className="hover:underline">Thảo luận chuyên đề hằng tuần</a></li>
                            <li><a href="/tin-tuc-su-kien/su-kien/su-kien-thuong-nien" className="hover:underline">Sự kiện thường niên</a></li>
                            <li><a href="/tin-tuc-su-kien/su-kien/khoa-hoc-ngan-han" className="text-[#BD1E1E] underline hover:underline">Khóa học ngắn hạn</a></li>
                        </ul>
                    </div>
                </div>

                {/* Container chứa banner và hai ô */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 font-inter mt-4 mb-10 text-center">
                        Khóa học ngắn hạn
                    </h2>
                    <div className="mb-4">
                        <Image
                            src="/khoa-hoc-ngan.png"
                            alt="Banner"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                    <p className="text-l mb-4 font-inter">
                        Các giảng viên tại Trường Điện - Điện tử làm việc với các chương trình chuyên nghiệp liên ngành của doanh nghiệp để cung cấp nhiều khóa học ngắn hạn tiếp tục giáo dục liên quan đến lĩnh vực chuyên môn của họ. Các công ty thành viên của Trường nhận được giảm $200 cho mỗi khóa học.
                    </p>

                    <div className="flex space-x-4 mb-4">
                        {/* Ô Các khóa học sắp diễn ra */}
                        <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                            <header className="flex items-center mb-4">
                                <h1 className="text-2xl font-semibold">Các khóa học sắp diễn ra</h1>
                            </header>
                            {upcomingCourses.map((course, index) => (
                                <div key={index} className="p-6 max-w-2xl mx-auto bg-gray-100 shadow-md rounded-lg mb-6">
                                    <h2 className="text-2xl font-semibold mb-4 font-inter">
                                        {course.date}: {course.name}
                                    </h2>
                                    <div className="mb-4">
                                        <p className="text-lg font-inter mb-2">
                                            <span className="font-semibold">Thời gian bắt đầu - kết thúc:</span>
                                            <span className="ml-2">{course.time}</span>
                                        </p>
                                        <p className="text-lg font-inter mb-2">
                                            <span className="font-semibold">Hình thức:</span>
                                            <span className="ml-2">{course.format}</span>
                                        </p>
                                        <p className="text-base font-semibold font-inter mt-2">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Ô Kho khóa học */}
                        <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                            <header className="flex items-center mb-4">
                                <h1 className="text-2xl font-semibold">Kho khóa học</h1>
                            </header>
                            {courseLibrary.map((course, index) => (
                                <div key={index} className="p-6 max-w-2xl mx-auto bg-gray-100 shadow-md rounded-lg mb-6">
                                    <h2 className="text-l font-semibold mb-4 font-inter">{course.name}:</h2>
                                    <h2 className="text-l font-semibold mb-4 font-inter">{course.link}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}