// src/app/NewPage/nghien-cuu/du-an/form-du-an.tsx
'use client';
import { useState, useEffect } from 'react';

interface ProjectFormProps {
    project?: Project | null; // Allow null here
    onSubmit: (project: Project) => void;
    onClose: () => void;
}

export interface Project {
    id: string; // Optional ID for new projects
    duration: string;
    title: string;
    details: string[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onClose }) => {
    const [title, setTitle] = useState(project?.title || '');
    const [duration, setDuration] = useState(project?.duration || '');
    const [details, setDetails] = useState(project?.details.join('\n') || '');

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDuration(project.duration);
            setDetails(project.details.join('\n'));
        } else {
            setTitle('');
            setDuration('');
            setDetails('');
        }
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProject: Project = {
            id: project?.id || '',  // Ensure `id` is undefined if not provided
            title,
            duration,
            details: details.split('\n').filter(d => d),
        };
        onSubmit(newProject);
    };

    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">{project ? 'Edit Project' : 'Add New Project'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Duration</label>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Details (one per line)</label>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
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
                            {project ? 'Save Changes' : 'Add Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;
