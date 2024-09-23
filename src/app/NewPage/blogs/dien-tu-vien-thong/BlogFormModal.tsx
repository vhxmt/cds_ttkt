import React, { useState, useEffect } from 'react';
import { mainData } from '@/interfaces/blogs/interface';

interface BlogFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: mainData) => void;
    initialData?: mainData;
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [href, setHref] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | undefined>(''); // Image URL after upload

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDate(initialData.date || '');
            setDescription(initialData.description || '');
            setHref(initialData.href || '');
            setImgSrc(initialData.imageUrl);
        } else {
            setTitle('');
            setDate('');
            setDescription('');
            setHref('');
            setImgSrc('');
        }
    }, [initialData]);

    // Handle file selection (do not upload immediately)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    // Handle form submission (upload file and save form data)
    const handleSubmit = async () => {
        if (!title) {
            alert('Please provide at least a title.');
            return;
        }

        let updatedImgSrc = imgSrc;

        // Upload the file if a new one is selected
        if (file) {
            setIsUploading(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('folderPath', 'image/blogs/dien-tu-vien-thong'); // Universal path

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    updatedImgSrc = data.filePath; // Get new image URL
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

        const newPost: mainData = {
            id: initialData?.id || '', // ID is present for editing
            title,
            date: date || new Date().toLocaleDateString(),
            description,
            imageUrl: updatedImgSrc, // Use uploaded image or existing image
            href,
        };

        onSubmit(newPost);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Blog Post' : 'Add Blog Post'}</h3>

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
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md h-24"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input type="file" onChange={handleFileChange} className="mt-1 block w-full" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Link URL</label>
                    <input
                        type="text"
                        value={href}
                        onChange={(e) => setHref(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : initialData ? 'Save Changes' : 'Add Post'}
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

export default BlogFormModal;