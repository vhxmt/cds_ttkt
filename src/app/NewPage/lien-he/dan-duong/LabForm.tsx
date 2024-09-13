// src/app/NewPage/lien-he/dan-duong/LabForm.tsx
import { useState } from 'react';

interface LabFormProps {
    initialData?: Lab;
    onSubmit: (lab: Lab) => void;
    onCancel: () => void;
}

export interface Lab {
    id: string;
    name: string;
    location: string;
    leader: string;
    contactInfo: string;
    postalCode: string;
}

export default function LabForm({ initialData, onSubmit, onCancel }: LabFormProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [leader, setLeader] = useState(initialData?.leader || '');
    const [contactInfo, setContactInfo] = useState(initialData?.contactInfo || '');
    const [postalCode, setPostalCode] = useState(initialData?.postalCode || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLab = {
            id: initialData?.id || `${Date.now()}`, // Generate ID if adding new lab
            name,
            location,
            leader,
            contactInfo,
            postalCode,
        };
        onSubmit(newLab);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                    {initialData ? 'Edit Lab' : 'Add Lab'}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Leader</label>
                        <input
                            type="text"
                            value={leader}
                            onChange={(e) => setLeader(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Contact Info</label>
                        <input
                            type="text"
                            value={contactInfo}
                            onChange={(e) => setContactInfo(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {initialData ? 'Update' : 'Add Lab'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
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
