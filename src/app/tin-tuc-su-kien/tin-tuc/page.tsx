import SideMenu from '@/components/display-block/SideMenu';
import Banner from '@/components/display-block/Banner';
import Breadcrumb from '@/components/breadcrumb';
import data from '@/data/tin-tuc-su-kien/tin-tuc/tin-tuc.json';

export default function NewsPage() {
  const { banner, featuredNews, events, additionalNews } = data;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      {/* Container chính */}
      {/* Breadcrumb */}
      <Breadcrumb />
      <div className="flex space-x-4">
        {/* Side Menu */}
        <SideMenu currentSection="Tin tức/Sự kiện" />

        {/* Container chứa banner và hai ô */}
        <div className="flex-1">
          {/* Ảnh banner */}
          <Banner src={banner.src} alt={banner.alt} />

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
                  {featuredNews.map((newsItem, index) => (
                    <li key={index}>
                      <a
                        href={newsItem.link}
                        className="text-blue-600 hover:underline"
                      >
                        {newsItem.title}
                      </a>
                    </li>
                  ))}
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
                {events.map((event, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">
                      <a
                        href={event.link}
                        className="text-blue-600 hover:underline"
                      >
                        {event.title}
                      </a>
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {event.description}
                    </p>
                    <a
                      href={event.link}
                      className="text-blue-600 hover:underline"
                    >
                      Chi tiết
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phần tin tức bổ sung */}
          {additionalNews.map((newsItem, index) => (
            <div key={index} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4">
              <h3 className="text-lg font-semibold mb-2">
                <a
                  href={newsItem.link}
                  className="flex items-center space-x-2 text-blue-600 hover:underline"
                >
                  <img
                    alt={newsItem.title}
                    src={newsItem.image}
                    className="w-8 h-8 object-cover"
                  />
                  <span>{newsItem.title}</span>
                </a>
              </h3>
              <div className="text-gray-700 mb-2">
                <div className="mb-2">
                  {newsItem.description}
                </div>
                <div>
                  <a
                    href={newsItem.link}
                    className="text-blue-600 hover:underline"
                  >
                    Chi tiết<span className="sr-only">về {newsItem.title}</span> »
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
