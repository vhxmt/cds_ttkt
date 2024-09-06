import { useState, useEffect } from 'react';

export interface RelatedNews {
    id?: number; // Optional for new news, required for editing existing news
    title: string;
    description: string;
    link: string;
}

interface RelatedNewsFormProps {
    relatedNews: RelatedNews | null;
    onSubmit: (news: RelatedNews) => void;
    onClose: () => void;
}

export default function RelatedNewsForm({ relatedNews, onSubmit, onClose }: RelatedNewsFormProps) {
    const [newsData, setNewsData] = useState<RelatedNews>({
        title: '',
        description: '',
        link: ''
    });

    useEffect(() => {
        if (relatedNews) {
            setNewsData(relatedNews);
        }
    }, [relatedNews]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewsData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newsData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">{relatedNews ? 'Sửa Tin Liên Quan' : 'Thêm Tin Liên Quan'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Tiêu đề tin tức
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newsData.title}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Mô tả tin tức
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={newsData.description}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                            Liên kết
                        </label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            value={newsData.link}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {relatedNews ? 'Cập Nhật' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
