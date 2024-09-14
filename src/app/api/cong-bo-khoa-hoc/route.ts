// src/pages/api/cong-bo-khoa-hoc/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/data/cong-bo-khoa-hoc/data.json');

// Helper function to read JSON data
const readData = () => {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
};

// Helper function to write JSON data
const writeData = (data: any) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf-8');
};

// GET: Fetch all articles
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return NextResponse.json({ message: 'Failed to load data' }, { status: 500 });
    }
}

// POST: Add a new article
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = readData();

        const newArticle = { ...body, id: Date.now() }; // Generate new ID
        data.articles.unshift(newArticle);

        writeData(data);

        return NextResponse.json({ message: 'Article added successfully', article: newArticle }, { status: 201 });
    } catch (error) {
        console.error('Error adding article:', error);
        return NextResponse.json({ message: 'Failed to add article' }, { status: 500 });
    }
}

// PUT: Update an article by ID
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const data = readData();

        const articleIndex = data.articles.findIndex((article: any) => article.id === body.id);
        if (articleIndex === -1) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }

        data.articles[articleIndex] = { ...data.articles[articleIndex], ...body };

        writeData(data);

        return NextResponse.json({ message: 'Article updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating article:', error);
        return NextResponse.json({ message: 'Failed to update article' }, { status: 500 });
    }
}

// DELETE: Remove an article by ID
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));  // Assuming the ID is passed as a query param

    try {
        const data = readData();

        const newArticles = data.articles.filter((article: any) => article.id !== id);
        if (newArticles.length === data.articles.length) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }

        data.articles = newArticles;
        writeData(data);

        return NextResponse.json({ message: 'Article deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting article:', error);
        return NextResponse.json({ message: 'Failed to delete article' }, { status: 500 });
    }
}
