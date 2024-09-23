// src/interfaces/giai-thuong/interface.ts
// src/interfaces/giai-thuong/interface.ts
export interface Award {
        id: string;
        author: string;     // Changed from 'recipients' to 'author'
        title: string;      // Changed from 'award' to 'title'
        organization: string;
        year: number;
        description: string; // Changed from 'achievement' to 'description'
    }
    