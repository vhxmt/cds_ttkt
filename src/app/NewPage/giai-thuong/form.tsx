import React, { useState, useEffect } from 'react';
import { Award } from '@/interfaces/giai-thuong/interface';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (award: Award) => void;
    initialData?: Award;
}

export default function Modal({ isOpen, onClose, onSubmit, initialData }: ModalProps) {
    const [author, setAuthor] = useState(''); // Updated variable name to match `Award` interface
    const [title, setTitle] = useState(''); // Updated variable name to match `Award` interface
    const [organization, setOrganization] = useState('');
    const [year, setYear] = useState(2023);
    const [description, setDescription] = useState(''); // Updated variable name to match `Award` interface

    // When `initialData` changes (e.g., for editing), update the form fields
    useEffect(() => {
        if (initialData) {
            setAuthor(initialData.author); // Set initial value for `author`
            setTitle(initialData.title); // Set initial value for `title`
            setOrganization(initialData.organization);
            setYear(initialData.year);
            setDescription(initialData.description); // Set initial value for `description`
        } else {
            // Clear form when there's no initial data (e.g., for adding a new award)
            setAuthor('');
            setTitle('');
            setOrganization('');
            setYear(2023);
            setDescription('');
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const awardData: Award = {
            id: initialData?.id || '',
            author, // Use state variable for `author`
            title, // Use state variable for `title`
            organization,
            year,
            description // Use state variable for `description`
        };
        onSubmit(awardData); // Pass the correct `Award` object
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Award' : 'Add Award'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            value={author} // Use state variable for `author`
                            onChange={(e) => setAuthor(e.target.value)}
                            className="mt-1 block w-full border border-black rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title} // Use state variable for `title`
                            onChange={(e) => setTitle(e.target.value)}
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
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description} // Use state variable for `description`
                            onChange={(e) => setDescription(e.target.value)}
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
