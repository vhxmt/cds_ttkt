'use client';
import { useState } from 'react';

interface HomePageFormProps {
    initialData: any; // HomePageData type
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export default function HomePageForm({ initialData, onSubmit, onCancel }: HomePageFormProps) {
    const [introductionTitle, setIntroductionTitle] = useState(initialData?.IntroductionTitle || '');
    const [introductionDescription, setIntroductionDescription] = useState(initialData?.IntroductionDescription || '');
    const [strategicGoalsTitle, setStrategicGoalsTitle] = useState(initialData?.StrategicGoalsTitle || '');
    const [strategicGoalsItems, setStrategicGoalsItems] = useState(initialData?.StrategicGoalsItems || '');
    const [bannerImage, setBannerImage] = useState<File | null>(null);

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBannerImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Upload the image if a new one is selected
        let newBannerImageUrl = initialData.src;
        if (bannerImage) {
            const formData = new FormData();
            formData.append('file', bannerImage);
            formData.append('folderPath', 'image/homePage');
            formData.append('oldFilePath', initialData.src); // Passing the old image path to delete it

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadResponse = await res.json();
            if (res.ok) {
                newBannerImageUrl = uploadResponse.filePath;
            } else {
                console.error('Failed to upload image', uploadResponse);
                return;
            }
        }

        // Submit the updated data
        const updatedData = {
            src: newBannerImageUrl,
            alt: initialData.alt,
            IntroductionTitle: introductionTitle,
            IntroductionDescription: introductionDescription,
            StrategicGoalsTitle: strategicGoalsTitle,
            StrategicGoalsItems: strategicGoalsItems, // Preserve as string, split later
        };

        onSubmit(updatedData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                <h3 className="text-xl font-semibold mb-4">Edit Home Page</h3>
                <form onSubmit={handleSubmit}>
                    {/* Banner Image */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Banner Image</label>
                        <input type="file" onChange={handleImageChange} className="mt-1 block w-full" />
                        {initialData.src && (
                            <img src={initialData.src} alt={initialData.alt} className="mt-2 h-24 w-auto" />
                        )}
                    </div>

                    {/* Introduction Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Introduction Title</label>
                        <input
                            type="text"
                            value={introductionTitle}
                            onChange={(e) => setIntroductionTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Introduction Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Introduction Description</label>
                        <textarea
                            value={introductionDescription}
                            onChange={(e) => setIntroductionDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Strategic Goals */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Strategic Goals Title</label>
                        <input
                            type="text"
                            value={strategicGoalsTitle}
                            onChange={(e) => setStrategicGoalsTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Strategic Goals Items</label>
                        <textarea
                            value={strategicGoalsItems}
                            onChange={(e) => setStrategicGoalsItems(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            rows={6} // Allow editing the entire string
                        />
                        <p className="text-sm text-gray-500 mt-2">Separate goals with new lines.</p>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Save Changes
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
}
