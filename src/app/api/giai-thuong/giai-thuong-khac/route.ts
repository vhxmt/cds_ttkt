// src/pages/api/giai-thuong/giai-thuong-khac/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/giai-thuong/giai-thuong-khac/data.json');

// Define interfaces for the data structure
interface Award {
    id: string;
    recipients: string;
    award: string;
    organization: string;
    year: number;
    achievement: string;
}

interface AwardData {
    awardData: Award[];
}

// Helper function to read data from JSON
function readData(): AwardData {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Error reading the data file:", error);
        return { awardData: [] };
    }
}

// Helper function to write data to JSON
function writeData(data: AwardData): void {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing to the data file:", error);
    }
}

// GET method to fetch awards
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    const data = readData();

    if (id) {
        const award = data.awardData.find(a => a.id === id);
        if (!award) {
            return NextResponse.json({ message: 'Award not found' }, { status: 404 });
        }
        return NextResponse.json(award, { status: 200 });
    } else {
        // Return all awards if no `id` is provided
        return NextResponse.json(data.awardData, { status: 200 });
    }
}

// POST method to add a new award
export async function POST(req: NextRequest) {
    const body = await req.json();
    const newAward: Award = {
        ...body,
        id: new Date().toISOString(),  // Generate an ISO string as ID
    };

    if (!newAward.recipients || !newAward.award || !newAward.organization || !newAward.year || !newAward.achievement) {
        console.error('Validation failed: Missing required fields', newAward);
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const data = readData();
    data.awardData.unshift(newAward);
    writeData(data);
    return NextResponse.json({ message: 'Award added successfully', award: newAward }, { status: 201 });
}

// PUT method to update an existing award by `id`
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required for updating' }, { status: 400 });
    }

    const data = readData();
    const awardIndex = data.awardData.findIndex(a => a.id === id);

    if (awardIndex === -1) {
        return NextResponse.json({ message: 'Award not found' }, { status: 404 });
    }

    // Update the award at the found index
    data.awardData[awardIndex] = { ...data.awardData[awardIndex], ...body };
    writeData(data);

    return NextResponse.json({ message: 'Award updated successfully', award: data.awardData[awardIndex] }, { status: 200 });
}

// DELETE method to delete an award by `id`
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
    }

    const data = readData();
    const updatedAwards = data.awardData.filter(a => a.id !== id);

    if (updatedAwards.length === data.awardData.length) {
        return NextResponse.json({ message: 'Award not found' }, { status: 404 });
    }

    // Update the JSON data by removing the award
    data.awardData = updatedAwards;
    writeData(data);

    return NextResponse.json({ message: 'Award deleted successfully' }, { status: 200 });
}
