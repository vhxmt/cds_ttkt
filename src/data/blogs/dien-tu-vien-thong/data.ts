// src/data/blogs/dien-tu-dong-hoa/data.ts

export interface BlogPost {
    title: string;
    date: string;
    description: string;
    imageUrl: string;
    href: string;  // Link to the detailed page of the post
}

export interface MenuItem {
    label: string;
    href: string;
}

// Sample data for blog posts
export const 
blogPosts = [
    {
        title: "Nghiên cứu Xe điện/Control Technique and Innovation Laboratory for Electric Vehicles",
        date: "12/5/2022",
        description: "A post about electric vehicle control techniques and innovations.",
        imageUrl: "/path-to-image-1.png",
        href: "/blogs/control-technique-innovation-lab-electric-vehicles"
    },
    {
        title: "Cảm biến thông minh (Smart Sensor)",
        date: "28/4/2021",
        description: "A post about smart sensor technology.",
        imageUrl: "/path-to-image-2.png",
        href: "/blogs/smart-sensor"
    },
    {
        title: "Điện tử công suất và Truyền động điện (Power Electronics and Electrical Drives Laboratory)",
        date: "27/9/2020",
        description: "A post about power electronics and electrical drives.",
        imageUrl: "/path-to-image-3.png",
        href: "/blogs/power-electronics-electrical-drives-lab"
    }
];

export const menuItems: MenuItem[] = [
    { label: 'Điện tử viễn thông', href: '/blogs/dien-tu-vien-thong' },
    { label: 'Điện - Tự động hóa', href: '/blogs/dien-tu-dong-hoa' },
    { label: 'Điện - Tự động hóa - Công nghệ thông tin', href: '/blogs/dien-tu-dong-hoa-cong-nghe-thong-tin' },
];
