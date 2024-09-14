'use client'
import Image from 'next/image';
import data from '@/data/tin-tuc-su-kien/su-kien/thao-luan-chuyen-de-body.json';
import eventData from '@/data/tin-tuc-su-kien/su-kien/su-kien-thuong-nien.json';
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import { useAuth } from '@/components/providers/AuthProvider';

// Destructure the imported JSON
const { eventDetails: eventDetails1 } = data;
const { eventDetails: eventDetails2, eventInfo, schedule } = eventData;

export default function NewsPage() {
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    const handleEditSemester = () => {
        // Xử lý logic khi người dùng muốn sửa thông tin của một học kỳ
    };

    const handleDeleteSemester = () => {
        // Xử lý logic khi người dùng muốn xóa thông tin của một học kỳ
    };

    const handleEditDate = () => {
        // Xử lý logic khi người dùng muốn sửa thông tin của một ngày cụ thể
    };

    const handleDeleteDate = () => {
        // Xử lý logic khi người dùng muốn xóa thông tin của một ngày cụ thể
    };

    const handleAdd = () => {
        // Xử lý logic khi người dùng muốn thêm sự kiện
        console.log("Add new event");
    };

    const handleEdit = (eventTitle: string) => {
        // Xử lý logic khi người dùng muốn sửa sự kiện
        console.log("Edit event:", eventTitle);
    };

    const handleDelete = (eventTitle: string) => {
        // Xử lý logic khi người dùng muốn xóa sự kiện
        console.log("Delete event:", eventTitle);
    };

    const handleEditBoth = () => {
        // Xử lý logic khi người dùng muốn sửa cả hai phần nội dung
    };

    const handleDeleteBoth = () => {
        // Xử lý logic khi người dùng muốn xóa cả hai phần nội dung
    };

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Breadcrumb */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Tin tức/Sự kiện" />
                <div className="flex-1">
                    {/* Nội dung sự kiện từ data */}
                    <div className="p-6 max-w-4xl mx-auto mb-10">
                        <h2 className="text-2xl font-bold mb-4 font-inter mt-4 text-center">
                            {eventDetails1.title}
                        </h2>
                        <div className="mb-4">
                            <Image
                                src={eventDetails1.bannerSrc}
                                alt="Banner"
                                width={1200}
                                height={400}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                        {eventDetails1.description.map((paragraph, index) => (
                            <p key={index} className="text-l mb-4 font-bold font-inter">
                                {paragraph}
                            </p>
                        ))}
                        {eventDetails1.semesters.map((semester, semesterIndex) => (
                            <div key={semesterIndex} className="mb-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-l font-semibold mt-6 mb-2 font-inter">
                                        {semester.title}
                                    </h3>
                                    {isAdmin && (
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => handleEditSemester()}
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSemester()}
                                                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <ul className="list-disc pl-5 text-l font-inter">
                                    {semester.dates.map((date, dateIndex) => (
                                        <li key={dateIndex} className="flex justify-between items-center mb-2">
                                            <span>{date}</span>
                                            {isAdmin && (
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleEditDate()}
                                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteDate()}
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                    >
                                                        Xóa
                                                    </button>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Nội dung sự kiện từ eventData */}
                    <div className="p-6 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4 font-inter mt-4 text-center">
                            {eventDetails2.title}
                        </h2>
                        <div className="mb-4 text-center mb-20">
                            <Image
                                src="/image/banner/banner-su-kien-thuong-nien.png"
                                alt={eventDetails2.title}
                                width={1200}
                                height={400}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        </div>
                        <p className="text-lg mb-4 font-inter text-center font-bold">
                            {eventDetails2.date}
                        </p>
                        <p className="text-lg mb-4 font-inter text-center font-bold">
                            {eventDetails2.location}
                        </p>
                        <p className="text-lg mb-4 font-inter text-center mt-20 mb-20">
                            {eventDetails2.registrationNote}
                        </p>

                        {isAdmin && (
                            <div className="flex justify-center space-x-2 mb-6">
                                <button
                                    onClick={() => handleEdit(eventDetails2.title)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(eventDetails2.title)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </div>
                        )}

                        <div className="mt-20">
                            <p className="text-lg mb-20 text-center">
                                Hội nghị tổng kết hàng năm của trường Điện - Điện tử là một sự kiện diễn ra trong 2 ngày hằng năm dành cho các thành viên của trường, bao gồm các bài thuyết trình về nghiên cứu đang diễn ra, các buổi hướng dẫn của giảng viên trường Điện - Điện tử, tham quan các phòng lab, và thuyết trình poster của sinh viên, cũng như nhiều cơ hội kết nối mở rộng.
                            </p>
                            <div className="mt-8 p-4 bg-red-700 text-center rounded-lg">
                                <div className="bg-red-700 text-white p-6 rounded-lg w-[80%] mx-auto">
                                    <h3 className="text-3xl font-bold mt-5 mb-10">
                                        Chào mừng đến với Hội nghị tổng kết thường niên năm 2024!
                                    </h3>
                                    <p className="text-l mb-20">
                                        Hãy xem lại thời gian biểu các bài thuyết trình do giảng viên và sinh viên trình bày, sau đó là phiên thảo luận dự án nghiên cứu “Phòng thí nghiệm” từ đánh giá thường niên năm 2024.
                                    </p>
                                    {isAdmin && (
                                        <div className="flex justify-center space-x-2 mb-6">
                                            <button
                                                onClick={() => handleEdit(eventDetails2.title)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(eventDetails2.title)}
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="bg-white text-black p-6 rounded-lg w-full">
                                {/* Gộp hai ô nội dung thành một phần */}
                                <div className="flex justify-between space-x-4">
                                    {Object.keys(eventInfo).map((key, index) => (
                                        <div key={index} className="w-[48%]">
                                            <div className="relative w-full h-80 mb-8">
                                                <Image
                                                    src={eventInfo[key as keyof typeof eventInfo].imageSrc}
                                                    alt={eventInfo[key as keyof typeof eventInfo].imageAlt}
                                                    width={800}
                                                    height={400}
                                                    className="rounded-lg object-cover"
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

                                {isAdmin && (
                                    <div className="mt-4 flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleEditBoth()}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBoth()}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                )}
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

                                        {isAdmin && (
                                            <div className="mt-4 flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(schedule[day as keyof typeof schedule].date)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(schedule[day as keyof typeof schedule].date)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
