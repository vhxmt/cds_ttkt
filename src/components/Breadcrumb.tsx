// src/components/Breadcrumb.tsx
"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import convertClassName from "@/utils/format-menu";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  // Split the pathname into an array
  const pathArray = pathname.split('/').filter((segment) => segment);

  // Define a mapping of segment names to display names
  const pathNamesMap: { [key: string]: string } = {
    'tin-tuc-su-kien': 'Tin tức và sự kiện',
    'su-kien': 'Sự kiện',
    'tin-tuc': 'Tin tức',
    'nhan-luc': 'Nhân lực',
    'thao-luan-chuyen-de': 'Thảo luận chuyên đề hằng tuần',
    'su-kien-thuong-nien': 'Sự kiện thường niên',
    'khoa-hoc-ngan-han': 'Khóa học ngắn hạn',
    'can-bo': 'Cán bộ',
    'học-vien-thac-si': 'Học viên thạc sĩ',
    // Add other mappings here...
  };

  // Fallback to capitalize the segment if not mapped
  const capitalize = (str: string) =>
    str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

  // Generate the breadcrumb items
  const breadcrumbItems = pathArray.map((segment, index) => {
    const path = `/${pathArray.slice(0, index + 1).join('/')}`;
    return {
      name: pathNamesMap[segment] || capitalize(segment),
      path,
    };
  });

  return (
    <div className={convertClassName('title')}>
      <Link href="/" className={`${convertClassName('link')} text-red-600`}>
        Trang chủ
      </Link>
      {breadcrumbItems.map((item, index) => (
        <span key={index}>
          &nbsp;&gt;&gt;&nbsp;
          <Link href={item.path} className={`${convertClassName('link')} text-red-600`}>
            {item.name}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
