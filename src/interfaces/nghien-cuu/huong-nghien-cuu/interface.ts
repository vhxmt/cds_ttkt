// src/interfaces/nghien-cuu/huong-nghien-cuu.ts
// src/interfaces/nghien-cuu/huong-nghien-cuu.ts

// Interface for individual related news items
export interface RelatedNews {
    id: string;
    title: string;
    description: string;
    link: string;
    researchAreaID: string;
}

// Interface for individual research areas
export interface ResearchArea {
    researchAreaID?: string; // ID based on the creation time
    name: string;
    description?: string;
}

// Interface for the main research data structure
export interface ResearchData {
    researchAreas: ResearchArea[];
    relatedNews: RelatedNews[];
}
