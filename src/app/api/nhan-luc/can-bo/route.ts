// src/pages/api/nhan-luc/can-bo/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Define the Staff interface
export interface Staff {
    id: string;
    name: string;
    title: string;
    mail: string;
    tel: string;
    imageUrl: string;
}

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/nhan-luc/can-bo/data.json');

// Read data from the JSON file
const readData = (): Staff[] => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData).staffData;
};

// Write data to the JSON file
const writeData = (staffData: Staff[]) => {
    const jsonData = JSON.stringify({ staffData }, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
};

// GET: Fetch all staff members
export async function GET(req: NextRequest) {
    const staffData = readData();
    return NextResponse.json({ staffData });
}

// POST: Add a new staff member
export async function POST(req: NextRequest) {
    const body = await req.json();
    const newStaff: Staff = body;

    // Validate the required fields
    if (!newStaff.name || !newStaff.title || !newStaff.mail || !newStaff.tel || !newStaff.imageUrl) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const staffData = readData();
    staffData.push(newStaff);
    writeData(staffData);

    return NextResponse.json({ message: 'Staff added successfully', staff: newStaff }, { status: 201 });
}

// PUT: Update an existing staff member's information
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = req.nextUrl.searchParams.get('id'); // Extract staff ID from query parameters
    const updatedStaff: Staff = body;

    // Validate the required fields and the id parameter
    if (!id || !updatedStaff.name || !updatedStaff.title || !updatedStaff.mail || !updatedStaff.tel || !updatedStaff.imageUrl) {
        return NextResponse.json({ message: 'Missing required fields or staff ID' }, { status: 400 });
    }

    const staffData = readData();
    const staffIndex = staffData.findIndex((staff) => staff.id === id); // Find by ID

    if (staffIndex === -1) {
        return NextResponse.json({ message: 'Staff not found' }, { status: 404 });
    }

    staffData[staffIndex] = { ...updatedStaff, id }; // Preserve the original ID
    writeData(staffData);

    return NextResponse.json({ message: 'Staff updated successfully', staff: updatedStaff });
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id'); // Extract staff ID from query parameters

    if (!id) {
        return NextResponse.json({ message: 'Missing staff ID' }, { status: 400 });
    }

    const staffData = readData();
    const staffIndex = staffData.findIndex((staff) => staff.id === id); // Find by ID

    if (staffIndex === -1) {
        return NextResponse.json({ message: 'Staff not found' }, { status: 404 });
    }

    staffData.splice(staffIndex, 1); // Remove the staff from the array
    writeData(staffData);

    return NextResponse.json({ message: 'Staff deleted successfully' });
}

