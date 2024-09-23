// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Define the file path for the blog data
const jsonFilePath = path.join(process.cwd(), 'src/data/blogs/dien-tu-dong-hoa/data.json');

// Function to search through the blog data
const searchBlogData = (query: string) => {
    const fileData = fs.readFileSync(jsonFilePath, 'utf8');
    const blogData = JSON.parse(fileData);

    // Search through the mainData array and filter matching results
    const results = blogData.mainData.filter((item: any) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );

    return results;
};

// Named export for the GET method
export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get('query');

    // Debugging: Log the query parameter to check its value
    console.log('Query parameter received:', query);

    if (!query) {
        // Return a more detailed error message if query is missing or empty
        return NextResponse.json({ message: 'Invalid query parameter. Please provide a search query.' }, { status: 400 });
    }

    try {
        const results = searchBlogData(query);
        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error searching blog data:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
