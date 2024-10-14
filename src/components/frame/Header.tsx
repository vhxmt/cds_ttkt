'use client';
import React, { useState } from 'react';
import menusData from '@/data/frame/dataHeader.json';
import covertClassName from '@/utils/covertClassName';
import { Menu, Item, SubItem } from '@/interfaces/header/interface';
import { useAuth } from '@/components/providers/AuthProvider';
import LanguageSelector from './LanguageSelector';
import SearchForm from './SearchForm'; // Corrected the import to match SearchForm

const Header: React.FC = () => {
  const { isLoggedIn, user, handleLogout } = useAuth(); 
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<number | null>(null);

  // Handlers for dropdown menus
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
      {/* Top Red Border */}
      <div className="border-t-[10px] border-red-800 w-full"></div>

      {/* Header Content */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-2">
        
        {/* Left Section: Logo */}
        <div id="banner-left" className="w-full md:w-8/12 flex items-center">
          <a id="logo" href="/" title="Back Home">
            <img
              src="https://seee.hust.edu.vn/theme-viendien-theme/images/VienDienTV.png"
              alt="Trường Điện - Điện tử"
              className="h-16"
            />
          </a>
        </div>
        
        {/* Right Section: Authentication, Search, Language */}
        <div id="banner-right" className="w-full md:w-4/12 flex flex-col items-end">
          
          {/* Authentication Links */}
          <div className="line1 text-right mb-2">
            {isLoggedIn ? (
              <>
                <span className="text-black">Xin chào, {user?.name}!</span>
                <span className="mx-3 text-gray-600">|</span>
                <a className="text-black" href="/NewPage/login" id="acc-manage">Quản lí tài khoản</a>
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
              </>
            )}
          </div>
          
          {/* Search Form */}
          <SearchForm />

          {/* Language Selector */}
          <LanguageSelector />
        </div>
      </div>

      {/* Navigation Menu */}
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
                className={`hover:underline mx-2 py-2 px-4 text-sm ${!menu.items || menu.items.length === 0 ? 'text' : ''}`}
              >
                {menu.label}
              </a>
              {/* Dropdown Menu */}
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
                        className={`block px-4 py-2 text-white hover:bg-gray-600 text-sm ${itemIndex > 0 ? 'border-t border-gray-600' : ''}`}
                      >
                        {item.label}
                      </a>
                      {/* Sub-dropdown Menu */}
                      {item.subItems && item.subItems.length > 0 && activeSubDropdown === itemIndex && (
                        <div className="absolute top-0 left-full w-48 bg-gray-600 rounded-md shadow-lg z-50">
                          {item.subItems.map((subItem: SubItem, subItemIndex: number) => (
                            <a
                              key={subItemIndex}
                              href={subItem.href || '#'}
                              className={`block px-4 py-2 text-white hover:bg-gray-500 text-sm ${subItemIndex > 0 ? 'border-t border-gray-500' : ''}`}
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
