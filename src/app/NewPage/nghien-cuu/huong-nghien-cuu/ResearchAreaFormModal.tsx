import React, { useState, useEffect } from 'react';

interface ResearchArea {
    name: string;
    description?: string;
}

interface ResearchAreaFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (area: ResearchArea) => void;
    initialData?: ResearchArea;
}

const ResearchAreaFormModal: React.FC<ResearchAreaFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setDescription(initialData.description || '');
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!name) {
            alert('Please provide a name for the research area.');
            return;
        }

        const updatedArea: ResearchArea = {
            name,
            description,
        };

        onSubmit(updatedArea);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Research Area' : 'Add Research Area'}</h3>

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
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        {initialData ? 'Save Changes' : 'Add Research Area'}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResearchAreaFormModal;
