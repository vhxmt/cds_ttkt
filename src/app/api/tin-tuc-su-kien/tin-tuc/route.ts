// src/app/api/tin-tuc-su-kien/tin-tuc/route.ts

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { NewsItem } from '@/interfaces/tin-tuc-su-kien/tin-tuc/interface';

const filePath = path.join(process.cwd(), 'src/data/tin-tuc-su-kien/tin-tuc/tin-tuc.json');

// ID generator function
const generateUniqueId = (): string => {
  return new Date().toISOString(); // Returns the current date and time in ISO format
};

// Helper functions to read and write data to the JSON file
function readDataFromFile(filePath: string): { newsData: NewsItem[] } {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function writeDataToFile(filePath: string, data: { newsData: NewsItem[] }): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Error handler function
function handleErrorResponse(error: unknown): NextResponse {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}

// Get all items from the file
async function getAllItems(): Promise<NextResponse> {
  try {
    const data = readDataFromFile(filePath);
    return NextResponse.json(data);
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Add a new item with a unique ID
async function addItem(req: NextRequest): Promise<NextResponse> {
  try {
    const data = readDataFromFile(filePath);
    const newItem = await req.json() as NewsItem;
    newItem.id = generateUniqueId(); // Generate a unique ID for the new item
    data.newsData.push(newItem);
    writeDataToFile(filePath, data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Update an existing item by ID
async function updateItem(req: NextRequest): Promise<NextResponse> {
  try {
    const data = readDataFromFile(filePath);
    const { id, updatedItem } = await req.json() as { id: string; updatedItem: NewsItem };
    const index = data.newsData.findIndex(item => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    data.newsData[index] = { ...data.newsData[index], ...updatedItem };
    writeDataToFile(filePath, data);
    return NextResponse.json(data);
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Delete an item by ID
async function deleteItem(req: NextRequest): Promise<NextResponse> {
  try {
    const data = readDataFromFile(filePath);
    const { id } = await req.json() as { id: string };

    const index = data.newsData.findIndex(item => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    data.newsData.splice(index, 1); // Remove the item from the array
    writeDataToFile(filePath, data); // Write the updated array back to the file
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in DELETE handler:', error); // Log the error
    return handleErrorResponse(error); // Send a detailed error response
  }
}

// GET request handler
export async function GET(req: NextRequest) {
  return await getAllItems();
}

// POST request handler - Add a new item with a unique ID
export async function POST(req: NextRequest) {
  return await addItem(req);
}

// PUT request handler - Update an existing item
export async function PUT(req: NextRequest) {
  return await updateItem(req);
}

// DELETE request handler - Delete an existing item
export async function DELETE(req: NextRequest) {
  return await deleteItem(req);
}
