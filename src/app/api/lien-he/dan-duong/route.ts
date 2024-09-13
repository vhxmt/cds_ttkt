import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Define the Lab interface
export interface Lab {
    id: number;
    name: string;
    location: string;
    leader: string;
    contactInfo: string;
    postalCode: string;
}

// Define the structure for the categories and headers
interface LabCategory {
    title: string;
    data: Lab[];
}

interface LabData {
    headers: string[];
    labCategories: LabCategory[];
}

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/lien-he/dan-duong.json');

// Helper function to read the JSON data
const readData = (): LabData => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
};

// Helper function to write the JSON data
const writeData = (data: LabData) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
};

// GET: Fetch all labs and categories
export async function GET() {
    const data = readData();
    return NextResponse.json(data);
}

// POST: Add a new lab or update a lab
export async function POST(req: NextRequest) {
    try {
        const { lab, categoryTitle } = await req.json();

        if (!lab || !categoryTitle) {
            return NextResponse.json({ message: 'Missing lab data or category' }, { status: 400 });
        }

        const data = readData();
        const category = data.labCategories.find(cat => cat.title === categoryTitle);

        if (!category) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }

        // Assign the next available integer ID
        const newLabId = category.data.length + 1;
        const newLab = { ...lab, id: newLabId };

        category.data.push(newLab);
        writeData(data);

        return NextResponse.json(newLab, { status: 201 });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Update an existing lab
export async function PUT(req: NextRequest) {
    try {
        const { lab, categoryTitle } = await req.json();

        if (!lab || !categoryTitle || !lab.id) {
            return NextResponse.json({ message: 'Missing lab data or category or ID' }, { status: 400 });
        }

        const data = readData();
        const category = data.labCategories.find(cat => cat.title === categoryTitle);

        if (!category) {
            return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }

        const labIndex = category.data.findIndex(existingLab => existingLab.id === lab.id);

        if (labIndex === -1) {
            return NextResponse.json({ message: 'Lab not found' }, { status: 404 });
        }

        category.data[labIndex] = { ...lab }; // Update the lab
        writeData(data);

        return NextResponse.json(lab, { status: 200 });
    } catch (error) {
        console.error('Error processing PUT request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Remove a lab by ID from the given category
export async function DELETE(req: NextRequest) {
    try {
        const idParam = req.nextUrl.searchParams.get('id'); // Get the lab id from query params
        if (!idParam) {
            return NextResponse.json({ message: 'Lab ID is required' }, { status: 400 });
        }
        const labId = parseInt(idParam); // Convert the id to a number
        if (isNaN(labId)) {
            return NextResponse.json({ message: 'Invalid lab ID' }, { status: 400 });
        }

        const data = readData();

        let labFound = false; // Track if the lab was found and deleted

        // Iterate over categories to find and remove the lab
        data.labCategories = data.labCategories.map((category) => {
            const filteredData = category.data.filter(lab => lab.id !== labId); // Remove lab by ID

            if (filteredData.length !== category.data.length) {
                labFound = true;
            }

            // Reassign ids sequentially to avoid gaps
            const updatedData = filteredData.map((lab, index) => ({
                ...lab,
                id: index + 1,
            }));

            return { ...category, data: updatedData };
        });

        if (!labFound) {
            return NextResponse.json({ message: 'Lab not found' }, { status: 404 });
        }

        writeData(data); // Save the updated data
        return NextResponse.json({ message: 'Lab deleted successfully' });
    } catch (error) {
        console.error('Error deleting lab:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}