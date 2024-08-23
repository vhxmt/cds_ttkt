"use client";
import { useState } from 'react';
import Breadcrumb from '@/components/breadcrumb';

// Sample data structure
const toolsTwoColumn = [
    {
        title: "PMSM-IM set",
        imgSrc: "/image/thiet-bi/PMSM-IM.png",
        description: "Model-SYG-D245-460-1000W\nOutput Power: 1030W(55Vdc@1175W)"
    },
    {
        title: "DFIG-IM set",
        imgSrc: "/image/thiet-bi/DFIG-IM.png",
        description: "Model-SYG-D245-460-1000W\nOutput Power: 1030W(55Vdc@1175W)"
    },
];

const toolsThreeColumn = [
    {
        title: "Oscilloscope",
        imgSrc: "/image/thiet-bi/Oscilloscope.png",
        description: "MSO58 Tektronix\nChannels & Frequency: 8Ch / 2GHz\nSampling Rate: 6.25 GS/s"
    },
    {
        title: "DC power supply",
        imgSrc: "/image/thiet-bi/DC-PSU.png",
        description: "Sorensen DCR 300-16T\nMaximum output voltage: 300V\nMaximum output current: 16A"
    },
    {
        title: "AC programmable power supply",
        imgSrc: "/image/thiet-bi//AC-programmable-PSU.png",
        description: "Elgar SW5250A\nAC or DC Output Voltage: 0 - 156 A\nOutput Current Per Phase: 13A - 135V in 156V"
    },
];

// TwoColumnTemplate Component
const TwoColumnTemplate = ({ tools }) => {
    return (
        <div className="grid grid-cols-2 gap-8">
            {tools.map((tool, index) => (
                <div key={index} className="text-center">
                    <img
                        src={tool.imgSrc}
                        alt={tool.title}
                        className="w-full h-auto object-cover rounded-lg mb-4"
                        style={{ height: '200px', objectFit: 'contain' }} // Adjust size to be consistent
                    />
                    <h3 className="text-lg font-semibold">{tool.title}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{tool.description}</p>
                </div>
            ))}
        </div>
    );
};

// ThreeColumnTemplate Component
const ThreeColumnTemplate = ({ tools }) => {
    return (
        <div className="grid grid-cols-3 gap-8">
            {tools.map((tool, index) => (
                <div key={index} className="text-center">
                    <img
                        src={tool.imgSrc}
                        alt={tool.title}
                        className="w-full h-auto object-cover rounded-lg mb-4"
                        style={{ height: '200px', objectFit: 'contain' }} // Adjust size to be consistent
                    />
                    <h3 className="text-lg font-semibold">{tool.title}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{tool.description}</p>
                </div>
            ))}
        </div>
    );
};

// NewsPage Component
export default function NewsPage() {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <Breadcrumb />
            <div className="flex space-x-4">
                <div className="side-menu flex-none w-1/3"></div>
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mt-4 mb-4">Danh sách dụng cụ</h2>

                    {/* Two Column Layout */}
                    <TwoColumnTemplate tools={toolsTwoColumn} />

                    {/* Three Column Layout */}
                    <ThreeColumnTemplate tools={toolsThreeColumn} />
                </div>
            </div>
        </div>
    );
}
