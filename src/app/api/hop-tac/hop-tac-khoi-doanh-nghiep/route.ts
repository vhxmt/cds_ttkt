import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file and images folder
const jsonFilePath = path.join(process.cwd(), 'src/data/hop-tac/hop-tac-khoi-doanh-nghiep/cooperationEventData.json');
const imageFolderPath = path.join(process.cwd(), 'public/image/hop-tac/hop-tac-khoi-doanh-nghiep');

// Helper function to read the JSON file
function readData() {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write to the JSON file
function writeData(data: any) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Helper function to delete image
function deleteImage(imageUrl: string) {
    const imageName = path.basename(imageUrl); 
    const fullPath = path.join(imageFolderPath, imageName);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`Deleted image: ${imageName}`);
    } else {
        console.log(`Image not found: ${imageName}`);
    }
}

// GET method to fetch all cooperation events
export async function GET(req: NextRequest) {
    const data = readData();
    return NextResponse.json(data);
}

// POST method to add a new cooperation event
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { newEvent } = body; // Ensure this matches the structure sent from the frontend

        if (!newEvent || !newEvent.title || !newEvent.date || !newEvent.imageSrc) {
            return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
        }

        const data = readData();

        const newEventWithId = {
            ...newEvent,
            id: new Date().toISOString(), // Generate ID based on the creation date
        };

        data.cooperationEventData.unshift(newEventWithId); // Add new event at the beginning
        writeData(data); // Write data to the JSON file

        return NextResponse.json({ message: 'Event added successfully', event: newEventWithId }, { status: 201 });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// PUT method to edit an existing cooperation event by ID
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, updatedEvent } = body;

        if (!id || !updatedEvent || !updatedEvent.title || !updatedEvent.date || !updatedEvent.imageSrc) {
            return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
        }

        const data = readData();
        const eventIndex = data.cooperationEventData.findIndex((event: any) => event.id === id);

        if (eventIndex === -1) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        const oldEvent = data.cooperationEventData[eventIndex];

        // Delete the old image if the imageSrc has changed
        if (oldEvent.imageSrc && oldEvent.imageSrc !== updatedEvent.imageSrc) {
            deleteImage(oldEvent.imageSrc); // Delete the old image
        }

        data.cooperationEventData[eventIndex] = {
            ...oldEvent,
            ...updatedEvent,
            imageSrc: updatedEvent.imageSrc || oldEvent.imageSrc // Ensure imageSrc is updated
        };

        writeData(data);

        return NextResponse.json({ message: 'Event updated successfully', event: updatedEvent }, { status: 200 });
    } catch (error) {
        console.error('Error processing PUT request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// DELETE method to delete a cooperation event by ID
export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const data = readData();
    const eventIndex = data.cooperationEventData.findIndex((event: any) => event.id === id);

    if (eventIndex === -1) {
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const eventToDelete = data.cooperationEventData[eventIndex];
    if (eventToDelete.imageSrc) {
        deleteImage(eventToDelete.imageSrc);
    }

    data.cooperationEventData.splice(eventIndex, 1);
    writeData(data);

    return NextResponse.json({ message: 'Event deleted successfully' });
}
