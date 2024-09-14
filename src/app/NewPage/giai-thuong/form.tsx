import React, { useState, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (award: Award) => void;
    initialData?: Award;
}

interface Award {
    id: string;
    recipients: string;
    award: string;
    organization: string;
    year: number;
    achievement: string;
}

export default function Modal({ isOpen, onClose, onSubmit, initialData }: ModalProps) {
    const [recipients, setRecipients] = useState('');
    const [award, setAward] = useState('');
    const [organization, setOrganization] = useState('');
    const [year, setYear] = useState(2023);
    const [achievement, setAchievement] = useState('');

    // When `initialData` changes (e.g., for editing), update the form fields
    useEffect(() => {
        if (initialData) {
            setRecipients(initialData.recipients);
            setAward(initialData.award);
            setOrganization(initialData.organization);
            setYear(initialData.year);
            setAchievement(initialData.achievement);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const awardData: Award = {
            id: initialData?.id || '',
            recipients,
            award,
            organization,
            year,
            achievement
        };
        onSubmit(awardData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Award' : 'Add Award'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Recipients</label>
                        <input
                            type="text"
                            value={recipients}
                            onChange={(e) => setRecipients(e.target.value)}
                            className="mt-1 block w-full border border-black rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Award</label>
                        <input
                            type="text"
                            value={award}
                            onChange={(e) => setAward(e.target.value)}
                            className="mt-1 block w-full border border-black rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Organization</label>
                        <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            className="mt-1 block w-full border border-black rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="mt-1 block w-full border border-black rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Achievement</label>
                        <textarea
                            value={achievement}
                            onChange={(e) => setAchievement(e.target.value)}
                            className="mt-1 block w-full border border-black rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {initialData ? 'Update' : 'Add'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
