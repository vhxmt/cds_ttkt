'use client';
import React, { useState } from 'react';
import menusData from '@/data/frame/dataHeader.json';
import covertClassName from '@/utils/covertClassName';
import { Menu, Item, SubItem } from '@/types/header';
import { useAuth } from '@/components/providers/AuthProvider';

const Header: React.FC = () => {
  const { isLoggedIn, user, handleLogout } = useAuth(); // Sử dụng useAuth để lấy các giá trị từ context
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveDropdown(index);
    setActiveSubDropdown(null);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const handleSubMenuEnter = (subIndex: number) => {
    setActiveSubDropdown(subIndex);
  };

  return (
      <header id="banner" className="bg-white">
        <div className="border-t-[10px] border-red-800 w-full"></div>
        <div className="container mx-auto flex flex-wrap items-center justify-between py-2">
          <div id="banner-left" className="w-full md:w-8/12 flex items-center">
            <a id="logo" href="/" title="Back Home">
              <img
                  src="https://seee.hust.edu.vn/theme-viendien-theme/images/VienDienTV.png"
                  alt="Trường Điện - Điện tử"
                  className="h-16"
              />
            </a>
          </div>
          <div id="banner-right" className="w-full md:w-4/12 flex flex-col items-end">
            <div className="line1 text-right mb-2">
              {isLoggedIn ? (
                  <>
                    <span className="text-black">Xin chào, {user?.name}!</span>
                    <span className="mx-3 text-gray-600">|</span>
                    <button onClick={handleLogout} className="text-black">
                      Đăng xuất
                    </button>
                  </>
              ) : (
                  <>
                    <a href="/NewPage/login" id="sign-in" className="text-black">
                      Đăng nhập
                    </a>
                    <span className="mx-3 text-gray-600">|</span>
                    <a href="/contact-us" className="text-black">
                      Liên hệ
                    </a>
                  </>
              )}
            </div>
            <div className="line2 flex justify-end mb-2">
              <form id="_77_fm" action="https://seee.hust.edu.vn/$tabs1URL" method="post" className="flex">
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
                    src="/image/header/VN-Flag.jpg"
                    alt="Tiếng Việt"
                    className="h-4 w-4 mr-1"
                    style={{
                      backgroundPosition: '50% -484px',
                      backgroundRepeat: 'no-repeat',
                    }}
                />
                <span className="text-sm">Tiếng Việt</span>
              </a>
              <a href="#" className="inline-flex items-center ml-4">
                <img
                    src="/image/header/Eng-Flag.jpg"
                    alt="English"
                    className="h-4 w-4 mr-1"
                    style={{
                      backgroundPosition: '50% -110px',
                      backgroundRepeat: 'no-repeat',
                    }}
                />
                <span className="text-sm">English</span>
              </a>
            </div>
          </div>
        </div>
        <nav className={covertClassName('container-nav')}>
          <div className="container mx-auto flex flex-wrap justify-center">
            {menusData.map((menu: Menu, index: number) => (
                <div
                    key={index}
                    className="relative flex items-center border-l border-r border-gray-600"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                >
                  <a
                      href={menu.items && menu.items.length > 0 ? '#' : menu.href || '#'}
                      className={`hover:underline mx-2 py-2 px-4 text-sm ${
                          !menu.items || menu.items.length === 0 ? 'text' : ''
                      }`}
                  >
                    {menu.label}
                  </a>
                  {menu.items && menu.items.length > 0 && activeDropdown === index && (
                      <div
                          className="absolute top-full left-0 mt-0 w-48 bg-gray-700 rounded-md shadow-lg z-50"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                      >
                        {menu.items.map((item: Item, itemIndex: number) => (
                            <div
                                key={itemIndex}
                                className="relative"
                                onMouseEnter={() => handleSubMenuEnter(itemIndex)}
                                onMouseLeave={() => setActiveSubDropdown(null)}
                            >
                              <a
                                  href={item.subItems && item.subItems.length > 0 ? '#' : item.href || '#'}
                                  className={`block px-4 py-2 text-white hover:bg-gray-600 text-sm ${
                                      itemIndex > 0 ? 'border-t border-gray-600' : ''
                                  }`}
                              >
                                {item.label}
                              </a>
                              {item.subItems && item.subItems.length > 0 && activeSubDropdown === itemIndex && (
                                  <div className="absolute top-0 left-full w-48 bg-gray-600 rounded-md shadow-lg z-50">
                                    {item.subItems.map((subItem: SubItem, subItemIndex: number) => (
                                        <a
                                            key={subItemIndex}
                                            href={subItem.href || '#'}
                                            className={`block px-4 py-2 text-white hover:bg-gray-500 text-sm ${
                                                subItemIndex > 0 ? 'border-t border-gray-500' : ''
                                            }`}
                                        >
                                          {subItem.label}
                                        </a>
                                    ))}
                                  </div>
                              )}
                            </div>
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
