import SideMenu from '@/components/display-block/SideMenu';
import Banner from '@/components/display-block/Banner';
import { menuItems } from '@/data/tin-tuc-su-kien/menu-data';
import convertClassName from "@/utils/format-menu"; // Importing data from data.ts

export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            <div className={convertClassName('title')}>
                Trang chủ &gt;&gt; Tin tức và sự kiện &gt;&gt; <a href="/tin-tuc-su-kien/tin-tuc" className={convertClassName('link')}>Tin tức</a>
            </div>
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu menuItems={menuItems} />

        {/* Container chứa banner và hai ô */}
        <div className="flex-1">
          {/* Ảnh banner */}
          <Banner src="/banner.png" alt="Banner" />

                    <h1 className="text-2xl font-semibold mt-4 mb-4">
                        SEEE Tin tức & Sự kiện
                    </h1>

                    {/* Container cho hai ô */}
                    <div className="flex space-x-4 mb-4">
                        {/* Ô Tin nổi bật */}
                        <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                            <header className="flex items-center mb-4">
                                <h1 className="text-2xl font-semibold">
                                    Tin tức mới nhất
                                </h1>
                            </header>
                            <div className="space-y-4">
                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    <li>
                                        <a
                                            href="https://seee.hust.edu.vn/asset-page/-/asset_publisher/3YpEUUuUWBB6/content/le-tot-nghiep-va-ngay-hoi-tuyen-dung-thang-7-2024"
                                            className="text-blue-600 hover:underline"
                                        >
                                            LỄ TỐT NGHIỆP VÀ NGÀY HỘI TUYỂN DỤNG THÁNG 7-2024
                                        </a>
                                    </li>
                                    {/* Các mục khác */}
                                </ul>
                            </div>
                        </div>

                        {/* Ô Sự kiện sắp diễn ra */}
                        <div className="flex-1 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                            <header className="flex items-center mb-4">
                                <h1 className="text-2xl font-semibold">
                                    Sự kiện sắp diễn ra
                                </h1>
                            </header>
                            <div className="space-y-4">
                                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <h3 className="text-lg font-semibold mb-2">
                                        <a
                                            href="https://seee.hust.edu.vn/tin-tuc-thong-bao/-/asset_publisher/tA0yFmHEow5o/content/talkshow-powering-the-future-electronics-driving-global-industries"
                                            className="text-blue-600 hover:underline"
                                        >
                                            TALKSHOW Powering the Future: Electronics Driving Global Industries
                                        </a>
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Cơ hội gặp gỡ và giao lưu với CTO của tập đoàn ebm-papst, đối tác của FPT Software tại Talkshow Powering the Future: Electronics Driving Global Industries. 15:00 - 17:00 ngày 01/08/2024 (thứ 5)
                                    </p>
                                    <a
                                        href="https://seee.hust.edu.vn/tin-tuc-thong-bao/-/asset_publisher/tA0yFmHEow5o/content/talkshow-powering-the-future-electronics-driving-global-industries"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Chi tiết
                                    </a>
                                </div>
                                {/* Thêm các sự kiện khác tại đây */}
                            </div>
                        </div>
                    </div>

                    {/* Phần tin tức bổ sung */}
                    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">
                            <a
                                href="https://seee.hust.edu.vn/tin-tuc-thong-bao/-/asset_publisher/tA0yFmHEow5o/content/gioi-thieu-truong-he-quoc-gia-lan-thu-nhat-ve-ien-tu-cong-suat?inheritRedirect=false&amp;redirect=https%3A%2F%2Fseee.hust.edu.vn%2Ftin-tuc-thong-bao%3Fp_p_id%3D101_INSTANCE_tA0yFmHEow5o%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-1%26p_p_col_pos%3D1%26p_p_col_count%3D2"
                                className="flex items-center space-x-2 text-blue-600 hover:underline"
                            >
                                <img
                                    alt="Giới thiệu trường hè quốc gia"
                                    src="https://seee.hust.edu.vn/theme-viendien-theme/images/common/history.png"
                                    className="w-8 h-8 object-cover"
                                />
                                <span>GIỚI THIỆU TRƯỜNG HÈ QUỐC GIA LẦN THỨ NHẤT VỀ ĐIỆN TỬ CÔNG SUẤT</span>
                            </a>
                        </h3>
                        <div className="text-gray-700 mb-2">
                            <div className="mb-2">
                                Trường Điện - Điện tử dự kiến phối hợp với Tạp chí Tự động hóa ngày nay tổ chức Trường
                                hè quốc gia lần thứ Nhất về Điện tử công suất (VSSPE’24) tại Toà C7, Đại học Bách Khoa
                                Hà Nội, từ ngày 9 -...
                            </div>
                            <div>
                                <a
                                    href="https://seee.hust.edu.vn/tin-tuc-thong-bao/-/asset_publisher/tA0yFmHEow5o/content/gioi-thieu-truong-he-quoc-gia-lan-thu-nhat-ve-ien-tu-cong-suat?inheritRedirect=false&amp;redirect=https%3A%2F%2Fseee.hust.edu.vn%2Ftin-tuc-thong-bao%3Fp_p_id%3D101_INSTANCE_tA0yFmHEow5o%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-1%26p_p_col_pos%3D1%26p_p_col_count%3D2"
                                    className="text-blue-600 hover:underline"
                                >
                                    Chi tiết<span className="sr-only">về GIỚI THIỆU TRƯỜNG HÈ QUỐC GIA LẦN THỨ NHẤT VỀ ĐIỆN TỬ CÔNG SUẤT</span> »
                                </a>
                            </div>
                        </div>
                    {/* Thêm các tin tức khác tại đây */}
                    </div>
                    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">
                            <a
                                href="https://seee.hust.edu.vn/tin-tuc-thong-bao/-/asset_publisher/tA0yFmHEow5o/content/le-tot-nghiep-va-ngay-hoi-tuyen-dung-thang-7-2024?inheritRedirect=false&amp;redirect=https%3A%2F%2Fseee.hust.edu.vn%2Ftin-tuc-thong-bao%3Fp_p_id%3D101_INSTANCE_tA0yFmHEow5o%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-1%26p_p_col_pos%3D1%26p_p_col_count%3D2"
                                className="flex items-center space-x-2 text-blue-600 hover:underline"
                            >
                                <img
                                    alt="Lễ tốt nghiệp và ngày hội tuyển dụng tháng 7-2024"
                                    src="https://seee.hust.edu.vn/theme-viendien-theme/images/common/history.png"
                                    className="w-8 h-8 object-cover"
                                />
                                <span>LỄ TỐT NGHIỆP VÀ NGÀY HỘI TUYỂN DỤNG THÁNG 7-2024</span>
                            </a>
                        </h3>
                        <div className="text-gray-700 mb-4">
                            <div className="mb-2">
                                Lễ bảo vệ đồ án tốt nghiệp là một sự kiện có ý nghĩa đặc biệt. Tại buổi bảo vệ, các sinh
                                viên trình bày đồ án, giới thiệu sản phẩm và trả lời các câu hỏi từ Hội đồng bảo vệ. Đây
                                dịp để sinh viên...
                            </div>
                            <div>
                                <a
                                    href="https://seee.hust.edu.vn/tin-tuc-thong-bao/-/asset_publisher/tA0yFmHEow5o/content/le-tot-nghiep-va-ngay-hoi-tuyen-dung-thang-7-2024?inheritRedirect=false&amp;redirect=https%3A%2F%2Fseee.hust.edu.vn%2Ftin-tuc-thong-bao%3Fp_p_id%3D101_INSTANCE_tA0yFmHEow5o%26p_p_lifecycle%3D0%26p_p_state%3Dnormal%26p_p_mode%3Dview%26p_p_col_id%3Dcolumn-1%26p_p_col_pos%3D1%26p_p_col_count%3D2"
                                    className="text-blue-600 hover:underline"
                                >
                                    Chi tiết<span className="sr-only">về LỄ TỐT NGHIỆP VÀ NGÀY HỘI TUYỂN DỤNG THÁNG 7-2024</span> »
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}