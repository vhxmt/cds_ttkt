'use client';
import { useState } from 'react';

interface CooperationItem {
    href: string;
    src: string;
    alt: string;
}

interface CooperationFormProps {
    initialData: any;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

export default function CooperationForm({ initialData, onSubmit, onCancel }: CooperationFormProps) {
    const [domesticCooperation, setDomesticCooperation] = useState(initialData.domesticCooperation || {});
    const [internationalCooperation, setInternationalCooperation] = useState(initialData.internationalCooperation || {});

    // Function to handle adding a new item block
    const handleAddBlock = (section: string) => {
        const newBlock: CooperationItem = { href: '', src: '', alt: '' };
        if (section === 'domestic') {
            setDomesticCooperation({
                ...domesticCooperation,
                items: [newBlock, ...domesticCooperation.items], // Prepend new block
            });
        } else {
            setInternationalCooperation({
                ...internationalCooperation,
                items: [newBlock, ...internationalCooperation.items], // Prepend new block
            });
        }
    };

    // Function to handle editing a block
    const handleEditBlock = (section: string, index: number, field: keyof CooperationItem, value: string) => {
        const updatedItems = section === 'domestic'
            ? domesticCooperation.items.map((item: CooperationItem, idx: number) =>
                  idx === index ? { ...item, [field]: value } : item
              )
            : internationalCooperation.items.map((item: CooperationItem, idx: number) =>
                  idx === index ? { ...item, [field]: value } : item
              );

        if (section === 'domestic') {
            setDomesticCooperation({
                ...domesticCooperation,
                items: updatedItems,
            });
        } else {
            setInternationalCooperation({
                ...internationalCooperation,
                items: updatedItems,
            });
        }
    };

    // Function to handle deleting a block
    const handleDeleteBlock = (section: string, index: number) => {
        const updatedItems = section === 'domestic'
            ? domesticCooperation.items.filter((_: any, idx: number) => idx !== index)
            : internationalCooperation.items.filter((_: any, idx: number) => idx !== index);

        if (section === 'domestic') {
            setDomesticCooperation({
                ...domesticCooperation,
                items: updatedItems,
            });
        } else {
            setInternationalCooperation({
                ...internationalCooperation,
                items: updatedItems,
            });
        }
    };

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
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-auto border-2 border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Edit Cooperation Data</h3>
                <form onSubmit={handleSubmit}>
                    {/* Domestic Cooperation Section */}
                    <div className="mb-4 border-b-2 border-gray-800 pb-4">
                        <label className="block text-sm font-medium text-gray-700">Domestic Cooperation Title</label>
                        <input
                            type="text"
                            value={domesticCooperation.title}
                            onChange={(e) =>
                                setDomesticCooperation({ ...domesticCooperation, title: e.target.value })
                            }
                            className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => handleAddBlock('domestic')}
                            className="bg-blue-500 text-white py-1 px-3 rounded mt-4"
                        >
                            Add Domestic Cooperation Block
                        </button>
                        {domesticCooperation.items.map((item: CooperationItem, index: number) => (
                            <div key={index} className="mt-4 border-2 border-gray-800 p-2 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700">Href</label>
                                <input
                                    type="text"
                                    value={item.href}
                                    onChange={(e) =>
                                        handleEditBlock('domestic', index, 'href', e.target.value)
                                    }
                                    className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                                />
                                <label className="block text-sm font-medium text-gray-700 mt-2">Src</label>
                                <input
                                    type="text"
                                    value={item.src}
                                    onChange={(e) =>
                                        handleEditBlock('domestic', index, 'src', e.target.value)
                                    }
                                    className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                                />
                                <label className="block text-sm font-medium text-gray-700 mt-2">Alt</label>
                                <input
                                    type="text"
                                    value={item.alt}
                                    onChange={(e) =>
                                        handleEditBlock('domestic', index, 'alt', e.target.value)
                                    }
                                    className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteBlock('domestic', index)}
                                    className="bg-red-500 text-white py-1 px-3 rounded mt-2"
                                >
                                    Delete Block
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* International Cooperation Section */}
                    <div className="mb-4 border-b-2 border-gray-800 pb-4">
                        <label className="block text-sm font-medium text-gray-700">International Cooperation Title</label>
                        <input
                            type="text"
                            value={internationalCooperation.title}
                            onChange={(e) =>
                                setInternationalCooperation({ ...internationalCooperation, title: e.target.value })
                            }
                            className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                        />
                        <button
                            type="button"
                            onClick={() => handleAddBlock('international')}
                            className="bg-blue-500 text-white py-1 px-3 rounded mt-4"
                        >
                            Add International Cooperation Block
                        </button>
                        {internationalCooperation.items.map((item: CooperationItem, index: number) => (
                            <div key={index} className="mt-4 border-2 border-gray-800 p-2 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700">Href</label>
                                <input
                                    type="text"
                                    value={item.href}
                                    onChange={(e) =>
                                        handleEditBlock('international', index, 'href', e.target.value)
                                    }
                                    className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                                />
                                <label className="block text-sm font-medium text-gray-700 mt-2">Src</label>
                                <input
                                    type="text"
                                    value={item.src}
                                    onChange={(e) =>
                                        handleEditBlock('international', index, 'src', e.target.value)
                                    }
                                    className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                                />
                                <label className="block text-sm font-medium text-gray-700 mt-2">Alt</label>
                                <input
                                    type="text"
                                    value={item.alt}
                                    onChange={(e) =>
                                        handleEditBlock('international', index, 'alt', e.target.value)
                                    }
                                    className="mt-1 block w-full border-2 border-gray-600 rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteBlock('international', index)}
                                    className="bg-red-500 text-white py-1 px-3 rounded mt-2"
                                >
                                    Delete Block
                                </button>
                            </div>
                        ))}
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
