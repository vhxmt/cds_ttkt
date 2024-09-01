// src/data/nghien-cuu/du-an/data.ts

export interface Project {
    duration: string;
    title: string;
    details: string[];
}

export const projects: Project[] = [
    {
        duration: "2022.12 ~ 2024.06",
        title: "Phát triển thuật toán điều khiển không cảm biến cho SPMSM",
        details: [
            "Nhà tài trợ: LCTEK Co.",
            "Xếp loại dự án: Cấp cơ sở",
            "Đơn vị chủ trì: Đại học Bách khoa Hà Nội"
        ]
    },
    {
        duration: "2022.06 ~ 2025.02",
        title: "Phòng thí nghiệm nghiên cứu cơ bản về hệ thống năng lượng tích hợp của tàu điện chạy bằng pin nhiên liệu",
        details: [
            "Nhà tài trợ: Quỹ nghiên cứu quốc gia Việt Nam (NRF)",
            "Xếp loại dự án: Cấp quốc gia",
            "Đơn vị chủ trì: Đại học Bách khoa Hà Nội"
        ]
    },
    {
        duration: "2021.03 ~ 2024.02",
        title: "Công nghệ đối với việc chuyển đổi năng lượng và quản lý năng lượng cho các lưới điện siêu nhỏ thân thiện với môi trường tại các cảng biển trong tương lai",
        details: [
            "Nhà tài trợ: Quỹ nghiên cứu quốc gia Việt Nam (NRF)",
            "Xếp loại dự án: Cấp cơ sở",
            "Đơn vị chủ trì: Đại học Bách khoa Hà Nội"
        ]
    }
];
