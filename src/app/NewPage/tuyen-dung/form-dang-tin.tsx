import React, { useState } from 'react';

interface Position {
    id?: string;
    title: string;
    description: string;
    requirements: string; // Store requirements as a single string
}

interface FormDangTinProps {
    position: Position | null; // If null, we're adding a new position
    closeModal: () => void;
    updateRecruitmentData: (newData: any) => void;
}

const FormDangTin: React.FC<FormDangTinProps> = ({ position, closeModal, updateRecruitmentData }) => {
    const [formData, setFormData] = useState<Position>({
        id: position?.id || '',
        title: position?.title || '',
        description: position?.description || '',
        requirements: position?.requirements || '', // Treat as a single string
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = position ? 'PUT' : 'POST'; // Use PUT if editing, POST if creating
        const endpoint = `/api/tuyen-dung${position ? `?id=${position.id}` : ''}`;

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send the requirements as a single string
            });

            if (response.ok) {
                const updatedData = await response.json();
                updateRecruitmentData(updatedData); // Update the data after successful submission
                closeModal(); // Close the modal after submission
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold mb-4">{position ? 'Chỉnh sửa tin' : 'Đăng tin tuyển dụng mới'}</h2>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Yêu cầu</label>
                        <textarea
                            name="requirements"
                            value={formData.requirements} // Preserve line breaks
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            rows={5} // Allows multi-line input for requirements
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {position ? 'Cập nhật tin' : 'Đăng tin'}
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormDangTin;
