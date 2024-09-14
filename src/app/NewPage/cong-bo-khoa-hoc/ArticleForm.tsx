import React, { useState } from 'react';

interface Article {
    id: number;
    title: string;
    releaseDay: string;
    releaseYear: number;
    author: string;
    conference: string;
    url: string;
    type: string;
}

interface Filter {
    id: string;
    label: string;
}

interface ArticleFormProps {
    article?: Article; // Optional for new articles
    filters: Filter[]; // Pass the filters as a prop
    onSubmit: (article: Article) => void;
    onCancel: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, filters, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Article>({
        id: article?.id || Date.now(), 
        title: article?.title || '',
        releaseDay: article?.releaseDay || '',
        releaseYear: article?.releaseYear || new Date().getFullYear(),
        author: article?.author || '',
        conference: article?.conference || '',
        url: article?.url || '',
        type: article?.type || '1', // Default type
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                <h3 className="text-xl font-semibold mb-4">{article ? 'Edit Article' : 'Add Article'}</h3>
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
                            type="text"
                            name="releaseDay"
                            value={formData.releaseDay}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
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
                            {article ? 'Save Changes' : 'Add Article'}
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

export default ArticleForm;
