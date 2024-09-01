import Image from 'next/image';
import {contactInfo} from "@/data/lien-he/thong-tin-lien-he";
import Breadcrumb from "@/components/breadcrumb";
import SideMenu from "@/components/display-block/SideMenu";


export default function ThongTinLienHe() {
    return (
        <div className="max-w-6xl mx-auto p-4 mt-6">
            {/* Container chính */}
            <Breadcrumb />
            <div className="flex space-x-4">
                {/* Side Menu */}
                <SideMenu currentSection="Liên hệ" />


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
                            {contactInfo.schoolName}
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Địa chỉ liên hệ:</p>
                            <p>{contactInfo.address}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Điện thoại:</p>
                            <p>{contactInfo.phone}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Thời gian liên hệ:</p>
                            <p>{contactInfo.officeHours}</p>
                        </div>
                        <div className="text-lg text-gray-700 mb-4">
                            <p className="font-semibold">Email:</p>
                            <p><a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">{contactInfo.email}</a></p>
                        </div>
                        <div className="text-lg text-gray-700">
                            <p className="font-semibold">Facebook page:</p>
                            <p><a href={contactInfo.facebookPage} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{contactInfo.facebookPage}</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}