// src/app/api/tin-tuc-su-kien/tin-tuc/route.ts
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { getAllItems, addItem, updateItem, deleteItem, DataItem } from '@/utils/tin-tuc-su-kien/tin-tuc/crudUtils';

// Define the absolute file path to your JSON data
const filePath = path.join(process.cwd(), 'src/data/tin-tuc-su-kien/tin-tuc/tin-tuc.json');

// ID generator function defined here
const generateUniqueId = (): string => {
  return new Date().toISOString(); // Returns the current date and time in ISO format
};

// GET request handler
export async function GET(req: NextRequest) {
  try {
    return await getAllItems<DataItem>(filePath);
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the data.' }, { status: 500 });
  }
}

// POST request handler - Add a new item with a unique ID
export async function POST(req: NextRequest) {
  try {
    const newItem = await req.json();
    newItem.id = generateUniqueId(); // Generate and add unique ID
    return await addItem<DataItem>(req, filePath);
  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ error: 'An error occurred while adding the item.' }, { status: 500 });
  }
}

// PUT request handler - Update an existing item
export async function PUT(req: NextRequest) {
  try {
    return await updateItem<DataItem>(req, filePath);
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json({ error: 'An error occurred while updating the item.' }, { status: 500 });
  }
}

// DELETE request handler - Delete an existing item
export async function DELETE(req: NextRequest) {
  try {
    return await deleteItem<DataItem>(req, filePath);
  } catch (error) {
    console.error('Error in DELETE:', error);
    return NextResponse.json({ error: 'An error occurred while deleting the item.' }, { status: 500 });
  }
}
