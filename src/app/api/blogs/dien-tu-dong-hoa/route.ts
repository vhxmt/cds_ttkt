import { NextRequest } from 'next/server';
import path from 'path';
import { getAllItems, addItem, updateItem, deleteItem } from '@/utils/blogs/crudUtils';

// Define the file path and image folder path
const jsonFilePath = path.join(process.cwd(), 'src/data/blogs/dien-tu-dong-hoa/data.json');
const imageFolderPath = path.join(process.cwd(), 'public/image/blogs/dien-tu-dong-hoa');

export async function GET(req: NextRequest) {
    return getAllItems(jsonFilePath);
}

export async function POST(req: NextRequest) {
    return addItem(req, jsonFilePath);
}

export async function PUT(req: NextRequest) {
    return updateItem(req, jsonFilePath, imageFolderPath);
}

export async function DELETE(req: NextRequest) {
    return deleteItem(req, jsonFilePath, imageFolderPath);
}
