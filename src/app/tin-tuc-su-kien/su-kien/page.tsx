import SideMenu from '@/components/display-block/SideMenu';
import Banner from '@/components/display-block/Banner';
import NewsSection from '@/components/display-block/NewsSection';
import { menuItems, newsItems } from '@/data/tin-tuc-su-kien/su-kien/menu-data';
import Breadcrumb from '@/components/Breadcrumb';

export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            {/* Breadcrumb */}
            <Breadcrumb />
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
          <NewsSection newsItems={newsItems} />  {/* Use the new component */}
        </div>
      </div>
    </div>
  );
}
