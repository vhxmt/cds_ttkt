import React, { useState, useEffect } from 'react';

interface CooperationEvent {
    id?: string;
    title: string;
    date: string;
    imageSrc: string;
}

interface CooperationEventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: CooperationEvent) => void;
    initialData?: CooperationEvent | null;
}

const CooperationEventFormModal: React.FC<CooperationEventFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDate(initialData.date);
        } else {
            setTitle('');
            setDate('');
        }
    }, [initialData]);

    // Handle file selection but don't upload immediately
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]); // Store the file for uploading later
        }
    };

    // Handle form submission (file upload happens here)
    const handleSubmit = async () => {
        if (!title) {
            alert('Please provide at least a title.');
            return;
        }

        let updatedImageSrc = initialData?.imageSrc || '';

        if (file) {
            setIsUploading(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('folderPath', 'image/hop-tac/hop-tac-quoc-te'); // Universal path

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    updatedImageSrc = data.filePath; // Get new image URL
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

        const newEvent: CooperationEvent = {
            id: initialData?.id || '',
            title,
            date: date || new Date().toLocaleDateString(),
            imageSrc: updatedImageSrc || '',
        };

        onSubmit(newEvent); // Submit the new event with updated image URL
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Cooperation Event' : 'Add Cooperation Event'}</h3>

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
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <input type="file" onChange={handleFileChange} className="mt-1 block w-full" />
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : initialData ? 'Save Changes' : 'Add Event'}
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

export default CooperationEventFormModal;
