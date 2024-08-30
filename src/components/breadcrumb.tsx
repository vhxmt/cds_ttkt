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

    'huong-nghien-cuu': 'Hướng nghiên cứu',
    'du-an': 'Dự án',
    'bang-sang-che': 'Bằng sáng chế',

    'cong-bo-khoa-hoc': 'Công bố khoa học',

    'giai-thuong-bai-bao-hoi-nghi': 'Giải thưởng Bài báo Hội nghị',
    'giai-thuong-bai-bao-tap-chi': 'Giải thưởng Bài báo Tạp chí',
    'giai-thuong-bai-trinh-bay-hoi-nghi': 'Giải thưởng Bài trình bày Hội nghị',
    'giai-thuong-khac': 'Giải thưởng khác',

    'dien-tu-vien-thong': 'Điện tử viễn thông',
    'dien-tu-dong-hoa': 'Điện - Tự động hóa',
    'dien-tu-dong-hoa-cong-nghe-thong-tin': 'Điện - Tự động hóa - Công nghệ thông tin',

    'thiet-bi-va-dung-cu': 'Thiết bị & dụng cụ',

    'hop-tac-khoi-doanh-nghiep': 'Hợp tác khối doanh nghiệp',
    'hop-tac-khoi-han-lam': 'Hợp tác khối hàn lâm',
    'hop-tac-quoc-te': 'Hợp tác quốc tế',

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
