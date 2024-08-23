// src/components/ToolThreeCol.tsx
import React from 'react';

interface Tool {
    title: string;
    imgSrc: string;
    description: string;
}

interface ToolThreeColProps {
    tools?: Tool[]; // Mark tools as optional
}

const ToolThreeCol: React.FC<ToolThreeColProps> = ({ tools = [] }) => {
    return (
        <div className="grid grid-cols-3 gap-8 mb-12">
            {tools.map((tool, index) => (
                <div key={index} className="text-center">
                    <img
                        src={tool.imgSrc}
                        alt={tool.title}
                        className="w-full h-auto object-cover rounded-lg mb-4"
                        style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <h3 className="text-lg font-semibold">{tool.title}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{tool.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ToolThreeCol;
