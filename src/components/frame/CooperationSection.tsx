"use client";
import React from 'react';

interface CooperationItem {
    href: string;
    src: string;
    alt: string;
}

interface CooperationSectionProps {
    title: string;
    items: CooperationItem[];
}

const CooperationSection: React.FC<CooperationSectionProps> = ({ title, items }) => {
    return (
        <section className="relative z-20 p-8">
            <div className="text-center pt-5">
                <h2 className="text-green-800 text-2xl font-bold mb-5">{title}</h2>
                <div className="w-full flex flex-wrap justify-center gap-4 bg-white p-4 rounded-lg shadow-md">
                    {items.map((item, index) => (
                        <div key={index} className="w-1/8 p-2 flex justify-center items-center">
                            <a className="contentImg" href={item.href} target="_blank" rel="noopener noreferrer">
                                <img src={item.src} className="h-16 object-contain" alt={item.alt} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CooperationSection;
