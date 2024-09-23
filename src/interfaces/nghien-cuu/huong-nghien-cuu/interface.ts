// src/interfaces/nghien-cuu/huong-nghien-cuu.ts
export interface RelatedNews {
    id: number;
    title: string;
    description?: string;
    link?: string;
}

export interface ResearchArea {
    name: string;
    description?: string;
    highlight?: boolean; // Optional property to highlight certain areas
    relatedNews?: RelatedNews[]; // Array of related news
}

export interface ResearchData {
    title: string; // Title of the research section
    researchAreas: ResearchArea[]; // Array of research areas
    description?: string; // Optional description for the whole research section
    relatedNews?: RelatedNews[]; // Optional array of global related news
}
