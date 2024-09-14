import { useState } from 'react';

export default function FormDangKy() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/tuyen-dung/form-dang-ki', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Form submitted successfully:', result);
                alert('Đơn đăng ký của bạn đã được gửi!');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    researchDirection: '',
                    position: '',
                    questions: '',
                });
            } else {
                console.error('Failed to submit form');
                alert('Đã xảy ra lỗi khi gửi đơn đăng ký!');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Đã xảy ra lỗi khi gửi đơn đăng ký!');
        }
    };

    return (
        <div className="p-6 space-y-4">
            {/* Form Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Form Đăng Ký Thành Viên</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Trở thành thành viên chính thức của Phòng thí nghiệm
                </p>
            </div>

            {/* Form */}
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
