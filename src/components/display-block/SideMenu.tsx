import Link from 'next/link';
import convertClassName from '@/utils/format-menu'; // Đảm bảo đường dẫn chính xác

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
  menuItems: MenuItem[];
}

export default function SideMenu({ menuItems }: SideMenuProps) {
  return (
      <div className={convertClassName('container')}>
        {menuItems.map((item, index) => (
            <div key={index} className={convertClassName('text')}>
              <Link href={item.href}>
                <p className={convertClassName('title')}>
                  {item.label}
                </p>
              </Link>
              {/* Kiểm tra nếu có mục con */}
              {item.subItems && (
                  <ul className={convertClassName('subMenu')}>
                    {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className={convertClassName('subItem')}>
                          <Link href={subItem.href}>
                            {subItem.label}
                          </Link>
                        </li>
                    ))}
                  </ul>
              )}
            </div>
        ))}
      </div>
  );
}
