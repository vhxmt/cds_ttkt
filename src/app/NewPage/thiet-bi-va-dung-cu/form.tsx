import React, { useState, useEffect } from 'react';

interface Tool {
    id?: string;
    title: string;
    imgSrc?: string;
    description?: string;
}

interface FormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (tool: Tool) => void;
    initialData?: Tool;
    section: string;
}

const ToolFormModal: React.FC<FormProps> = ({ isOpen, onClose, onSubmit, initialData, section }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
        }
    }, [initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!title) {
            alert('Please provide at least a title.');
            return;
        }

        let imgSrc = initialData?.imgSrc || '';

        // Upload the image if a new one is selected
        if (file) {
            setIsUploading(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('folderPath', 'image/thiet-bi-va-dung-cu'); // Universal folder path

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    imgSrc = data.filePath; // Get new image URL
                } else {
                    console.error('Image upload failed:', data.message);
                    return;
                }
            } catch (err) {
                console.error('Upload error:', err);
                return;
            } finally {
                setIsUploading(false);
            }
        }

        const tool: Tool = {
            id: initialData?.id || '',
            title,
            imgSrc,
            description,
        };

        onSubmit(tool);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Tool' : 'Add Tool'} - {section}</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
                    <input type="file" onChange={handleFileChange} className="mt-1 block w-full" />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : initialData ? 'Save Changes' : 'Add Tool'}
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

export default ToolFormModal;
