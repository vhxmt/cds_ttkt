// data.ts
export const eventDetails = {
    title: "Sự kiện đánh giá thường niên",
    date: "Ngày 15,16 tháng 5 năm 2024",
    location: "Đại học Bách khoa Hà Nội, Trường Điện - Điện tử",
    registrationNote: "Hãy lưu lại ngày tổ chức hội nghị vào năm 2024! Đăng ký sẽ mở vào 1 ngày sau.",
};

export const eventInfo = {
    section1: {
        imageSrc: "/su-kien1.png",
        imageAlt: "Thông tin sự kiện 1",
        title: "Thông tin sự kiện",
        details: [
            "Sự kiện kéo dài 2 ngày",
            "Chỉ dành cho nhà tài trợ",
            "250+ người tham dự",
            "Hướng dẫn từ giảng viên SEEE",
            "Tham quan phòng thí nghiệm",
        ],
    },
    section2: {
        imageSrc: "/su-kien2.png",
        imageAlt: "Thông tin sự kiện 2",
        title: "Lợi ích tham gia",
        details: [
            "Môi trường chuyên môn cao",
            "Trao đổi, trò chuyện với sinh viên, giảng viên",
            "Khơi dậy ý tưởng mới",
            "Xây dựng mối quan hệ hợp tác giữa sinh viên và giảng viên",
        ],
    },
};

export const schedule = {
    day1: {
        date: "15/05/2024", // Ngày cụ thể cho ngày 1
        sessions: [
            { time: "09:00 - 10:30", title: "Giới thiệu về nghiên cứu mới", speaker: "GS. Nguyễn Văn A" },
            { time: "11:00 - 12:30", title: "Thảo luận về dự án nghiên cứu", speaker: "TS. Trần Thị B" },
            // Thêm các phiên khác nếu cần
        ],
    },
    day2: {
        date: "16/05/2024", // Ngày cụ thể cho ngày 2
        sessions: [
            { time: "09:00 - 10:30", title: "Workshop về kỹ năng nghiên cứu", speaker: "TS. Lê Văn C" },
            { time: "11:00 - 12:30", title: "Thảo luận về ứng dụng công nghệ mới", speaker: "GS. Nguyễn Thị D" },
            // Thêm các phiên khác nếu cần
        ],
    },
};

