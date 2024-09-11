import React, { useState, useEffect } from 'react';

interface Tool {
    id?: string;
    title: string;
    imgSrc?: string;  // Make imgSrc optional
    description?: string;  // Make description optional
}

interface FormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (tool: Tool) => void;
    initialData?: Tool;
    section: string;
}

const ToolFormModal: React.FC<FormProps> = ({ isOpen, onClose, onSubmit, initialData, section }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Initialize form values if editing an existing tool
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
            setImgSrc(initialData.imgSrc || '');
        }
    }, [initialData]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);

            const formData = new FormData();
            formData.append('file', e.target.files[0]);

            setIsUploading(true);

            try {
                const res = await fetch('/api/thiet-bi-va-dung-cu/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (res.ok) {
                    setImgSrc(data.imageUrl); // Automatically load and display the uploaded image
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

    const handleSubmit = async () => {
        if (!title) {
            alert('Please provide at least a title.');
            return;
        }
    
        const tool: Tool = {
            id: initialData?.id || '',  // For PUT request, ID must be present
            title,
            imgSrc: imgSrc || initialData?.imgSrc,  // Keep existing image if no new one is uploaded
            description: description || initialData?.description,  // Keep existing description if none provided
        };
    
        try {
            const method = initialData?.id ? 'PUT' : 'POST';  // Use PUT for editing, POST for adding
            const res = await fetch('/api/thiet-bi-va-dung-cu', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    section,  // Pass the section as required by the API
                    newTool: tool,  // The API expects "newTool" in the POST request body
                }),
            });
    
            const data = await res.json();
            if (res.ok) {
                onSubmit(data.tool);  // Update the parent component with the updated tool
                onClose();  // Close the modal
            } else {
                console.error('Failed to submit tool:', data.message);
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };
    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">{initialData ? 'Edit Tool' : 'Add Tool'} - {section}</h3>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
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
                        {initialData ? 'Save Changes' : 'Add Tool'}
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

export default ToolFormModal;
