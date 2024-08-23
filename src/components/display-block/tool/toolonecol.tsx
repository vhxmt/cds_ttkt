// src/components/display-block/tool/ToolOneCol.tsx
import React from 'react';

interface Tool {
    title: string;
    imgSrc: string;
    description: string;
}

interface ToolOneColProps {
    tool?: Tool;
}

const ToolOneCol: React.FC<ToolOneColProps> = ({ tool }) => {
    if (!tool) {
        return ;
    }

    return (
        <div className="text-center mb-12"> {/* Added bottom margin for spacing */}
            <h3 className="text-lg font-semibold mb-4">{tool.title}</h3> {/* Moved title to the top and added margin-bottom */}
            <img
                src={tool.imgSrc}
                alt={tool.title}
                className="w-full h-auto object-cover rounded-lg mb-4"
                style={{ height: '400px', objectFit: 'contain' }}
            />
            <p className="text-sm text-gray-600 whitespace-pre-line">{tool.description}</p>
        </div>
    );
};

export default ToolOneCol;
