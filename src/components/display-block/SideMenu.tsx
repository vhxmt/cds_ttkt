"use client";
import Link from 'next/link';
import convertClassName from "@/utils/format-menu";
import { menus } from '@/data/frame/dataHeader';

interface SideMenuProps {
  currentSection: string; // This prop determines which section's menu to display
}

export default function SideMenu({ currentSection }: SideMenuProps) {
  const sectionMenu = menus.find(menu => menu.label === currentSection);

  return (
    <div className="side-menu flex-none w-1/5">
      {sectionMenu && sectionMenu.items && sectionMenu.items.length > 0 &&
        sectionMenu.items.map((item, index) => (
          <div key={index} className="group text-red-600 text-lg mb-4">
            {item.href ? (
              <Link href={item.href}>
                <p className={convertClassName('link') + " font-bold"}>
                  {item.label}
                </p>
              </Link>
            ) : (
              <p className={convertClassName('link') + " font-bold"}>
                {item.label}
              </p>
            )}
            {/* Render subItems if available */}
            {item.subItems && item.subItems.length > 0 && (
              <ul className="list-disc list-inside ml-4 text-red-500 text-base">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {subItem.href ? (
                      <Link className={convertClassName('link')} href={subItem.href}>
                        {subItem.label}
                      </Link>
                    ) : (
                      <span className={convertClassName('link')}>
                        {subItem.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      }
    </div>
  );
}
