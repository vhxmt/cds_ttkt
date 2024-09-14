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

// POST: Add a new lab or a new category
export async function POST(req: NextRequest) {
    try {
        const { lab, categoryTitle } = await req.json();

        const data = readData();

        // If only categoryTitle is provided, add a new category
        if (categoryTitle && !lab) {
            const existingCategory = data.labCategories.find(cat => cat.title === categoryTitle);

            if (existingCategory) {
                return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
            }

            const newCategory = { title: categoryTitle, data: [] }; // New empty category
            data.labCategories.push(newCategory);
            writeData(data);

            return NextResponse.json(newCategory, { status: 201 });
        }

        // If lab and categoryTitle are provided, add a new lab
        if (!lab || !categoryTitle) {
            return NextResponse.json({ message: 'Missing lab data or category' }, { status: 400 });
        }

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

// DELETE: Remove a lab by ID or delete an entire category
export async function DELETE(req: NextRequest) {
    try {
        const idParam = req.nextUrl.searchParams.get('id'); // Get the lab ID from query params
        let categoryTitle: string | null = null;

        // Only attempt to parse the body if it's needed (for category deletion)
        if (req.method === 'DELETE' && !idParam) {
            try {
                const body = await req.json();
                categoryTitle = body?.categoryTitle;
            } catch (error) {
                // Ignore the error if no body is present, as it's optional
            }
        }

        const data = readData();

        // Handle deleting a single lab by ID
        if (idParam) {
            const labId = parseInt(idParam);
            if (isNaN(labId)) {
                return NextResponse.json({ message: 'Invalid lab ID' }, { status: 400 });
            }

            let labFound = false;

            // Iterate over categories to find and remove the lab
            data.labCategories = data.labCategories.map((category) => {
                const filteredData = category.data.filter(lab => lab.id !== labId); // Remove lab by ID

                if (filteredData.length !== category.data.length) {
                    labFound = true;
                }

                // Reassign IDs sequentially to avoid gaps
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
        }

        // Handle deleting the entire category
        if (categoryTitle) {
            const updatedCategories = data.labCategories.filter(category => category.title !== categoryTitle);

            if (updatedCategories.length === data.labCategories.length) {
                return NextResponse.json({ message: 'Category not found' }, { status: 404 });
            }

            data.labCategories = updatedCategories; // Update categories after deletion
            writeData(data); // Save the updated data

            return NextResponse.json({ message: 'Category deleted successfully' });
        }
    } catch (error) {
        console.error('Error processing DELETE request:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

