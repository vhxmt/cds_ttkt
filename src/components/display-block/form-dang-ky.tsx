import { useState } from 'react';

export default function FormDangKy() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        graduation: '',
        currentUnit: '',
        researchDirection: '',
        position: '',
        questions: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý gửi dữ liệu ở đây
        console.log(formData);
        alert('Đơn đăng ký của bạn đã được gửi!');
    };

    return (
        <div className="p-6 space-y-4">
            {/* Thêm các phần văn bản lên đầu form */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Form Đăng Ký Thành Viên</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Trở thành thành viên chính thức của Phòng thí nghiệm
                </p>
                <p className="text-base text-gray-600 mb-4">
                    Bạn cảm thấy hứng thú khi làm việc tại môi trường năng động và đầy tính chuyên môn tại SEEE? Hãy điền vào các thông tin ở phía dưới hoặc nếu có thắc mắc nào hãy liên hệ với chúng tôi để trả lời các câu hỏi hoặc yêu cầu. Chúng tôi luôn sẵn sàng chào đón bạn!
                </p>
            </div>

            {/* Form Đăng Ký */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="name">Họ và tên</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="phone">Số điện thoại</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="graduation">Nơi tốt nghiệp Thạc sĩ, Tiến sĩ (nếu có)</label>
                    <input
                        type="text"
                        id="graduation"
                        name="graduation"
                        value={formData.graduation}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="currentUnit">Đơn vị đang công tác (nếu có)</label>
                    <input
                        type="text"
                        id="currentUnit"
                        name="currentUnit"
                        value={formData.currentUnit}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="researchDirection">Định hướng nghiên cứu</label>
                    <input
                        type="text"
                        id="researchDirection"
                        name="researchDirection"
                        value={formData.researchDirection}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="position">Vị trí đăng ký</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="questions">Câu hỏi thắc mắc?</label>
                    <textarea
                        id="questions"
                        name="questions"
                        value={formData.questions}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={4}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                    Nộp đơn
                </button>
            </form>
        </div>
    );
}
