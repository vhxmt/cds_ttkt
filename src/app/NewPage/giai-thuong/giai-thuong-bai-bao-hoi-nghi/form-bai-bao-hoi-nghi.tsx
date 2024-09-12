// src/app/NewPage/giai-thuong/giai-thuong-bai-bao-hoi-nghi/form-bai-bao-hoi-nghi.tsx
'use client';
import { useState, useEffect } from 'react';

export interface Award {
    stt?: number; // Make optional for new awards
    recipients: string;
    award: string;
    organization: string;
    year: string;
    achievement: string;
}

interface AwardFormProps {
    award?: Award | null;
    onSubmit: (award: Award) => void;
    onClose: () => void;
}

export default function AwardForm({ award, onSubmit, onClose }: AwardFormProps) {
    const [formData, setFormData] = useState<Award>({
        stt: award?.stt || undefined,
        recipients: award?.recipients || '',
        award: award?.award || '',
        organization: award?.organization || '',
        year: award?.year || '',
        achievement: award?.achievement || '',
    });

    useEffect(() => {
        if (award) {
            setFormData({
                stt: award.stt,
                recipients: award.recipients,
                award: award.award,
                organization: award.organization,
                year: award.year,
                achievement: award.achievement,
            });
        }
    }, [award]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    {formData.stt ? 'Sửa giải thưởng' : 'Thêm giải thưởng'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="recipients" className="mb-1 font-medium">Người nhận giải</label>
                            <input
                                type="text"
                                id="recipients"
                                name="recipients"
                                value={formData.recipients}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="award" className="mb-1 font-medium">Giải thưởng</label>
                            <input
                                type="text"
                                id="award"
                                name="award"
                                value={formData.award}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="organization" className="mb-1 font-medium">Tổ chức</label>
                            <input
                                type="text"
                                id="organization"
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="year" className="mb-1 font-medium">Năm</label>
                            <input
                                type="text"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="border rounded p-2"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="achievement" className="mb-1 font-medium">Thành tích</label>
                            <textarea
                                id="achievement"
                                name="achievement"
                                value={formData.achievement}
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
