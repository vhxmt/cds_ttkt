// src/app/NewPage/nhan-luc/can-bo/form-nhan-luc.tsx
import { useState } from 'react';

interface StaffFormProps {
    initialData?: Staff;
    onSubmit: (staff: Staff, imageFile?: File) => Promise<void>;
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(
            {
                id: initialData?.id || '', // Ensure the id is passed along
                name,
                title,
                mail,
                tel,
                imageUrl: initialData?.imageUrl || '',
            },
            imageFile || undefined
        );
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
                >
                    Submit
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