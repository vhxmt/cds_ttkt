// src/pages/api/thiet-bi-va-dung-cu/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file
const jsonFilePath = path.join(process.cwd(), 'src/data/thiet-bi-va-dung-cu/data.json');
const imageFolderPath = path.join(process.cwd(), 'public/image/thiet-bi-va-dung-cu');

// Helper function to read the JSON file
function readData() {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write the JSON file
function writeData(data: any) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Helper function to delete the image file
function deleteImage(imageUrl: string) {
    const imageName = path.basename(imageUrl); // Extract the file name from the URL
    const fullPath = path.join(imageFolderPath, imageName);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath); // Delete the file
        console.log(`Deleted image: ${imageName}`);
    } else {
        console.log(`Image not found: ${imageName}`);
    }
}

// GET method to fetch all tools data
export async function GET(req: NextRequest) {
    const data = readData();
    return NextResponse.json(data);
}

// POST method to add a new tool (to any of the columns)
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { section, newTool } = body;  // Ensure these fields are extracted correctly

    // Validate the request
    if (!section || !newTool || !['toolsTwoCol', 'toolOneCol'].includes(section)) {
        return NextResponse.json({ message: 'Invalid request: Missing or incorrect section or newTool' }, { status: 400 });
    }

    const data = readData();
    const newToolWithId = {
        ...newTool,
        id: new Date().toISOString(),  // Assign a new unique ID
    };

    data[section].unshift(newToolWithId);  // Add the new tool to the top of the respective section
    writeData(data);

    return NextResponse.json({ message: 'Tool added successfully', tool: newToolWithId }, { status: 201 });
}


// PUT method to edit an existing tool by ID
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { section, id, updatedTool } = body;

    if (!section || !updatedTool || !id || !['toolsTwoCol', 'toolOneCol'].includes(section)) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();
    const toolIndex = data[section].findIndex((tool: any) => tool.id === id);

    if (toolIndex === -1) {
        return NextResponse.json({ message: 'Tool not found' }, { status: 404 });
    }

    // Delete old image if a new image has been uploaded
    const oldTool = data[section][toolIndex];
    if (oldTool.imgSrc && oldTool.imgSrc !== updatedTool.imgSrc) {
        deleteImage(oldTool.imgSrc); // Delete the old image
    }

    data[section][toolIndex] = updatedTool;
    writeData(data);

    return NextResponse.json({ message: 'Tool updated successfully', tool: updatedTool }, { status: 200 });
}

// DELETE method to delete a tool by ID
export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const section = searchParams.get('section');
    const id = searchParams.get('id');

    if (!section || id === null || !['toolsTwoCol', 'toolOneCol'].includes(section)) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();
    const toolIndex = data[section].findIndex((tool: any) => tool.id === id);

    if (toolIndex === -1) {
        return NextResponse.json({ message: 'Tool not found' }, { status: 404 });
    }

    // Delete associated image file
    const toolToDelete = data[section][toolIndex];
    if (toolToDelete.imgSrc) {
        deleteImage(toolToDelete.imgSrc);
    }

    data[section].splice(toolIndex, 1); // Remove the tool
    writeData(data);

    return NextResponse.json({ message: 'Tool deleted successfully' });
}
