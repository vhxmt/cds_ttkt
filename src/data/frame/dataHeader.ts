// src/frame/Header.tsx

export interface MenuItem {
  label: string;
  link?: string;
}

export interface Menu {
  label: string;
  link?: string;
  items?: MenuItem[];
}

export const menus: Menu[] = [
  { 
    label: "Tin tức/Sự kiện", 
    items: [
      { label: "Tin tức", link: "/tin-tuc-su-kien/tin-tuc" },
      { label: "Sự kiện", link: "/tin-tuc-su-kien/su-kien" }

  ]},

  { label: "Nhân lực", items: [
    { label: "Cán bộ", link: "/nhan-luc/can-bo" }, 
    { label: "Sinh viên Thạc sĩ", link: "/nhan-luc/sinh-vien-thac-si" }, 
    { label: "Sinh viên Tiến sĩ", link: "/nhan-luc/sinh-vien-tien-si" },
    { label: "Học giả thỉnh giảng", link: "/nhan-luc/hoc-gia-thinh-giang" },
    { label: "CTV NC", link: "/nhan-luc/ctv-nc" },
    { label: "NCV sau Thạc sĩ", link: "/nhan-luc/ncv-sau-thac-si" },
    { label: "Cựu sinh viên", link: "/nhan-luc/cuu-sinh-vien" }
  ]},

  { label: "Nghiên cứu", items: [
    { label: "Hướng nghiên cứu", link: "/nghien-cuu/huong-nghien-cuu" }, 
    { label: "Dự án",link: "/nghien-cuu/du-an" }, 
    { label: "Bằng sáng chế", link: "/nghien-cuu/bang-sang-che"}
  ]},

  { label: "Công bố khoa học", link: "/cong-bo-khoa-hoc"},


  { label: "Giải thưởng", items: [
    { label: "Giải thưởng Bài báo Hội nghị", link: "/giai-thuong/giai-thuong-bai-bao-hoi-nghi" }, 
    { label: "Giải thưởng Bài báo Tạp chí", link: "/giai-thuong/giai-thuong-bai-bao-tap-chi" }, 
    { label: "Giải thưởng Bài báo trình bày Hội nghị", link: "/giai-thuong/giai-thuong-bai-trinh-bay-hoi-nghi" },
    { label: "Giải thưởng khác", link: "/giai-thuong/giai-thuong-khac" } 
  ]},


  { label: "Blogs", items: [
    { label: "Điện tử viễn thông", link: "/blogs/dien-tu-vien-thong" }, 
    { label: "Điện - Tự động hóa", link: "/blogs/dien-tu-dong-hoa" }, 
    { label: "Điện - Tự động hóa - Công nghệ thông tin", link: "/blogs/dien-tu-dong-hoa-cong-nghe-thong-tin" }
  ]},
  // { label: "Thiết bị & Dụng cụ", link: "/thiet-bi-va-dung-cu" },
  { label: "Hợp tác", items: [
    { label: "Hợp tác doanh nghiệp", link: "/hop-tac/hop-tac-khoi-doanh-nghiep" }, 
    { label: "Hợp tác khối hàn lâm", link: "/hop-tac/hop-tac-khoi-han-lam" }, 
    { label: "Hợp tác quốc tế", link: "/hop-tac/hop-tac-quoc-te" }
  ]},

  { 
    label: "Liên hệ", 
    items: [
      { label: "Thông tin liên hệ", link: "/lien-he/thong-tin-lien-he" },
      { label: "Dẫn đường", link: "/lien-he/dan-duong" }
    ] 
  },
  { label: "Tuyển dụng", link: "/tuyen-dung" },
];
