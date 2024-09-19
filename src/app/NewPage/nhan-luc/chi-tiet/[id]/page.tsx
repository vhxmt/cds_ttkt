import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/breadcrumb';
import SideMenu from "@/components/display-block/SideMenu";
interface ProfileData {
    id: string;
    image: string;
    ho_ten: string;
    nam_sinh: number;
    gioi_tinh: string;
    trinh_do_dao_tao: {
        trinh_do: string;
        nam: number;
        noi_cap_bang: string;
    };
    chuc_danh: {
        ten: string;
        nam_bo_nhiem: number;
    };
    nganh_chuyen_nganh: {
        nganh: string;
        chuyen_nganh: string;
    };
    chuc_vu_hien_tai: {
        chuc_vu: string;
        don_vi_cong_tac: string;
    };
    chuc_vu_cao_nhat: {
        chuc_vu: string;
        thanh_vien_hoi_dong: {
            ten_hoi_dong: string;
            cac_nam_tham_gia: number[];
            co_so_dao_tao: string;
            hoi_dong: {
                nam: number;
                nganh: string;
            }[];
        };
    };
    bai_bao_khoa_hoc: {
        bai_bao_tap_chi: {
            ten_bai: string;
            tac_gia: string;
            tap_chi: string;
            so: string;
            thang: string;
            doi: string;
            phan_loai: string;
            impact_factor?: number;
        }[];
        bai_bao_hoi_thao_quoc_te: {
            ten_bai: string;
            tac_gia: string;
            hoi_thao: string;
            thang: string;
            dia_diem: string;
            doi: string;
        }[];
    };
}

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), 'src/data/nhan-luc/can-bo/data-chi-tiet.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileData);

    const paths = Object.keys(data).map(id => ({ params: { id } }));

    return paths;
}

const ProfilePage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const filePath = path.join(process.cwd(), 'src/data/nhan-luc/can-bo/data-chi-tiet.json');
    const fileData = fs.readFileSync(filePath, 'utf8');
    const data: { [key: string]: ProfileData } = JSON.parse(fileData);

    const profile = data[id] || null;

    if (!profile) {
        notFound();
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <SideMenu currentSection="Nhân lực" />
                <div className="relative max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
                    <img
                        src={`${profile.image}`} // Đảm bảo ảnh được lưu tại đúng đường dẫn
                        alt={`${profile.ho_ten}`}
                        className="absolute top-6 right-6 w-40 h-40 mr-6  rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{profile.ho_ten}</h1>

                    <div className="mb-6">
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Năm sinh:</strong> {profile.nam_sinh}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Giới tính:</strong> {profile.gioi_tinh}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">Trình độ đào tạo</h2>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Trình độ:</strong> {profile.trinh_do_dao_tao.trinh_do}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Năm cấp bằng:</strong> {profile.trinh_do_dao_tao.nam}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Nơi cấp bằng:</strong> {profile.trinh_do_dao_tao.noi_cap_bang}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">Chức danh</h2>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Chức danh:</strong> {profile.chuc_danh.ten}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Năm bổ nhiệm:</strong> {profile.chuc_danh.nam_bo_nhiem}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">Ngành - Chuyên ngành</h2>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Ngành:</strong> {profile.nganh_chuyen_nganh.nganh}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Chuyên ngành:</strong> {profile.nganh_chuyen_nganh.chuyen_nganh}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">Chức vụ hiện tại</h2>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Chức vụ:</strong> {profile.chuc_vu_hien_tai.chuc_vu}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Đơn vị công tác:</strong> {profile.chuc_vu_hien_tai.don_vi_cong_tac}</p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">Chức vụ cao nhất</h2>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Chức vụ:</strong> {profile.chuc_vu_cao_nhat.chuc_vu}</p>
                        <h3 className="text-lg font-semibold text-blue-500">Thành viên Hội đồng:</h3>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Hội đồng:</strong> {profile.chuc_vu_cao_nhat.thanh_vien_hoi_dong.ten_hoi_dong}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Các năm tham gia:</strong> {profile.chuc_vu_cao_nhat.thanh_vien_hoi_dong.cac_nam_tham_gia.join(', ')}</p>
                        <p className="text-lg text-gray-600"><strong className="text-gray-800">Cơ sở đào tạo:</strong> {profile.chuc_vu_cao_nhat.thanh_vien_hoi_dong.co_so_dao_tao}</p>

                        <ul className="list-disc ml-6">
                            {profile.chuc_vu_cao_nhat.thanh_vien_hoi_dong.hoi_dong.map((hoiDong, index) => (
                                <li key={index} className="mb-4">
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Năm:</strong> {hoiDong.nam}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Ngành:</strong> {hoiDong.nganh}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">Bài báo khoa học</h2>
                        <h3 className="text-lg font-semibold text-blue-500">Bài báo tạp chí</h3>
                        <ul className="list-disc ml-6">
                            {profile.bai_bao_khoa_hoc.bai_bao_tap_chi.map((baiBao, index) => (
                                <li key={index} className="mb-4">
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Tên bài:</strong> {baiBao.ten_bai}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Tác giả:</strong> {baiBao.tac_gia}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Tạp chí:</strong> {baiBao.tap_chi}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Số:</strong> {baiBao.so}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Tháng:</strong> {baiBao.thang}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">DOI:</strong> {baiBao.doi}</p>
                                </li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-semibold text-blue-500">Bài báo hội nghị</h3>
                        <ul className="list-disc ml-6">
                            {profile.bai_bao_khoa_hoc.bai_bao_hoi_thao_quoc_te.map((baiBao, index) => (
                                <li key={index} className="mb-4">
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Tên bài:</strong> {baiBao.ten_bai}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Tác giả:</strong> {baiBao.tac_gia}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Hội nghị:</strong> {baiBao.hoi_thao}</p>
                                    <p className="text-lg text-gray-600"><strong className="text-gray-800">Tháng:</strong> {baiBao.thang}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
