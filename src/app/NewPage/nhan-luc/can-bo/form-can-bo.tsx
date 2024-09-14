// src/app/NewPage/nhan-luc/can-bo/form-can-bo.tsx
import { useState } from 'react';

interface StaffFormProps {
    initialData?: Staff;
    onSubmit: (staff: Staff) => Promise<void>;
    onCancel: () => void;
}

interface Staff {
    id: string;
    name: string;
    title: string;
    mail: string;
    tel: string;
    imageUrl: string;
}

export default function StaffForm({ initialData, onSubmit, onCancel }: StaffFormProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [title, setTitle] = useState(initialData?.title || '');
    const [mail, setMail] = useState(initialData?.mail || '');
    const [tel, setTel] = useState(initialData?.tel || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            let uploadedImageUrl = imageUrl;

            // If a new image is selected, upload it using the universal upload API
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('folderPath', 'image/nhan-luc/can-bo'); // Set the folder path for staff images
                
                // Include the old image URL if present, to delete the old image
                if (initialData?.imageUrl) {
                    formData.append('oldFilePath', initialData.imageUrl);
                }

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    uploadedImageUrl = data.filePath; // Set the new image URL
                } else {
                    console.error('Image upload failed:', data.message);
                    return;
                }
            }

            // Submit the updated staff data
            await onSubmit({
                id: initialData?.id || '', // Keep the original ID
                name,
                title,
                mail,
                tel,
                imageUrl: uploadedImageUrl, // Use the new image URL or existing one
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
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
    );
}
