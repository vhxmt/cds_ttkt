import Image from 'next/image';
import { FC } from 'react';
import { eventDetails, eventInfo, schedule } from '@/data/tin-tuc-su-kien/su-kien/su-kien-thuong-nien'; // Đảm bảo đường dẫn đúng với vị trí file data.ts

const AnnualEvent: FC = () => {
    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Sidebar chứa liên kết */}
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
                            <li><a href="/tin-tuc-su-kien/su-kien/su-kien-thuong-nien" className="underline hover:underline">Sự kiện thường niên</a></li>
                            <li><a href="/tin-tuc-su-kien/su-kien/khoa-hoc-ngan-han" className="text-[#BD1E1E] hover:underline">Khóa học ngắn hạn</a></li>
                        </ul>
                    </div>
                </div>

                {/* Container chứa nội dung sự kiện */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 font-inter mt-4 mb-10 text-center">
                        {eventDetails.title}
                    </h2>
                    <div className="mb-4 text-center mb-20">
                        <Image
                            src="/su-kien-thuong-nien.jpg" // Thay đổi đường dẫn ảnh cho phù hợp
                            alt={eventDetails.title}
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                    <p className="text-lg mb-4 font-inter text-center font-bold">
                        {eventDetails.date}
                    </p>
                    <p className="text-lg mb-4 font-inter text-center font-bold">
                        {eventDetails.location}
                    </p>
                    <p className="text-lg mb-4 font-inter text-center mt-20 mb-20">
                        {eventDetails.registrationNote}
                    </p>
                </div>
            </div>

            {/* Phần nội dung mới */}
            <div className="mt-20">
                <p className="text-lg mb-20 text-center">
                    Hội nghị tổng kết hàng năm của trường Điện - Điện tử là một sự kiện diễn ra trong 2 ngày hằng năm dành cho các thành viên của trường, bao gồm các bài thuyết trình về nghiên cứu đang diễn ra, các buổi hướng dẫn của giảng viên trường Điện - Điện tử, tham quan các phòng lab, và thuyết trình poster của sinh viên, cũng như nhiều cơ hội kết nối mở rộng.
                </p>
                {/* Phần nội dung mới */}
                <div className="mt-8 p-4 bg-red-700 text-center rounded-lg">
                    <div className="bg-red-700 text-white p-6 rounded-lg w-[80%] mx-auto">
                        <h3 className="text-3xl font-bold mt-5 mb-10">
                            Chào mừng đến với Hội nghị tổng kết thường niên năm 2024!
                        </h3>
                        <p className="text-l mb-20">
                            Hãy xem lại thời gian biểu các bài thuyết trình do giảng viên và sinh viên trình bày, sau đó là phiên thảo luận dự án nghiên cứu “Phòng thí nghiệm” từ đánh giá thường niên năm 2024.
                        </p>
                    </div>
                </div>

                <div className="flex justify-between space-x-4">
                    {/* Sinh ra các ô cho từng phần sự kiện */}
                    {Object.keys(eventInfo).map((key, index) => (
                        <div key={index} className="bg-white text-black p-6 rounded-lg w-[48%]">
                            <div className="relative w-full h-80 mb-4">
                                <Image
                                    src={eventInfo[key as keyof typeof eventInfo].imageSrc}
                                    alt={eventInfo[key as keyof typeof eventInfo].imageAlt}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                            <h3 className="text-lg font-bold mb-4">{eventInfo[key as keyof typeof eventInfo].title}</h3>
                            <ul className="list-disc pl-5 text-left">
                                {eventInfo[key as keyof typeof eventInfo].details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="text-lg mt-20 text-center font-bold">
                    Lịch trình 2024
                </p>

                <div className="flex justify-between space-x-4 mt-8">
                    {/* Sinh ra các ô cho từng ngày */}
                    {Object.keys(schedule).map((day, dayIndex) => (
                        <div key={dayIndex} className="bg-white text-black p-6 rounded-lg w-[48%] border border-gray-300">
                            <h4 className="bg-red-700 text-white text-lg font-bold mb-4 rounded-lg p-4">
                                Ngày {schedule[day as keyof typeof schedule].date}
                            </h4>
                            <ul className="list-disc pl-5">
                                {schedule[day as keyof typeof schedule].sessions.map((session, sessionIndex) => (
                                    <li key={sessionIndex} className="mb-4">
                                        <strong>{session.time}:</strong> {session.title} - {session.speaker}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-8 p-6 rounded-lg text-center">
                    <div className="relative">
                        <Image
                            src="/banner-su-kien-thuong-nien.png" // Thay đổi đường dẫn ảnh cho phù hợp
                            alt="Banner sự kiện"
                            layout="responsive"
                            width={1200}
                            height={400}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnnualEvent;
