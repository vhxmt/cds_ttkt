import { useState } from 'react';

export default function FormDangTin() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState<string[]>(['']);

    const handleAddRequirement = () => {
        setRequirements([...requirements, '']);
    };

    const handleRequirementChange = (index: number, value: string) => {
        const updatedRequirements = [...requirements];
        updatedRequirements[index] = value;
        setRequirements(updatedRequirements);
    };

    const handleRemoveRequirement = (index: number) => {
        const updatedRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(updatedRequirements);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic để xử lý việc đăng tin tại đây
        console.log({ title, description, requirements });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    placeholder="Nhập tiêu đề"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    placeholder="Nhập mô tả"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Vị trí tuyển dụng</label>
                {requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-1">
                        <input
                            value={req}
                            onChange={(e) => handleRequirementChange(index, e.target.value)}
                            className="p-2 block w-full border border-gray-300 rounded-md"
                            placeholder="Nhập vị trí"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveRequirement(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Xóa
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Thêm vị trí
                </button>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Đăng tin
                </button>
            </div>
        </form>
    );
}
