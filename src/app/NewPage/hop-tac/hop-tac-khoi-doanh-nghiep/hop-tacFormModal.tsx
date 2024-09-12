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

const CooperationEventFormModal: React.FC<CooperationEventFormModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDate(initialData.date);
            setImgSrc(initialData.imageSrc);
        } else {
            setTitle('');
            setDate('');
            setImgSrc('');
        }
    }, [initialData]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);

            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            setIsUploading(true);

            try {
                const res = await fetch('/api/hop-tac/hop-tac-khoi-doanh-nghiep/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    setImgSrc(data.imageUrl); // Save the image URL to the state
                } else {
                    console.error('Image upload failed:', data.message);
                }
            } catch (err) {
                console.error('Upload error:', err);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = () => {
        if (!title) {
            alert('Please provide at least a title.');
            return;
        }

        const newEvent: CooperationEvent = {
            id: initialData?.id || '',
            title,
            date: date || new Date().toLocaleDateString(),
            imageSrc: imgSrc || initialData?.imageSrc || '',
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

                {imgSrc && (
                    <div className="mb-4">
                        <img src={imgSrc} alt="Uploaded" className="w-full h-auto rounded-md" />
                    </div>
                )}

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        {initialData ? 'Save Changes' : 'Add Event'}
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
