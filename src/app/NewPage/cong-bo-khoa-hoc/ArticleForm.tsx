import React, { useState, useEffect } from 'react';
import { mainData } from '@/interfaces/cong-bo-khoa-hoc/interface';

interface Filter {
    id: string;
    label: string;
}

interface mainDataFormProps {
    mainData?: mainData;
    filters: Filter[];
    onSubmit: (mainData: mainData) => void;
    onCancel: () => void;
}

const MainDataForm: React.FC<mainDataFormProps> = ({ mainData, filters, onSubmit, onCancel }) => {
    // Initialize the form state with default values or with the data to be edited
    const [formData, setFormData] = useState<mainData>({
        id: mainData?.id || String(Date.now()), // Use string for ID
        title: mainData?.title || '',
        releaseDay: mainData?.releaseDay || 1,
        releaseMonth: mainData?.releaseMonth || 1,
        releaseYear: mainData?.releaseYear || new Date().getFullYear(),
        author: mainData?.author || '',
        conference: mainData?.conference || '',
        url: mainData?.url || '',
        type: mainData?.type || '1',
    });

    // Update the form state whenever the `mainData` prop changes
    useEffect(() => {
        if (mainData) {
            setFormData(mainData); // Load current data into form if editing
        }
    }, [mainData]); // Dependency array ensures this runs only when `mainData` changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'releaseDay' || name === 'releaseMonth' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                <h3 className="text-xl font-semibold mb-4">{mainData ? 'Edit Main Data' : 'Add Main Data'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Release Day</label>
                        <input
                            type="number"
                            name="releaseDay"
                            value={formData.releaseDay}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            min={1}
                            max={31}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Release Month</label>
                        <input
                            type="number"
                            name="releaseMonth"
                            value={formData.releaseMonth}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            min={1}
                            max={12}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Release Year</label>
                        <input
                            type="number"
                            name="releaseYear"
                            value={formData.releaseYear}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Conference</label>
                        <input
                            type="text"
                            name="conference"
                            value={formData.conference}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">URL</label>
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        >
                            {filters.map((filter) => (
                                <option key={filter.id} value={filter.id}>
                                    {filter.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {mainData ? 'Save Changes' : 'Add Main Data'}
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
};

export default MainDataForm;
