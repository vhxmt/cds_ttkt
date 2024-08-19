// src/frame/Header.tsx

export interface MenuItem {
  label: string;
  link?: string;
}

export interface Menu {
  label: string;
  items: MenuItem[];
}

export const menus: Menu[] = [
  { 
    label: "Tin tức/Sự kiện", 
    items: [
      { label: "Tin tức", link: "/tin-tuc-su-kien/tin-tuc" },
      { label: "Sự kiện", link: "/tin-tuc-su-kien/su-kien" }
    ] 
  },
  { label: "Nhân lực", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
  { label: "Nghiên cứu", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
  { label: "Công bố khoa học", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
  { label: "Giải thưởng", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
  { label: "Blogs", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
  { label: "Thiết bị & Dụng cụ", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
  { 
    label: "Liên hệ", 
    items: [
      { label: "Thông tin liên hệ", link: "/lien-he/thong-tin-lien-he" },
      { label: "Dẫn đường", link: "/lien-he/dan-duong" }
    ] 
  },
  { label: "Tuyển dụng", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
];
