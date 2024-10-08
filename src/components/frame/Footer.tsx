//src/components/frame/Footer.tsx
import data from '@/data/frame/dataFooter.json';

const Footer = () => {
  // Assuming contactInfo has at least one item, access the first item
  const contact = data.contactInfo[0];

  return (
    <footer className="bg-red-800 text-white p-6">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-bold text-lg">{contact.name}</h3>
          <p className="mt-2">
            <span className="flex items-center">
              <i className="fas fa-phone mr-2"></i>
              {contact.phone}
            </span>
            <span className="flex items-center mt-2">
              <i className="fas fa-envelope mr-2"></i>
              {contact.email}
            </span>
            <span className="flex items-center mt-2">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {contact.address}
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
        <p>{contact.office}</p>
      </div>
    </footer>
  );
};

export default Footer;
