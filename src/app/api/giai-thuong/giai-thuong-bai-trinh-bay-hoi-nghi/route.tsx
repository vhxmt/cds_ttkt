// src/pages/api/giai-thuong/giai-thuong-bai-trinh-bay-hoi-nghi/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/giai-thuong/giai-thuong-bai-trinh-bay-hoi-nghi/data.json');

// Define interfaces for the data structure
interface Award {
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
        return JSON.parse(jsonData);  // Parsing the JSON file
    } catch (error) {
        console.error("Error reading the data file:", error);
        return { awardData: [] };  // Return an empty array if error occurs
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
    const year = searchParams.get('year');
    
    const data = readData();

    // If `year` is provided, fetch the award by `year`
    if (year) {
        const award = data.awardData.find(a => a.year === parseInt(year));
        if (!award) {
            return NextResponse.json({ message: 'Award not found' }, { status: 404 });
        }
        return NextResponse.json(award, { status: 200 });
    } else {
        // Return all awards if no `year` is provided
        return NextResponse.json(data.awardData, { status: 200 });
    }
}

// POST method to add a new award
export async function POST(req: NextRequest) {
    const body = await req.json();
    const newAward: Award = body;

    // Validation: Check for all required fields
    if (!newAward.recipients || !newAward.award || !newAward.organization || !newAward.year || !newAward.achievement) {
        console.error('Validation failed: Missing required fields', newAward);
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Read the existing data
    const data = readData();
    
    // Add the new award and write the updated data to the file
    data.awardData.push(newAward);
    writeData(data);
    
    return NextResponse.json({ message: 'Award added successfully', award: newAward }, { status: 201 });
}

// PUT method to update an existing award by `year`
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');

    if (!year) {
        return NextResponse.json({ message: 'Year is required for updating' }, { status: 400 });
    }

    const data = readData();
    const awardIndex = data.awardData.findIndex(a => a.year === parseInt(year));

    if (awardIndex === -1) {
        return NextResponse.json({ message: 'Award not found' }, { status: 404 });
    }

    // Update the award at the found index
    data.awardData[awardIndex] = { ...data.awardData[awardIndex], ...body };
    writeData(data);

    return NextResponse.json({ message: 'Award updated successfully', award: data.awardData[awardIndex] }, { status: 200 });
}

// DELETE method to delete an award by `year`
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');

    if (!year) {
        return NextResponse.json({ message: 'Year is required for deletion' }, { status: 400 });
    }

    const data = readData();
    const updatedAwards = data.awardData.filter(a => a.year !== parseInt(year));

    if (updatedAwards.length === data.awardData.length) {
        return NextResponse.json({ message: 'Award not found' }, { status: 404 });
    }

    // Update the JSON data by removing the award
    data.awardData = updatedAwards;
    writeData(data);

    return NextResponse.json({ message: 'Award deleted successfully' }, { status: 200 });
}
