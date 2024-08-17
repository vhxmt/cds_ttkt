import Image from "next/image";

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
            <section className="relative z-20 p-8">
                <div className="text-center pt-5">
                    <h2 className="text-green-800 text-2xl font-bold mb-5">HỢP TÁC TRONG NƯỚC</h2>
                    <div className="w-full flex flex-wrap justify-center gap-4 bg-white p-4 rounded-lg shadow-md">
                        {/* Các liên kết hình ảnh */}
                        {[
                            {
                                href: "http://www.vicem.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/BUTSON.png/e13f345d-397d-4ed8-99ae-d9f290435d16?t=1552292587000",
                                alt: "Vichem"
                            },
                            {
                                href: "https://www.coma.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/coma.png/d22b5c6c-f7de-40fd-8767-67b357628aba?t=1552292593000",
                                alt: "Coma"
                            },
                            {
                                href: "https://www.evn.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/evn.png/f5bc9975-6405-4d8d-8480-270e9ff83536?t=1552292596000",
                                alt: "EVN"
                            },
                            {
                                href: "https://www.npt.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/evn1.png/8368dae3-145a-4600-8f13-a7772f1efb3d?t=1552292600000",
                                alt: "NPT"
                            },
                            {
                                href: "https://ptc1.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/evnnpt.png/5b1dfa26-cd94-474d-8a2d-6ae028a9086c?t=1552292603000",
                                alt: "PTC1"
                            },
                            {
                                href: "https://gelex.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/gelex.png/031603fa-d216-45a1-a886-83c806310c62?t=1552292606000",
                                alt: "Gelex"
                            },
                            {
                                href: "https://vinapaco.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/GIAY.png/6117a996-28de-4af7-97b9-60108586f270?t=1552292610000",
                                alt: "Vinapaco"
                            },
                            {
                                href: "https://licogi.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/Licogi.png/ea10b74b-aba5-4dd0-8cb0-ed70fc4f7a7c?t=1552292614000",
                                alt: "Licogi"
                            },
                            {
                                href: "https://www.lilama.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/lilama.png/50a5ec25-80c8-4110-89d5-67605a56db9a?t=1552292620000",
                                alt: "Lilama"
                            },
                            {
                                href: "https://www.petrolimex.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/petro.png/9cd74b49-4721-4c50-8e50-db312893d87e?t=1552292628000",
                                alt: "Petrolimex"
                            },
                            {
                                href: "https://ppc.evn.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/ppc.png/4e5847d0-2ae2-47d4-8406-f4f80054f0ea?t=1552292632000",
                                alt: "PPC"
                            },
                            {
                                href: "https://www.songda.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/sdl.png/c5e959c2-baf4-4aa0-a64a-b21cfc413834?t=1552292637000",
                                alt: "Song Da"
                            },
                            {
                                href: "https://tcvn.gov.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/TONGCUC.png/9456b0b8-b636-4689-b960-27e1721b190e?t=1552292642000",
                                alt: "TCVN"
                            },
                            {
                                href: "https://www.vinachem.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/vinachem.png/f23614b1-be19-4509-a0f9-d45651a8ab8c?t=1552292648000",
                                alt: "Vinachem"
                            },
                            {
                                href: "https://vmi.gov.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/VMI.png/a001390f-2631-48c3-a330-57930e491497?t=1552292653000",
                                alt: "VMI"
                            }
                        ].map((item, index) => (
                            <div key={index} className="w-1/8 p-2 flex justify-center items-center">
                                <a className="contentImg" href={item.href} target="_blank" rel="noopener noreferrer">
                                    <img src={item.src} className="h-16 object-contain" alt={item.alt} />
                                </a>
                            </div>
                        ))}
                    </div>
                    <div className="mb-5">&nbsp;</div>
                </div>
            </section>

            <section className="relative z-20 p-8">
                <div className="text-center pt-5">
                    <h2 className="text-green-800 text-2xl font-bold mb-5">HỢP TÁC QUỐC TẾ</h2>
                    <div className="w-full flex flex-wrap justify-center gap-4 bg-white p-4 rounded-lg shadow-md">
                        {/* Các liên kết hình ảnh */}
                        {[
                            {
                                href: "https://www.omron.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/1.png/e6b2359b-9468-44e1-bad3-706018562529?t=1552316477865",
                                alt: "Omron"
                            },
                            {
                                href: "http://www.siemens.com.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/2.jpg/83b4df30-5674-4e2f-8091-a140deeceb47?t=1552316483751",
                                alt: "Siemens"
                            },
                            {
                                href: "https://www.ti.com/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/3.png/c183c1e0-7335-4bb6-9216-c26727627f4c?t=1552316492817",
                                alt: "TI"
                            },
                            {
                                href: "http://abb.net.vn/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/4.jpg/b8cfdc3c-90dc-408f-a1bc-a2d42bdcb3d0?t=1552316498082",
                                alt: "ABB"
                            },
                            {
                                href: "https://www.textronic.com/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/5.png/1a48786e-d2ca-4110-b33f-ed729b345f53?t=1552316502849",
                                alt: "Textronic"
                            },
                            {
                                href: "http://www.ni.com/en-us.html",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/6.png/8d4fb62a-4bb3-4189-b4d2-5f58a1fb13cf?t=1552316507060",
                                alt: "NI"
                            },
                            {
                                href: "https://www.alstom.com/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/7.jpg/522a9243-777d-4235-8ba0-8cbef2e4aabf?t=1552316512017",
                                alt: "Alstom"
                            },
                            {
                                href: "https://demosee.hust.edu.vn/bieu-mau-can-bo",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/8.png/753e7442-0a0d-4eb2-aa75-a351b76f399a?t=1552316516757",
                                alt: "Demo See"
                            },
                            {
                                href: "https://www.schneider-electric.com.vn/vi/",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/9.jpg/90e7361d-646f-40b9-a7bf-8bb84e733ca4?t=1552316520850",
                                alt: "Schneider"
                            },
                            {
                                href: "https://www.lg.com/vn",
                                src: "https://seee.hust.edu.vn//documents/86526/100184/10.jpg/1d041f4d-8f2b-48f0-87e4-6caffb2d6091?t=1552316525345",
                                alt: "LG"
                            }
                        ].map((item, index) => (
                            <div key={index} className="w-1/10 p-2 flex justify-center items-center">
                                <a className="contentImg" href={item.href} target="_blank" rel="noopener noreferrer">
                                    <img src={item.src} className="h-16 object-contain" alt={item.alt} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
