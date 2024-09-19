// src/pages/api/blogs/dien-tu-dong-hoa/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { getAllItems, addItem, updateItem, deleteItem } from '@/utils/blogs/crudUtils';
import { BlogPost } from '@/interfaces/blogs/interface';

// Define the file path and image folder path
const jsonFilePath = path.join(process.cwd(), 'src/data/blogs/dien-tu-dong-hoa/data.json');
const imageFolderPath = path.join(process.cwd(), 'public/image/blog/dien-tu-dong-hoa');

export async function GET(req: NextRequest) {
    return getAllItems<BlogPost>(jsonFilePath); // Use the generic type <BlogPost>
}

export async function POST(req: NextRequest) {
    return addItem<BlogPost>(req, jsonFilePath); // Use the generic type <BlogPost>
}

export async function PUT(req: NextRequest) {
    return updateItem<BlogPost>(req, jsonFilePath, imageFolderPath); // Use the generic type <BlogPost>
}

export async function DELETE(req: NextRequest) {
    return deleteItem<BlogPost>(req, jsonFilePath, imageFolderPath); // Use the generic type <BlogPost>
}
