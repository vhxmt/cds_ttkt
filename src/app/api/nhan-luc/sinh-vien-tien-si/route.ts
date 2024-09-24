// src/pages/api/nhan-luc/sinh-vien-tien-si/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { getAllItems, addItem, updateItem, deleteItem } from '@/utils/nhan-luc/crudUtils';
import { Staff } from '@/interfaces/nhan-luc/interface';

// Define the file path
const filePath = path.join(process.cwd(), 'src/data/nhan-luc/sinh-vien-tien-si/data.json');

export async function GET(req: NextRequest) {
    return getAllItems<Staff>(filePath);
}

export async function POST(req: NextRequest) {
    return addItem<Staff>(req, filePath);
}

export async function PUT(req: NextRequest) {
    return updateItem<Staff>(req, filePath);
}

export async function DELETE(req: NextRequest) {
    return deleteItem<Staff>(req, filePath);
}
