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

// Helper function to generate a unique ID based on ISO date and time format
const generateUniqueId = () => {
    return new Date().toISOString(); // Returns the current date and time in ISO format
};

// GET: Fetch all mainData
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return NextResponse.json({ message: 'Failed to load data' }, { status: 500 });
    }
}

// POST: Add a new mainData
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const data = readData();

        const newMainData = { ...body, id: generateUniqueId() }; // Generate new unique ID in ISO format
        data.mainData.unshift(newMainData); // Add the new data to the beginning of the array
        writeData(data);

        return NextResponse.json({ message: 'MainData added successfully', mainData: newMainData }, { status: 201 });
    } catch (error) {
        console.error('Error adding mainData:', error);
        return NextResponse.json({ message: 'Failed to add mainData' }, { status: 500 });
    }
}

// PUT: Update a mainData by ID
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json(); // Parse the request body to get the data
        const data = readData(); // Read the current data

        const id = String(body.id); // Ensure the ID is a string for comparison

        // Use the id from the request body to find the index
        const mainDataIndex = data.mainData.findIndex((mainData: any) => String(mainData.id) === id);
        if (mainDataIndex === -1) {
            return NextResponse.json({ message: 'MainData not found' }, { status: 404 });
        }

        // Update the mainData with new data from the request
        data.mainData[mainDataIndex] = { ...data.mainData[mainDataIndex], ...body };
        writeData(data); // Save the updated data back to the file

        return NextResponse.json({ message: 'MainData updated successfully', mainData: data.mainData[mainDataIndex] }, { status: 200 });
    } catch (error) {
        console.error('Error updating mainData:', error);
        return NextResponse.json({ message: 'Failed to update mainData' }, { status: 500 });
    }
}

// DELETE: Remove a mainData by ID
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // ID should be a string, not a number

    try {
        const data = readData();

        const newMainData = data.mainData.filter((mainData: any) => mainData.id !== id);
        if (newMainData.length === data.mainData.length) {
            return NextResponse.json({ message: 'MainData not found' }, { status: 404 });
        }

        data.mainData = newMainData;
        writeData(data);

        return NextResponse.json({ message: 'MainData deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting mainData:', error);
        return NextResponse.json({ message: 'Failed to delete mainData' }, { status: 500 });
    }
}
