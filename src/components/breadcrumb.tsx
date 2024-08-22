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
    'tin-tuc': 'Tin tức',
    'su-kien': 'Sự kiện',
    'thao-luan-chuyen-de': 'Thảo luận chuyên đề hằng tuần',
    'su-kien-thuong-nien': 'Sự kiện thường niên',
    'khoa-hoc-ngan-han': 'Khóa học ngắn hạn',
    
    'can-bo': 'Cán bộ',
    'hoc-vien-thac-si': 'Học viên thạc sĩ',
    'hoc-vien-tien-si': 'Học viên tiến sĩ',
    'ctv-nc': 'CTV NC',
    'ncv-sau-ts': 'NCV sau TS',
    'cuu-sv': 'Cựu SV',
    
    'dien-tu-vien-thong': "Điện tử viễn thông",
    'dien-tu-dong-hoa': "Điện - Tự động hóa",
    'dien-tu-dong-hoa-cong-nghe-thong-tin': "Điện - Tự động hóa - Công nghệ thông tin",

    'lien-he' : "Thông tin liên hệ",
    'thong-tin-lien-he' : "Thông tin liên hệ",
    'dan-duong' : "Dẫn đường",

    'tuyen-dung': "Tuyển dụng",
  };

  // Fallback to capitalize the segment if not mapped
  const capitalize = (str: string) =>
    str.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

  // Generate the breadcrumb items, but only include those that have a label in `pathNamesMap`
  const breadcrumbItems = pathArray.map((segment, index) => {
    const path = `/${pathArray.slice(0, index + 1).join('/')}`;
    const name = pathNamesMap[segment] || capitalize(segment);
    return pathNamesMap[segment] ? { name, path } : null;
  }).filter(Boolean); // This removes any `null` entries

  return (
    <div className={convertClassName('title')}>
      <Link href="/" className={`${convertClassName('link')} `}>
        Trang chủ
      </Link>
      {breadcrumbItems.map((item, index) => (
        <span key={index}>
          &nbsp;&gt;&gt;&nbsp;
          <Link href={(item as any).path} className={`${convertClassName('link')} `}>
            {(item as any).name}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
