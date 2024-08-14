import Image from 'next/image';

export default function ThongTinLienHe() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Container chính */}
            <div className="flex space-x-4">
                {/* Container chứa dòng chữ */}
                <div className="flex-none w-1/3">
                    <div className="text-[#BD1E1E] text-l mb-4 font-inter font-bold text-[14px] text-[#BD1E1E]">
                        Trang chủ &gt;&gt; Liên hệ &gt;&gt; <a href="/lien-he/thong-tin-lien-he" className="text-[#BD1E1E] underline">Thông tin liên hệ</a>
                    </div>
                    <div className="text-red-600 text-l mb-4 font-inter font-bold text-[14px] text-[#BD1E1E]">
                        <a href="/lien-he/thong-tin-lien-he" className="text-[#BD1E1E] underline">Thông tin liên hệ</a>
                    </div>
                    <div className="text-red-600 text-l mb-4 font-inter font-bold text-[14px] text-[#BD1E1E]">
                        <a href="/lien-he/dan-duong" className="text-[#BD1E1E]"> Dẫn đường</a>
                    </div>
                </div>


                {/* Container chứa banner và hai ô */}
                <div className="flex-1">
                    {/* Ảnh banner */}
                    <div className="mb-4">
                        <Image
                            src="/ảnh trường.png" // Đổi thành đường dẫn đến ảnh banner của bạn
                            alt="Banner"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="text-xl font-semibold mb-4 text-gray-800 text-center">
                            Trường Điện - Điện tử
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Địa chỉ liên hệ:</p>
                            <p>Phòng E.605 - Tầng 6 - Tòa nhà C7 - Đại học Bách Khoa Hà Nội, số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Điện thoại:</p>
                            <p>(+8424) 38694957 hoặc 38696211</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Thời gian liên hệ:</p>
                            <p>8h30 - 21h00</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Email:</p>
                            <p><a href="mailto:seee-office@hust.edu.vn" className="text-blue-600 hover:underline">seee-office@hust.edu.vn</a></p>
                        </div>
                        <div className="text-lg text-gray-700">
                            <p className="font-semibold">Facebook page:</p>
                            <p><a href="https://www.facebook.com/seee.hust" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.facebook.com/seee.hust</a></p>
                        </div>
                    </div>




                </div>
            </div>
        </div>
    );
}