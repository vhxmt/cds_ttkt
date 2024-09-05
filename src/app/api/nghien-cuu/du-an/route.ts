// src/pages/api/nghien-cuu/du-an/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server'; // Import necessary types

export interface Project {
    id: string; // Unique identifier
    duration: string;
    title: string;
    details: string[];
}

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/nghien-cuu/du-an/data.json');

//read data from JSON file
const readData = (): Project[] => {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData).projects;
};

// write data to JSON file
const writeData = (projects: Project[]) => {
    const jsonData = JSON.stringify({ projects }, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
};

export async function GET(req: NextRequest) {
    const projects = readData();
    return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newProject: Project = {
        ...body,
        id: new Date().toISOString(), // Add a unique timestamp as the ID
    };

    if (!newProject.title || !newProject.duration || !newProject.details) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const projects = readData();
    projects.push(newProject);
    writeData(projects);

    return NextResponse.json({ message: 'Project added successfully', project: newProject }, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const id = req.nextUrl.searchParams.get('id'); // Extract ID from query parameters
    const updatedProject: Project = body;

    if (!id || !updatedProject.title || !updatedProject.duration || !updatedProject.details) {
        return NextResponse.json({ message: 'Missing required fields or ID' }, { status: 400 });
    }

    const projects = readData();
    const projectIndex = projects.findIndex((project) => project.id === id); // Find by ID

    if (projectIndex === -1) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    projects[projectIndex] = { ...updatedProject, id }; // Preserve the original ID
    writeData(projects);

    return NextResponse.json({ message: 'Project updated successfully', project: updatedProject });
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id'); // Extract ID from query parameters

    if (!id) {
        return NextResponse.json({ message: 'Missing project ID' }, { status: 400 });
    }

    const projects = readData();
    const projectIndex = projects.findIndex((project) => project.id === id); // Find by ID

    if (projectIndex === -1) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    projects.splice(projectIndex, 1); // Remove the project from the array
    writeData(projects);

    return NextResponse.json({ message: 'Project deleted successfully' });
}

