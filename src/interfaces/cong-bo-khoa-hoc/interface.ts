// src/interfaces/cong-bo-khoa-hoc/interface.ts
export interface mainData {
    id: number;
    title: string;
    releaseDay: string;
    releaseYear: number;
    author: string;
    conference: string;
    url: string;
    type: string; // Add the 'type' field
}