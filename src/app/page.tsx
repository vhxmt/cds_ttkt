import Image from "next/image";
import CooperationSection from "@/components/frame/CooperationSection";
import { domesticCooperation, internationalCooperation } from "@/data/cooperations";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-gray-100 dark:bg-white">
            <div className="relative w-full h-[400px] overflow-hidden">
                <Image
                    src="/banner.png" // Đặt đường dẫn đến hình ảnh banner của bạn
                    alt="Banner Image"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                />
            </div>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    CHÀO MỪNG ĐẾN VỚI PHÒNG THÍ NGHIỆM TRƯỜNG ĐIỆN - ĐIỆN TỬ
                </h1>
                <p className="mb-4">
                    Trường Điện – Điện tử là đơn vị cấp 2 thuộc ĐHBKHN và là đơn vị đào tạo và nghiên cứu nòng cốt trong
                    lĩnh vực Điện – Điện tử, có tính tự chủ cao thuộc ĐHBKHN, có chức năng chính là đào tạo cấp bằng,
                    NCKH và chuyển giao tri thức trong lĩnh vực chuyên môn Điện – Điện tử, kỹ thuật đa phương tiện.
                </p>
                <h2 className="text-xl font-semibold mb-2">Mục tiêu chiến lược của Trường Điện – Điện tử là thành:</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>
                        Đơn vị đào tạo nguồn nhân lực trình độ cao cho ngành Điện, ĐT-VT với định hướng tích hợp, liên
                        ngành Điện, ĐT-VT, đáp ứng các yêu cầu nhân lực xã hội cũng như của thị trường lao động.
                    </li>
                    <li>
                        Đơn vị nghiên cứu, phát triển và ứng dụng công nghệ liên ngành Điện, ĐT-VT có uy tín ở trong
                        nước cũng như khu vực và thế giới;
                    </li>
                    <li>
                        Địa chỉ đầu tư, hợp tác và CGCN hấp dẫn, tin cậy đối với các tổ chức, các doanh nghiệp trong
                        nước và quốc tế;
                    </li>
                    <li>
                        Đơn vị đóng vai trò quan trọng vào quá trình phát triển ngành Điện, ĐT-VT Việt Nam, góp phần
                        quan trọng trong sự nghiệp phát triển kinh tế - xã hội, CNH & HĐH đất nước, giữ gìn an ninh,
                        quốc phòng.
                    </li>
                    <li>
                        Là một trong các đơn vị đi đầu, đóng góp tích cực vào sự phát triển chung theo chiến lược phát
                        triển của ĐHBKHN.
                    </li>
                </ul>
            </div>
            <CooperationSection 
                title={domesticCooperation.title} 
                items={domesticCooperation.items} 
            />

            {/* International Cooperation Section */}
            <CooperationSection 
                title={internationalCooperation.title} 
                items={internationalCooperation.items} 
            />

        </main>
    );
}
