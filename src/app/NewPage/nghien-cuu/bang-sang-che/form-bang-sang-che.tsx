// src/app/NewPage/nghien-cuu/bang-sang-che/form-bang-sang-che.tsx
'use client';
import { useState, useEffect } from 'react';

export interface Patent {
    stt?: number; // Make optional for new patents
    author: string;
    type: string;
    title: string;
    submissionDate: string;
    submissionYear: string;
    applicationNumber: string;
    grantYear: string;
    grantDate: string;
    grantNumber: string;
    decisionNumber: string;
    unit: string;
}

interface PatentFormProps {
    patent?: Patent | null;
    onSubmit: (patent: Patent) => void;
    onClose: () => void;
}

export default function PatentForm({ patent, onSubmit, onClose }: PatentFormProps) {
    const [formData, setFormData] = useState<Patent>({
        stt: patent?.stt || undefined,
        author: patent?.author || '',
        type: patent?.type || '',
        title: patent?.title || '',
        submissionDate: patent?.submissionDate || '',
        submissionYear: patent?.submissionYear || '',
        applicationNumber: patent?.applicationNumber || '',
        grantYear: patent?.grantYear || '',
        grantDate: patent?.grantDate || '',
        grantNumber: patent?.grantNumber || '',
        decisionNumber: patent?.decisionNumber || '',
        unit: patent?.unit || ''
    });

    useEffect(() => {
        if (patent) {
            setFormData({
                stt: patent.stt,
                author: patent.author,
                type: patent.type,
                title: patent.title,
                submissionDate: patent.submissionDate,
                submissionYear: patent.submissionYear,
                applicationNumber: patent.applicationNumber,
                grantYear: patent.grantYear,
                grantDate: patent.grantDate,
                grantNumber: patent.grantNumber,
                decisionNumber: patent.decisionNumber,
                unit: patent.unit
            });
        }
    }, [patent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full h-[80vh] overflow-auto">
                <h2 className="text-2xl font-semibold mb-4">
                    {formData.stt ? 'Sửa bằng sáng chế' : 'Thêm bằng sáng chế'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="author" className="mb-1 font-medium">Họ và tên tác giả</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="type" className="mb-1 font-medium">SC/GPHI</label>
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="title" className="mb-1 font-medium">Tên SC/GPHI</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="submissionDate" className="mb-1 font-medium">Ngày nộp</label>
                            <input
                                type="date"
                                id="submissionDate"
                                name="submissionDate"
                                value={formData.submissionDate}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="submissionYear" className="mb-1 font-medium">Năm nộp</label>
                            <input
                                type="text"
                                id="submissionYear"
                                name="submissionYear"
                                value={formData.submissionYear}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="applicationNumber" className="mb-1 font-medium">Số nhận đơn</label>
                            <input
                                type="text"
                                id="applicationNumber"
                                name="applicationNumber"
                                value={formData.applicationNumber}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="grantYear" className="mb-1 font-medium">Năm cấp bằng độc quyền</label>
                            <input
                                type="text"
                                id="grantYear"
                                name="grantYear"
                                value={formData.grantYear}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="grantDate" className="mb-1 font-medium">Ngày cấp văn bằng</label>
                            <input
                                type="date"
                                id="grantDate"
                                name="grantDate"
                                value={formData.grantDate}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="grantNumber" className="mb-1 font-medium">Số văn bằng</label>
                            <input
                                type="text"
                                id="grantNumber"
                                name="grantNumber"
                                value={formData.grantNumber}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="decisionNumber" className="mb-1 font-medium">Số QĐ cấp</label>
                            <input
                                type="text"
                                id="decisionNumber"
                                name="decisionNumber"
                                value={formData.decisionNumber}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="unit" className="mb-1 font-medium">Đơn vị</label>
                            <input
                                type="text"
                                id="unit"
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
