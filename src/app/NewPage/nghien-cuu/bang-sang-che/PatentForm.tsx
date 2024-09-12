import { useState, useEffect } from 'react';

interface PatentFormProps {
    initialData?: Patent | null; // Data for editing, or null for adding a new patent
    onSubmit: (patent: Patent) => void; // Function to handle form submission
    onClose: () => void; // Function to close the form
}

export interface Patent {
    stt: number;
    author: string;
    type: string;
    title: string;
    submissionDate?: string;
    submissionYear?: string;
    applicationNumber?: string;
    grantYear?: string;
    grantDate?: string;
    grantNumber?: string;
    decisionNumber?: string;
    unit?: string;
}

export default function PatentForm({ initialData, onSubmit, onClose }: PatentFormProps) {
    const [formData, setFormData] = useState<Patent>({
        stt: initialData?.stt || 0,
        author: initialData?.author || '',
        type: initialData?.type || '',
        title: initialData?.title || '',
        submissionDate: initialData?.submissionDate || '',
        submissionYear: initialData?.submissionYear || '',
        applicationNumber: initialData?.applicationNumber || '',
        grantYear: initialData?.grantYear || '',
        grantDate: initialData?.grantDate || '',
        grantNumber: initialData?.grantNumber || '',
        decisionNumber: initialData?.decisionNumber || '',
        unit: initialData?.unit || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData); // Submit the form data
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-xl mb-4">{initialData ? 'Sửa bằng sáng chế' : 'Thêm bằng sáng chế mới'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Mandatory fields */}
                    <div className="mb-4">
                        <label className="block mb-1">Tên tác giả</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Loại</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    {/* Optional fields */}
                    <div className="mb-4">
                        <label className="block mb-1">Ngày nộp</label>
                        <input
                            type="text"
                            name="submissionDate"
                            value={formData.submissionDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Năm nộp</label>
                        <input
                            type="text"
                            name="submissionYear"
                            value={formData.submissionYear}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Số nhận đơn</label>
                        <input
                            type="text"
                            name="applicationNumber"
                            value={formData.applicationNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Năm cấp bằng độc quyền</label>
                        <input
                            type="text"
                            name="grantYear"
                            value={formData.grantYear}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Ngày cấp văn bằng</label>
                        <input
                            type="text"
                            name="grantDate"
                            value={formData.grantDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Số văn bằng</label>
                        <input
                            type="text"
                            name="grantNumber"
                            value={formData.grantNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Số QĐ cấp</label>
                        <input
                            type="text"
                            name="decisionNumber"
                            value={formData.decisionNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Đơn vị</label>
                        <input
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Submit and Cancel buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded"
                            onClick={onClose}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            {initialData ? 'Cập nhật' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
