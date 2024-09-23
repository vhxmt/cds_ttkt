// src/utils/crudUtils.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Helper function to get the file path
function getFilePath(subPath: string): string {
    return path.join(process.cwd(), `src/data/${subPath}/cooperationEventData.json`);
}

// Helper function to get the image folder path
function getImageFolderPath(subPath: string): string {
    return path.join(process.cwd(), 'public', 'image', subPath);
}

// Helper function to read data from JSON file
export function readData(subPath: string): any {
    const filePath = getFilePath(subPath);
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Error reading the data file at ${filePath}:`, error);
        return { cooperationEventData: [] };
    }
}

// Helper function to write data to JSON file
export function writeData(subPath: string, data: any): void {
    const filePath = getFilePath(subPath);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing to the data file at ${filePath}:`, error);
    }
}

// Helper function to delete image file
export function deleteImage(subPath: string, imageUrl: string): void {
    const imageName = path.basename(imageUrl);
    const fullPath = path.join(getImageFolderPath(subPath), imageName);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`Deleted image: ${imageName}`);
    } else {
        console.log(`Image not found: ${imageName}`);
    }
}

// Function to add a new event
export async function addEvent(req: NextRequest, subPath: string): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { newEvent } = body;

        if (!newEvent || !newEvent.title || !newEvent.date || !newEvent.imageSrc || !newEvent.href) {
            return NextResponse.json({ message: 'Invalid request: Missing fields' }, { status: 400 });
        }

        const data = readData(subPath);
        const newEventWithId = {
            ...newEvent,
            id: new Date().toISOString(),
        };

        data.cooperationEventData.unshift(newEventWithId);
        writeData(subPath, data);

        return NextResponse.json({ message: 'Event added successfully', event: newEventWithId }, { status: 201 });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// Function to update an event by ID
export async function updateEvent(req: NextRequest, subPath: string): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { id, updatedEvent } = body;

        if (!id || !updatedEvent || !updatedEvent.title || !updatedEvent.date || !updatedEvent.imageSrc || !updatedEvent.href) {
            return NextResponse.json({ message: 'Invalid request: Missing fields' }, { status: 400 });
        }

        const data = readData(subPath);
        const eventIndex = data.cooperationEventData.findIndex((event: any) => event.id === id);

        if (eventIndex === -1) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        const oldEvent = data.cooperationEventData[eventIndex];

        if (oldEvent.imageSrc && oldEvent.imageSrc !== updatedEvent.imageSrc) {
            deleteImage(subPath, oldEvent.imageSrc);
        }

        data.cooperationEventData[eventIndex] = {
            ...oldEvent,
            ...updatedEvent,
            imageSrc: updatedEvent.imageSrc || oldEvent.imageSrc,
            href: updatedEvent.href || oldEvent.href,
        };

        writeData(subPath, data);

        return NextResponse.json({ message: 'Event updated successfully', event: data.cooperationEventData[eventIndex] }, { status: 200 });
    } catch (error) {
        console.error('Error processing PUT request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// Function to delete an event by ID
export async function deleteEvent(req: NextRequest, subPath: string): Promise<NextResponse> {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Invalid request: Missing ID' }, { status: 400 });
    }

    const data = readData(subPath);
    const eventIndex = data.cooperationEventData.findIndex((event: any) => event.id === id);

    if (eventIndex === -1) {
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const eventToDelete = data.cooperationEventData[eventIndex];
    if (eventToDelete.imageSrc) {
        deleteImage(subPath, eventToDelete.imageSrc);
    }

    data.cooperationEventData.splice(eventIndex, 1);
    writeData(subPath, data);

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
}
