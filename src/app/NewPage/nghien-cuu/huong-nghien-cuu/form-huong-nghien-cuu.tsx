'use client';
import { useState, useEffect } from 'react';

interface ResearchAreaFormProps {
    researchArea?: ResearchArea | null; // Allow null here
    onSubmit: (researchArea: ResearchArea) => void;
    onClose: () => void;
}

export interface ResearchArea {
    id?: string; // Optional ID for new research areas
    name: string;
    description: string;
    highlight?: boolean; // Optional field for highlighting
    relatedNews: RelatedNews[];
}

interface RelatedNews {
    id: number;
    title: string;
    description: string;
    link: string;
}

const ResearchAreaForm: React.FC<ResearchAreaFormProps> = ({ researchArea, onSubmit, onClose }) => {
    const [name, setName] = useState(researchArea?.name || '');
    const [description, setDescription] = useState(researchArea?.description || '');
    const [highlight, setHighlight] = useState(researchArea?.highlight || false);
    const [relatedNews, setRelatedNews] = useState(
        researchArea?.relatedNews.map(news => `${news.title}, ${news.description}, ${news.link}`).join('\n') || ''
    );

    useEffect(() => {
        if (researchArea) {
            setName(researchArea.name);
            setDescription(researchArea.description);
            setHighlight(researchArea.highlight || false);
            setRelatedNews(researchArea.relatedNews.map(news => `${news.title}, ${news.description}, ${news.link}`).join('\n'));
        } else {
            setName('');
            setDescription('');
            setHighlight(false);
            setRelatedNews('');
        }
    }, [researchArea]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newResearchArea: ResearchArea = {
            id: researchArea?.id || undefined, // Ensure `id` is undefined if not provided
            name,
            description,
            highlight,
            relatedNews: relatedNews
                .split('\n')
                .filter(line => line)
                .map(line => {
                    const [title, description, link] = line.split(',');
                    return { id: new Date().getTime(), title: title.trim(), description: description.trim(), link: link.trim() };
                }),
        };
        onSubmit(newResearchArea);
    };

    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">{researchArea ? 'Edit Research Area' : 'Add New Research Area'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            rows={4}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            {researchArea ? 'Save Changes' : 'Add Research Area'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResearchAreaForm;
