// src/utils/nhan-luc/crudUtils.ts
import fs from 'fs';
import path from 'path';
import { NextResponse,NextRequest } from 'next/server';

// Define the interface for the data object
export interface DataItem {
    id: string;
}

// Read data from the JSON file
export const readData = <T extends DataItem>(filePath: string): T[] => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(fileData);
    return parsedData?.staffData || []; 
};

// Write data to the JSON file
export const writeData = <T extends DataItem>(filePath: string, data: T[]): void => {
    const jsonData = JSON.stringify({ staffData: data }, null, 2); // 'staffData' key
    fs.writeFileSync(filePath, jsonData, 'utf8');
};

// Get all items
export const getAllItems = <T extends DataItem>(filePath: string): NextResponse => {
    try {
        const data = readData<T>(filePath);
        return NextResponse.json({ staffData: data });
    } catch (error) {
        console.error('Error reading data:', error);
        return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
    }
};


// Add a new item
export const addItem = async <T extends DataItem>(req: NextRequest, filePath: string): Promise<NextResponse> => {
    try {
        const body = await req.json();
        const newItem: T = { id: new Date().toISOString(), ...body };

        // Validate the required fields
        if (!newItem.id) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const data = readData<T>(filePath);
        data.push(newItem);

        writeData(filePath, data);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

// Update an item
export const updateItem = async <T extends DataItem>(req: NextRequest, filePath: string): Promise<NextResponse> => {
    const body = await req.json();
    const id = req.nextUrl.searchParams.get('id');

    if (!id || !body) {
        return NextResponse.json({ message: 'Missing required fields or item ID' }, { status: 400 });
    }

    const data = readData<T>(filePath);
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    data[index] = { ...body, id };
    writeData(filePath, data);

    return NextResponse.json({ message: 'Item updated successfully', item: data[index] });
};

// Delete an item
export const deleteItem = async <T extends DataItem>(req: NextRequest, filePath: string): Promise<NextResponse> => {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Missing item ID' }, { status: 400 });
    }

    const data = readData<T>(filePath);
    const index = data.findIndex((item) => item.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    data.splice(index, 1);
    writeData(filePath, data);

    return NextResponse.json({ message: 'Item deleted successfully' });
};
