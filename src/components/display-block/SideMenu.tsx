import Link from 'next/link';

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
    <div className="side-menu flex-none w-1/3">
      {menuItems.map((item, index) => (
        <div key={index} className="text-red-600 text-lg mb-4">
          <Link href={item.href}>
            <p className="font-bold">
              {item.label}
            </p>
          </Link>
          {/* Check if there are sub-items */}
          {item.subItems && (
            <ul className="list-disc list-inside ml-4 text-red-500 text-base">
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex}>
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
