import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/data/nghien-cuu/bang-sang-che/data.json');

interface Patent {
    stt: number;
    author: string;
    type: string;
    title: string;
    submissionDate: string;
    submissionYear: string;
    applicationNumber: string;
    grantYear: string;
    grantDate: string;
    grantNumber: string;
    decisionNumber: string;
    unit: string;
}

interface PatentData {
    patents: Patent[];
}

function readData(): PatentData {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

function writeData(data: PatentData): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Handle GET requests
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data.patents); // Return the patents as a JSON response
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch patents' }, { status: 500 });
    }
}

// Handle POST requests for adding a new patent
export async function POST(req: Request) {
    try {
        const newPatent: Patent = await req.json();
        const data = readData();
        data.patents.push(newPatent);
        writeData(data);
        return NextResponse.json({ message: 'Patent added successfully', patent: newPatent }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to add patent' }, { status: 500 });
    }
}

// Handle PUT requests for updating an existing patent
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const patentId = searchParams.get('patentId');
    
    if (!patentId) {
        return NextResponse.json({ message: 'Patent ID is required for updating' }, { status: 400 });
    }

    try {
        const updatedPatent = await req.json();
        const data = readData();
        const patentIndex = data.patents.findIndex(p => p.stt === parseInt(patentId));

        if (patentIndex === -1) {
            return NextResponse.json({ message: 'Patent not found' }, { status: 404 });
        }

        data.patents[patentIndex] = { ...data.patents[patentIndex], ...updatedPatent };
        writeData(data);
        return NextResponse.json({ message: 'Patent updated successfully', patent: data.patents[patentIndex] });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update patent' }, { status: 500 });
    }
}

// Updated DELETE handler using Request and NextResponse
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const patentId = searchParams.get('patentId');

    if (!patentId) {
        return NextResponse.json({ message: 'Patent ID is required for deletion' }, { status: 400 });
    }

    try {
        const data = readData();

        // Filter out the patent to delete
        const updatedPatents = data.patents.filter(p => p.stt !== parseInt(patentId));

        if (updatedPatents.length === data.patents.length) {
            return NextResponse.json({ message: 'Patent not found' }, { status: 404 });
        }

        // Reorder the remaining patents' stt
        const reorderedPatents = updatedPatents.map((patent, index) => ({
            ...patent,
            stt: index + 1, // Reassign stt values sequentially starting from 1
        }));

        // Save the updated list
        data.patents = reorderedPatents;
        writeData(data);

        return NextResponse.json({ message: 'Patent deleted and stt reordered successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete patent' }, { status: 500 });
    }
}
