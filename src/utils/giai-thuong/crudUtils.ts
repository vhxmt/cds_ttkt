// src/utils/giai-thuong/crudUtils.ts 
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { Award } from '@/interfaces/giai-thuong/interface'; 

interface AwardData {
    mainData: Award[];  // Change from 'awardData' to 'mainData'
}

// Helper function to get the file path
const getFilePath = (subPath: string): string => {
    return path.join(process.cwd(), `src/data/giai-thuong/${subPath}/data.json`);
};

// Helper function to read data from JSON
export function readData(subPath: string): AwardData {
    const filePath = getFilePath(subPath);
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error("Error reading the data file:", error);
        return { mainData: [] }; // Change from 'awardData' to 'mainData'
    }
}

// Helper function to write data to JSON
export function writeData(subPath: string, data: AwardData): void {
    const filePath = getFilePath(subPath);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing to the data file:", error);
    }
}

// Function to get all awards or a specific award by ID
export function getAward(subPath: string, id?: string): Award | Award[] | null {
    const data = readData(subPath);
    if (id) {
        const award = data.mainData.find(a => a.id === id);  // Change from 'awardData' to 'mainData'
        return award || null;
    }
    return data.mainData;  // Change from 'awardData' to 'mainData'
}

// Function to add a new award
export async function addAward(req: NextRequest, subPath: string): Promise<NextResponse> {
    const body = await req.json();
    const newAward: Award = {
        ...body,
        id: new Date().toISOString(), // Generate an ISO string as ID
    };

    // Update validation check to match the new structure
    if (!newAward.author || !newAward.title || !newAward.organization || !newAward.year || !newAward.description) {
        console.error('Validation failed: Missing required fields', newAward);
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const data = readData(subPath);
    data.mainData.unshift(newAward);  // Change from 'awardData' to 'mainData'
    writeData(subPath, data);

    return NextResponse.json({ message: 'Award added successfully', award: newAward }, { status: 201 });
}

// Function to update an award by ID
export async function updateAward(req: NextRequest, subPath: string): Promise<NextResponse> {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required for updating' }, { status: 400 });
    }

    const data = readData(subPath);
    const awardIndex = data.mainData.findIndex(a => a.id === id);  // Change from 'awardData' to 'mainData'

    if (awardIndex === -1) {
        return NextResponse.json({ message: 'Award not found' }, { status: 404 });
    }

    // Update the award at the found index
    data.mainData[awardIndex] = { ...data.mainData[awardIndex], ...body };  // Change from 'awardData' to 'mainData'
    writeData(subPath, data);

    return NextResponse.json({ message: 'Award updated successfully', award: data.mainData[awardIndex] }, { status: 200 });
}

// Function to delete an award by ID
export async function deleteAward(req: NextRequest, subPath: string): Promise<NextResponse> {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
    }

    const data = readData(subPath);
    const updatedAwards = data.mainData.filter(a => a.id !== id);  // Change from 'awardData' to 'mainData'

    if (updatedAwards.length === data.mainData.length) {  // Change from 'awardData' to 'mainData'
        return NextResponse.json({ message: 'Award not found' }, { status: 404 });
    }

    data.mainData = updatedAwards;  // Change from 'awardData' to 'mainData'
    writeData(subPath, data);

    return NextResponse.json({ message: 'Award deleted successfully' }, { status: 200 });
}
