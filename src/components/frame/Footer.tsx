import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-800 text-white p-6">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-bold text-lg">SEEE-HUST</h3>
          <p className="mt-2">
            <span className="flex items-center">
              <i className="fas fa-phone mr-2"></i>
              (+8424) 38696211 hoặc 38694957
            </span>
            <span className="flex items-center mt-2">
              <i className="fas fa-envelope mr-2"></i>
              seee-office@hust.edu.vn
            </span>
            <span className="flex items-center mt-2">
              <i className="fas fa-map-marker-alt mr-2"></i>
              Địa chỉ: Phòng E.605 - Tầng 6 - Tòa nhà C7 - Đại học Bách khoa Hà Nội, Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà nội
            </span>
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
          <h3 className="font-bold text-lg">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="flex justify-center mt-2">
            <a href="#" className="mx-2">
              <i className="fab fa-facebook-f text-blue-500"></i>
            </a>
            <a href="#" className="mx-2">
              <i className="fab fa-twitter text-blue-300"></i>
            </a>
            <a href="#" className="mx-2">
              <i className="fas fa-envelope text-gray-300"></i>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-bold text-lg">LIÊN KẾT NGOÀI</h3>
          <p className="mt-2">Trang thông tin tuyển sinh Đại học Bách Khoa Hà Nội</p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-6 border-t border-white pt-4">
        <p>Copyright © 2022 - Trường Điện - Điện tử - ĐHBKHN</p>
      </div>
    </footer>
  );
};

export default Footer;
