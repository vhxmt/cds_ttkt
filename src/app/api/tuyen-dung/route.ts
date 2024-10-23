// src/pages/api/tuyen-dung/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Paths to the JSON files for recruitment details and positions
const detailsFilePath = path.join(process.cwd(), 'src/data/tuyen-dung/recruitmentDetails.json');
const positionsFilePath = path.join(process.cwd(), 'src/data/tuyen-dung/positions.json');

// Helper function to read the JSON file
function readJsonFile(filePath: string) {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write the JSON file
function writeJsonFile(filePath: string, data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET method to fetch all recruitment data
export async function GET(req: NextRequest) {
    try {
        const recruitmentDetails = readJsonFile(detailsFilePath);
        const positionsData = readJsonFile(positionsFilePath);

        return NextResponse.json({
            ...recruitmentDetails,
            positions: positionsData.positions,
        });
    } catch (error) {
        console.error('Error fetching recruitment data:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// PUT method to update recruitment details or a specific position
export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id'); // Get the position ID from the query string

        const body = await req.json();
        const { description, bannerSrc, title, requirements } = body;

        // Log received data for debugging
        console.log('Received data for PUT:', { id, description, bannerSrc, title, requirements });

        if (id) {
            // Handle position update by ID
            const positionsData = readJsonFile(positionsFilePath);
            const positionIndex = positionsData.positions.findIndex((pos: any) => pos.id === id);

            if (positionIndex === -1) {
                return NextResponse.json({ message: 'Position not found' }, { status: 404 });
            }

            // Update the position data
            if (title) positionsData.positions[positionIndex].title = title;
            if (description) positionsData.positions[positionIndex].description = description;
            if (requirements) positionsData.positions[positionIndex].requirements = Array.isArray(requirements)
                ? requirements.join('\n')
                : requirements;

            // Write the updated data back to the file
            writeJsonFile(positionsFilePath, positionsData);

            return NextResponse.json({ message: 'Position updated successfully' });
        } else {
            // Handle recruitment details update
            if (!description || !bannerSrc || !title) {
                return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
            }

            const detailsData = readJsonFile(detailsFilePath);

            // Update recruitment details
            detailsData.description = description;
            detailsData.bannerSrc = bannerSrc;
            detailsData.title = title;

            // Write updated details back to the file
            writeJsonFile(detailsFilePath, detailsData);

            return NextResponse.json({ message: 'Recruitment details updated successfully' });
        }
    } catch (error) {
        console.error('Error updating recruitment data:', error);
        return NextResponse.json({ message: 'Server error', error: (error as Error).message }, { status: 500 });
    }
}


// POST method to add a new recruitment position
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, requirements } = body;

        // Log received data
        console.log('Received data:', { title, description, requirements });

        // Validate new position data
        if (!title || !description || !requirements || !Array.isArray(requirements)) {
            console.error('Missing required fields:', { title, description, requirements });
            return NextResponse.json({ message: 'Invalid request: Missing position data' }, { status: 400 });
        }

        const positionsData = readJsonFile(positionsFilePath);

        // Convert the requirements array to a single string separated by newlines
        const formattedRequirements = requirements.join('\n');

        // Add a unique ID to the new position
        const newPosition = {
            id: String(Date.now()),
            title,
            description,
            requirements: formattedRequirements,  // Store as a single string
        };
        
        positionsData.positions.push(newPosition);

        // Log the new position being added
        console.log('New position:', newPosition);

        // Write updated positions back to the file
        writeJsonFile(positionsFilePath, positionsData);

        return NextResponse.json({ message: 'Position added successfully', position: newPosition }, { status: 201 });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Server error', error: (error as Error).message }, { status: 500 });
    }
}



// DELETE method to remove a recruitment position by ID
export async function DELETE(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Invalid request: Missing ID' }, { status: 400 });
        }

        const positionsData = readJsonFile(positionsFilePath);
        const positionIndex = positionsData.positions.findIndex((pos: any) => pos.id === id);

        if (positionIndex === -1) {
            return NextResponse.json({ message: 'Position not found' }, { status: 404 });
        }

        // Remove the position from the list
        positionsData.positions.splice(positionIndex, 1);

        // Write the updated positions data back to the file
        writeJsonFile(positionsFilePath, positionsData);

        return NextResponse.json({ message: 'Position deleted successfully' });
    } catch (error) {
        console.error('Error deleting recruitment position:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
