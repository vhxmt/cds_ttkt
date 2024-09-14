'use client';
import { useState } from 'react';

interface CooperationFormProps {
    initialData: any;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export default function CooperationForm({ initialData, onSubmit, onCancel }: CooperationFormProps) {
    const [domesticCooperation, setDomesticCooperation] = useState(initialData.domesticCooperation || {});
    const [internationalCooperation, setInternationalCooperation] = useState(initialData.internationalCooperation || {});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            domesticCooperation,
            internationalCooperation,
        };
        onSubmit(updatedData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-auto">
                <h3 className="text-xl font-semibold mb-4">Edit Cooperation Data</h3>
                <form onSubmit={handleSubmit}>
                    {/* Domestic Cooperation */}
                    <div className="mb-4 border-b border-gray-300 pb-4">
                        <label className="block text-sm font-medium text-gray-700">Domestic Cooperation Title</label>
                        <input
                            type="text"
                            value={domesticCooperation.title}
                            onChange={(e) =>
                                setDomesticCooperation({ ...domesticCooperation, title: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">Domestic Cooperation Items</label>
                        <textarea
                            value={JSON.stringify(domesticCooperation.items, null, 2)}
                            onChange={(e) =>
                                setDomesticCooperation({ ...domesticCooperation, items: JSON.parse(e.target.value) })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            rows={10}
                        />
                    </div>

                    {/* International Cooperation */}
                    <div className="mb-4 border-b border-gray-300 pb-4">
                        <label className="block text-sm font-medium text-gray-700">International Cooperation Title</label>
                        <input
                            type="text"
                            value={internationalCooperation.title}
                            onChange={(e) =>
                                setInternationalCooperation({ ...internationalCooperation, title: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                        />
                        <label className="block text-sm font-medium text-gray-700 mt-4">
                            International Cooperation Items
                        </label>
                        <textarea
                            value={JSON.stringify(internationalCooperation.items, null, 2)}
                            onChange={(e) =>
                                setInternationalCooperation({ ...internationalCooperation, items: JSON.parse(e.target.value) })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            rows={10}
                        />
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
