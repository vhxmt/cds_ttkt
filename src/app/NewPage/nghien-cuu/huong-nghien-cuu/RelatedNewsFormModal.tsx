import React, { useState, useEffect } from 'react';

interface RelatedNews {
    id: number;
    title: string;
    description?: string;
    link?: string;
}

interface RelatedNewsFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (news: RelatedNews) => void;
    initialData?: RelatedNews;
}

const RelatedNewsFormModal: React.FC<RelatedNewsFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setLink(initialData.link || '');
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!title) {
            alert('Please provide a title for the related news.');
            return;
        }

        const updatedNews: RelatedNews = {
            id: initialData?.id || Math.random(), // Generate random ID for new news
            title,
            description,
            link,
        };

        onSubmit(updatedNews);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Related News' : 'Add Related News'}</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Link</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        {initialData ? 'Save Changes' : 'Add Related News'}
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

export default RelatedNewsFormModal;
