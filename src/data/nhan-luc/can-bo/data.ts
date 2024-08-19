// src/data/data.ts

export interface Staff {
    name: string;
    title: string;
    mail: string;
    tel: string;
    imageUrl: string;
}

export interface MenuItem {
    label: string;
    href: string;
}

export const 
staffData = [
    {
        name: "TS. Nguyễn Vũ Thanh",
        title: "Trưởng khoa Điện",
        mail: "email1@example.com",
        tel: "123-456-789",
        imageUrl: "/path-to-image-1.png"
    },
    {
        name: "TS. Phùng Anh Tuấn",
        title: "Phó trưởng khoa Điện",
        mail: "email2@example.com",
        tel: "987-654-321",
        imageUrl: "/path-to-image-2.png"
    },
    {
        name: "TS. Nguyễn Quốc Minh",
        title: "Phó trưởng khoa Điện",
        mail: "email3@example.com",
        tel: "555-555-555",
        imageUrl: "/path-to-image-3.png"
    },
    {
        name: "TS. Trần Văn Tài",
        title: "Giảng viên",
        mail: "email4@example.com",
        tel: "111-222-333",
        imageUrl: "/path-to-image-4.png"
    },
    {
        name: "TS. Lê Thị Hồng",
        title: "Giảng viên",
        mail: "email5@example.com",
        tel: "444-555-666",
        imageUrl: "/path-to-image-5.png"
    },
    {
        name: "TS. Vũ Quang Minh",
        title: "Giảng viên",
        mail: "email6@example.com",
        tel: "777-888-999",
        imageUrl: "/path-to-image-6.png"
    },
    {
        name: "TS. Đặng Thị Hà",
        title: "Giảng viên",
        mail: "email7@example.com",
        tel: "000-111-222",
        imageUrl: "/path-to-image-7.png"
    },
    {
        name: "TS. Nguyễn Hữu Thắng",
        title: "Phó Trưởng phòng",
        mail: "email8@example.com",
        tel: "333-444-555",
        imageUrl: "/path-to-image-8.png"
    },
    {
        name: "TS. Lê Anh Tuấn",
        title: "Trưởng bộ môn",
        mail: "email9@example.com",
        tel: "666-777-888",
        imageUrl: "/path-to-image-9.png"
    },
    {
        name: "TS. Phạm Thị Lan",
        title: "Giảng viên",
        mail: "email10@example.com",
        tel: "999-000-111",
        imageUrl: "/path-to-image-10.png"
    },
    {
        name: "TS. Vũ Thị Thu",
        title: "Giảng viên",
        mail: "email11@example.com",
        tel: "222-333-444",
        imageUrl: "/path-to-image-11.png"
    },
    {
        name: "TS. Phan Quốc Việt",
        title: "Giảng viên",
        mail: "email12@example.com",
        tel: "555-666-777",
        imageUrl: "/path-to-image-12.png"
    },
    {
        name: "TS. Trần Văn Nam",
        title: "Giảng viên",
        mail: "email13@example.com",
        tel: "888-999-000",
        imageUrl: "/path-to-image-13.png"
    }
];


export const menuItems: MenuItem[] = [
    { label: 'Cán bộ', href: '/can-bo' },
    { label: 'Học viên Thạc sĩ', href: '/hoc-vien-thac-si' },
    { label: 'Học viên tiến sĩ', href: '/hoc-vien-tien-si' },
    { label: 'CTV NC', href: '/ctv-nc' },
    { label: 'NCV sau TS', href: '/ncv-sau-ts' },
    { label: 'Cựu SV', href: '/cuu-sv' },
];
