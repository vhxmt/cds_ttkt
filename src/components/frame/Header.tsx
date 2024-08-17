"use client";
import React, { useState } from "react";
import {Menu, MenuItem} from "@/types/dataHeader";
import covertClassName from "@/utils/covertClassName";

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };


  const menus: Menu[] = [
    { label: "Tin tức/Sự kiện", items: [
      { label: "Tin tức", link: "/tin-tuc-su-kien/tin-tuc" },
      { label: "Sự kiện", link: "/tin-tuc-su-kien/su-kien" }
    ] },
      
    { label: "Nhân lực", items: [
      { label: "Cán bộ", link: "/nhan-luc/can-bo" }, 
      { label: "Học viên thạc sĩ",link: "/nhan-luc/hoc-vien-thac-si" }, 
      { label: "Item 3",link: "/nhan-luc" }
    ] },

    { label: "Nghiên cứu", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
    { label: "Công bố khoa học", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
    { label: "Giải thưởng", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
    { label: "Blogs", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
    { label: "Thiết bị & Dụng cụ", items: [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }] },
    { label: "Hợp tác", items: 
      [{ label: "Khối doanh nghiệp", link: "/hop-tac"}, { label: "Item 2" }, { label: "Item 3" }] },
      { label: "Liên hệ", items: [
        { label: "Thông tin liên hệ", link: "/lien-he/thong-tin-lien-he" },
        { label: "Dẫn đường", link: "/lien-he/dan-duong" }
      ] },
    { label: "Tuyển dụng", items: [
        { label: "Tuyển dụng", link: "/tuyen-dung" }
      ] },
    // Other menu items...
  ];

  return (
      <header id="banner" className="bg-white">
        <div className="border-t-[10px] border-red-800 w-full"></div>
        <div className="container mx-auto flex flex-wrap items-center justify-between py-2">
          <div id="banner-left" className="w-full md:w-8/12 flex items-center">
            <a
                id="logo"
                href="/#"
                title="Back Home"
            >
              <img
                  src="https://seee.hust.edu.vn/theme-viendien-theme/images/VienDienTV.png"
                  alt="Trường Điện - Điện tử"
                  className="h-16"
              />
            </a>
          </div>
          <div id="banner-right" className="w-full md:w-4/12 flex flex-col items-end">
            <div className="line1 text-right mb-2">
              <a
                  href="c/portal/login%3Fp_l_id=86531.html"
                  id="sign-in"
                  className="text-black"
              >
                Đăng nhập
              </a>
              <span className="mx-3 text-gray-600">|</span>
              <a href="contact-us.html" className="text-black">
                Liên hệ
              </a>
            </div>
            <div className="line2 flex justify-end mb-2">
              <form
                  id="_77_fm"
                  action="https://seee.hust.edu.vn/$tabs1URL"
                  method="post"
                  className="flex"
              >
                <input
                    className="border border-gray-400 p-2 rounded-l-md"
                    id="_77_keywords"
                    type="text"
                    name="_77_keywords"
                    placeholder="Tìm kiếm ..."
                />
                <button className="bg-gray-300 p-2 rounded-r-md">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
            <div className="line3 text-right">
              <span className="mr-2">Ngôn ngữ:</span>
              <a href="#" className="inline-flex items-center">
                <img
                    src="/image/flag/VN-Flag.jpg"
                    alt="Tiếng Việt"
                    className="h-4 w-4 mr-1"
                    style={{
                      backgroundPosition: "50% -484px",
                      backgroundRepeat: "no-repeat",
                    }}
                />
                <span className="text-sm">Tiếng Việt</span>
              </a>
              <a href="#" className="inline-flex items-center ml-4">
                <img
                    src="/image/flag/Eng-Flag.jpg"
                    alt="English"
                    className="h-4 w-4 mr-1"
                    style={{
                      backgroundPosition: "50% -110px",
                      backgroundRepeat: "no-repeat",
                    }}
                />
                <span className="text-sm">English</span>
              </a>
            </div>
          </div>
        </div>
        <nav className={covertClassName("container-nav")}>
          <div className="container mx-auto flex flex-wrap justify-center">
            {menus.map((menu, index) => (
                <div
                    key={index}
                    className="relative flex items-center border-l border-r border-gray-600"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                  <a href="#" className="hover:underline mx-2 py-2 px-4 text-sm">
                    {menu.label}
                  </a>
                  {activeDropdown === index && (
                      <div
                          className="absolute top-full left-0 mt-0 w-48 bg-gray-700 rounded-md shadow-lg z-50"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                      >
                        {menu.items.map((item, itemIndex) => (
                            <a
                                key={itemIndex}
                                href={item.link || "#"}
                                className={`block px-4 py-2 text-white hover:bg-gray-600 text-sm ${
                                    itemIndex > 0 ? "border-t border-gray-600" : ""
                                }`}
                            >
                              {item.label}
                            </a>
                        ))}
                      </div>
                  )}
                </div>
            ))}
          </div>
        </nav>
      </header>
  );
};

export default Header;
