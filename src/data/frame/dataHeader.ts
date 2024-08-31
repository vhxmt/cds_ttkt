// src/frame/Header.tsx

export interface MenuItem {
  label: string;
  href?: string;
}

export interface Menu {
  label: string;
  href?: string;
  items?: MenuItem[];
}

export const menus: Menu[] = [
  { 
    label: "Tin tức/Sự kiện", 
    items: [
      { label: "Tin tức", href: "/tin-tuc-su-kien/tin-tuc" },
      { label: "Sự kiện", href: "/tin-tuc-su-kien/su-kien" }

  ]},

  { label: "Nhân lực", items: [
    { label: "Cán bộ", href: "/nhan-luc/can-bo" }, 
    { label: "Sinh viên Thạc sĩ", href: "/nhan-luc/sinh-vien-thac-si" }, 
    { label: "Sinh viên Tiến sĩ", href: "/nhan-luc/sinh-vien-tien-si" },
    { label: "Học giả thỉnh giảng", href: "/nhan-luc/hoc-gia-thinh-giang" },
    { label: "CTV NC", href: "/nhan-luc/ctv-nc" },
    { label: "NCV sau Thạc sĩ", href: "/nhan-luc/ncv-sau-thac-si" },
    { label: "Cựu sinh viên", href: "/nhan-luc/cuu-sinh-vien" }
  ]},

  { label: "Nghiên cứu", items: [
    { label: "Hướng nghiên cứu", href: "/nghien-cuu/huong-nghien-cuu" }, 
    { label: "Dự án",href: "/nghien-cuu/du-an" }, 
    { label: "Bằng sáng chế", href: "/nghien-cuu/bang-sang-che"}
  ]},

  { label: "Công bố khoa học", href: "/cong-bo-khoa-hoc"},


  { label: "Giải thưởng", items: [
    { label: "Giải thưởng Bài báo Hội nghị", href: "/giai-thuong/giai-thuong-bai-bao-hoi-nghi" }, 
    { label: "Giải thưởng Bài báo Tạp chí", href: "/giai-thuong/giai-thuong-bai-bao-tap-chi" }, 
    { label: "Giải thưởng Bài báo trình bày Hội nghị", href: "/giai-thuong/giai-thuong-bai-trinh-bay-hoi-nghi" },
    { label: "Giải thưởng khác", href: "/giai-thuong/giai-thuong-khac" } 
  ]},

  { label: "Blogs", items: [
    { label: "Điện tử viễn thông", href: "/blogs/dien-tu-vien-thong" }, 
    { label: "Điện - Tự động hóa", href: "/blogs/dien-tu-dong-hoa" }, 
    { label: "Điện - Tự động hóa - Công nghệ thông tin", href: "/blogs/dien-tu-dong-hoa-cong-nghe-thong-tin" }
  ]},
  { label: "Thiết bị & Dụng cụ", href: "/thiet-bi-va-dung-cu" },
  { label: "Hợp tác", items: [
    { label: "Hợp tác doanh nghiệp", href: "/hop-tac/hop-tac-khoi-doanh-nghiep" }, 
    { label: "Hợp tác khối hàn lâm", href: "/hop-tac/hop-tac-khoi-han-lam" }, 
    { label: "Hợp tác quốc tế", href: "/hop-tac/hop-tac-quoc-te" }
  ]},
  { 
    label: "Liên hệ", 
    items: [
      { label: "Thông tin liên hệ", href: "/lien-he/thong-tin-lien-he" },
      { label: "Dẫn đường", href: "/lien-he/dan-duong" }
    ] 
  },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
];
