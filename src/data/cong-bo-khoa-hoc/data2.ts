// data2.ts
export interface Article {
    id: number;
    title: string;
    date: string;
    imageUrl: string;
}

export const articles: Article[] = [
    { 
        id: 1, 
        title: 'Tên bài báo 1', 
        date: '19/12/2022 12:00:00', 
        imageUrl: 'path/to/image1.jpg' 
    },
    { 
        id: 2, 
        title: 'Tên bài báo 2', 
        date: '19/12/2022 12:00:00', 
        imageUrl: 'path/to/image2.jpg' 
    },
    { 
        id: 3, 
        title: 'Tên bài báo 3', 
        date: '19/12/2022 12:00:00', 
        imageUrl: 'path/to/image3.jpg' 
    },
];
