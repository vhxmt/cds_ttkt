// src/interfaces/cong-bo-khoa-hoc/interface.ts
interface Article {
    id: number;
    title: string;
    releaseDay: string;
    releaseYear: number;
    author: string;
    conference: string;
    url: string;
    type: string; // Add the 'type' field
}