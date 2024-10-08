import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/homePage.json');

// Helper function to read the JSON data
const readData = () => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

// Helper function to write the JSON data
const writeData = (data: any) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
};

// API handler
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data);  // Return JSON data
    } catch (error) {
        console.error('Error reading homepage data:', error);
        return NextResponse.json({ message: 'Failed to load data' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        
        if (!body) {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        // Update the JSON file with the new data
        writeData(body);

        return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating homepage data:', error);
        return NextResponse.json({ message: 'Failed to update data' }, { status: 500 });
    }
}
