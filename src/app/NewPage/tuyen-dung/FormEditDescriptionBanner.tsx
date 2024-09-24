import { useState } from 'react';

interface FormEditDescriptionBannerProps {
    recruitmentData: any;
    closeModal: () => void;
    updateRecruitmentData: (data: any) => void;
}

const FormEditDescriptionBanner: React.FC<FormEditDescriptionBannerProps> = ({ recruitmentData, closeModal, updateRecruitmentData }) => {
    const [newDescription, setNewDescription] = useState(recruitmentData.description);
    const [newBannerSrc, setNewBannerSrc] = useState(recruitmentData.bannerSrc);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        let uploadedBannerPath = newBannerSrc;

        // If a new image is selected, upload it
        if (selectedImage) {
            const formData = new FormData();
            formData.append('file', selectedImage);
            formData.append('folderPath', 'image/tuyen-dung');
            formData.append('oldFilePath', recruitmentData.bannerSrc);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                uploadedBannerPath = result.filePath;  // New banner path from the server
            } else {
                console.error('Image upload failed');
            }
        }

        // Update the JSON with the new description and bannerSrc
        const updatedData = {
            ...recruitmentData,
            description: newDescription,
            bannerSrc: uploadedBannerPath,
        };

        const updateResponse = await fetch('/api/tuyen-dung', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...updatedData,
            }),
        });

        if (updateResponse.ok) {
            updateRecruitmentData(updatedData);  // Update the local state
            closeModal();  // Close the modal
        } else {
            console.error('Failed to update recruitment data');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
                <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin và Banner</h2>

                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    className="w-full h-40 p-4 border rounded mb-4"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Update the description"
                />

                <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Banner</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 mb-4" />

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                        onClick={closeModal}
                    >
                        Hủy
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleSubmit}
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormEditDescriptionBanner;
