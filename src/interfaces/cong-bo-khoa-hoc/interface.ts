// src/interfaces/cong-bo-khoa-hoc/interface.ts
export interface mainData {
    id: string;
    title: string;
    releaseDay: number;
    releaseMonth: number;
    releaseYear: number;
    author: string;
    conference: string;
    url: string;
    type: string; // Add the 'type' field
}