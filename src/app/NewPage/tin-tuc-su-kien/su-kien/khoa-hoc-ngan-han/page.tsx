'use client'
import Image from 'next/image';
import eventData from "@/data/tin-tuc-su-kien/su-kien/khoa-hoc-body.json";
import SideMenu from '@/components/display-block/SideMenu';
import Breadcrumb from '@/components/breadcrumb';
import {useAuth} from "@/components/providers/AuthProvider";

// Destructure the imported JSON
const { upcomingCourses } = eventData;

// Các hàm xử lý cho nút thêm, sửa, xóa (hiện tại là hàm trống)
const handleAdd = () => {
    console.log("Thêm khóa học");
};

const handleEdit = () => {
    console.log("Sửa khóa học");
};

const handleDelete = () => {
    console.log("Xóa khóa học");
};

export default function NewsPage() {
    // Giả sử có một biến để kiểm tra quyền admin
    const { isLoggedIn, user } = useAuth();
    const isAdmin = isLoggedIn && user?.role === 'admin';

    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Breadcrumb */}
            <Breadcrumb />

            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Tin tức/Sự kiện" />

                {/* Container chứa banner và hai ô */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 font-inter mt-4 mb-10 text-center">
                        Khóa học ngắn hạn
                    </h2>

                    <div className="mb-4">
                        <Image
                            src="/image/tin-tuc-su-kien/su-kien/khoa-hoc-ngan-han/khoa-hoc-ngan.png"
                            alt="Banner"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>

                    <p className="text-lg mb-4 font-inter">
                        Các giảng viên tại Trường Điện - Điện tử làm việc với các chương trình chuyên nghiệp liên ngành của doanh nghiệp để cung cấp nhiều khóa học ngắn hạn tiếp tục giáo dục liên quan đến lĩnh vực chuyên môn của họ. Các công ty thành viên của Trường nhận được giảm $200 cho mỗi khóa học.
                    </p>

                    <div className="flex space-x-4 mb-4">
                        {/* Ô Các khóa học sắp diễn ra */}
                        <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                            <header className="flex items-center mb-4">
                                <h1 className="text-2xl font-semibold">Các khóa học sắp diễn ra</h1>
                                {isAdmin && (
                                    <button
                                        className="ml-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                        onClick={handleAdd}
                                    >
                                        Thêm
                                    </button>
                                )}
                            </header>
                            {upcomingCourses.map((course, index) => (
                                <div key={index} className="p-6 max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg mb-6">
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
                                    <div className="flex space-x-2">
                                        {isAdmin && (
                                            <>
                                                <button
                                                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                                    onClick={() => handleEdit()}
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                                    onClick={() => handleDelete()}
                                                >
                                                    Xóa
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
