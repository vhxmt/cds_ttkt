import React from 'react';

interface DescriptionProps {
    description: string | string[]; // Accepts either a single string or an array of strings
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
    const paragraphs = Array.isArray(description) ? description : [description];

    return (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-4xl w-full">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                </p>
            ))}
        </div>
    );
};

export default Description;
