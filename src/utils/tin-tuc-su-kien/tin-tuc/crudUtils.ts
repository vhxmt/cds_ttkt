// src/utils/tin-tuc-su-kien/tin-tuc/crudUtils.ts
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export interface DataItem {
  id: string; // Unique ID based on timestamp
  title: string;
  url: string;
}

// ID generator function integrated within the crudUtils file
const generateUniqueId = (): string => {
  return new Date().toISOString(); // Returns the current date and time in ISO format
};

// Get all items from the file
export async function getAllItems<T extends DataItem>(filePath: string): Promise<NextResponse> {
  try {
    const data = readDataFromFile(filePath);
    return NextResponse.json(data);
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Add a new item with a unique ID
export async function addItem<T extends DataItem>(req: NextRequest, filePath: string): Promise<NextResponse> {
  try {
    const items = readDataFromFile(filePath);
    const newItem = await req.json() as T;
    newItem.id = generateUniqueId(); // Generate a unique ID for the new item
    items.push(newItem);
    writeDataToFile(filePath, items);
    return NextResponse.json(items, { status: 201 });
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Update an existing item by ID
export async function updateItem<T extends DataItem>(req: NextRequest, filePath: string): Promise<NextResponse> {
  try {
    const items = readDataFromFile(filePath);
    const { id, updatedItem } = await req.json() as { id: string; updatedItem: T };
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    items[index] = { ...items[index], ...updatedItem };
    writeDataToFile(filePath, items);
    return NextResponse.json(items);
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Delete an item by ID
export async function deleteItem<T extends DataItem>(req: NextRequest, filePath: string): Promise<NextResponse> {
  try {
    const items = readDataFromFile(filePath);
    const { id } = await req.json() as { id: string };
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    items.splice(index, 1);
    writeDataToFile(filePath, items);
    return NextResponse.json(items);
  } catch (error) {
    return handleErrorResponse(error);
  }
}

// Helper functions
function readDataFromFile(filePath: string): DataItem[] {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function writeDataToFile(filePath: string, data: DataItem[]): void {
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
