"use client";

import Link from 'next/link';
import convertClassName from "@/utils/format-menu";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href: string;
  subItems?: SubMenuItem[];
}

interface SideMenuProps {
  menuItems?: MenuItem[]; // Make menuItems optional
}

export default function SideMenu({ menuItems }: SideMenuProps) {
  return (
    <div className="side-menu flex-none w-1/5">
      {menuItems && menuItems.length > 0 ? (
        menuItems.map((item, index) => (
          <div key={index} className="group text-red-600 text-lg mb-4">
            <Link href={item.href}>
              <p className={convertClassName('link') + " font-bold"}>
                {item.label}
              </p>
            </Link>
            {/* Check if there are sub-items */}
            {item.subItems && (
              <ul className="list-disc list-inside ml-4 text-red-500 text-base hidden group-hover:block">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link className={convertClassName('link')} href={subItem.href}>
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <div className="side-menu flex-none w-1/5"></div>
      )}
    </div>
  );
}
