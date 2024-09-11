// src/pages/api/thiet-bi-va-dung-cu/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file
const jsonFilePath = path.join(process.cwd(), 'src/data/thiet-bi-va-dung-cu/data.json');

// Helper function to read the JSON file
function readData() {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write the JSON file
function writeData(data: any) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET method to fetch all tools data
export async function GET(req: NextRequest) {
    const data = readData();
    return NextResponse.json(data);
}

// POST method to add a new tool (to any of the columns)
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { section, newTool } = body;

    // Validate the request
    if (!section || !newTool || !['toolsTwoCol', 'toolsThreeCol', 'toolOneCol'].includes(section)) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();
    
    // Generate an ID based on current date and time
    const newToolWithId = {
        ...newTool,
        id: new Date().toISOString()
    };

    if (section === 'toolOneCol') {
        data[section] = newToolWithId;
    } else {
        data[section].unshift(newToolWithId);  // Add the new tool to the top of the respective section
    }

    writeData(data);

    return NextResponse.json({ message: 'Tool added successfully', tool: newToolWithId }, { status: 201 });
}

// PUT method to edit an existing tool by ID
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { section, id, updatedTool } = body;

    // Validate the request
    if (!section || !updatedTool || !id || !['toolsTwoCol', 'toolsThreeCol', 'toolOneCol'].includes(section)) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();

    if (section === 'toolOneCol') {
        data[section] = updatedTool;
    } else {
        const toolIndex = data[section].findIndex((tool: any) => tool.id === id);
        if (toolIndex === -1) {
            return NextResponse.json({ message: 'Tool not found' }, { status: 404 });
        }
        data[section][toolIndex] = updatedTool;
    }

    writeData(data);

    return NextResponse.json({ message: 'Tool updated successfully', tool: updatedTool }, { status: 200 });
}

// DELETE method to delete a tool by ID
export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const section = searchParams.get('section'); // Get the 'section' from the query
    const id = searchParams.get('id'); // Get the 'id' from the query

    if (!section || id === null || !['toolsTwoCol', 'toolsThreeCol', 'toolOneCol'].includes(section)) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();

    if (section === 'toolOneCol') {
        data[section] = {};  // Reset to an empty object
    } else {
        const toolIndex = data[section].findIndex((tool: any) => tool.id === id);
        if (toolIndex === -1) {
            return NextResponse.json({ message: 'Tool not found' }, { status: 404 });
        }
        data[section].splice(toolIndex, 1);  // Remove the tool by index
    }

    writeData(data);

    return NextResponse.json({ message: 'Tool deleted successfully' });
}
