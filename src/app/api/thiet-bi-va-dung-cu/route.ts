// src/pages/api/tuyen-dung/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file for recruitment data
const jsonFilePath = path.join(process.cwd(), 'src/data/tuyen-dung/tuyen-dung.json');

// Helper function to read the JSON file
function readData() {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write the JSON file
function writeData(data: any) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// POST method to add a new recruitment position with image upload
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const newPosition = {
            title: formData.get('title'),
            description: formData.get('description'),
            requirements: JSON.parse(formData.get('requirements') as string || '[]'),
        };

        // Validate new position data
        if (!newPosition.title || !newPosition.description || !newPosition.requirements) {
            return NextResponse.json({ message: 'Invalid request: Missing position data' }, { status: 400 });
        }

        // Handle file upload
        const file = formData.get('file') as File | null;
        let imageUrl = '';

        if (file) {
            // Define the upload directory dynamically
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'tuyen-dung');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(uploadDir, fileName);

            fs.writeFileSync(filePath, buffer);
            imageUrl = `/uploads/tuyen-dung/${fileName}`;
        }

        const data = readData();

        // Add a unique ID and image URL to the new position
        const newPositionWithId = {
            ...newPosition,
            id: String(Date.now()),
            imageUrl,
        };

        data.recruitmentData.positions.push(newPositionWithId);

        // Write the updated data to the JSON file
        writeData(data);

        return NextResponse.json({ message: 'Position added successfully', position: newPositionWithId }, { status: 201 });
    } catch (error) {
        console.error('Error processing POST request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// PUT method to update an existing recruitment position with image upload
export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const id = formData.get('id');
        const updatedPosition = {
            title: formData.get('title'),
            description: formData.get('description'),
            requirements: JSON.parse(formData.get('requirements') as string || '[]'),
        };

        if (!id || !updatedPosition.title || !updatedPosition.description) {
            return NextResponse.json({ message: 'Invalid request: Missing ID or position data' }, { status: 400 });
        }

        const data = readData();
        const positionIndex = data.recruitmentData.positions.findIndex((pos: any) => pos.id === id);

        if (positionIndex === -1) {
            return NextResponse.json({ message: 'Position not found' }, { status: 404 });
        }

        // Handle file upload
        const file = formData.get('file') as File | null;
        let imageUrl = data.recruitmentData.positions[positionIndex].imageUrl; // Keep the existing image URL

        if (file) {
            // Delete the old image if a new one is uploaded
            const oldImage = imageUrl;
            if (oldImage) {
                const oldImagePath = path.join(process.cwd(), 'public', oldImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Upload the new image
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'tuyen-dung');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(uploadDir, fileName);

            fs.writeFileSync(filePath, buffer);
            imageUrl = `/uploads/tuyen-dung/${fileName}`;
        }

        // Update the position with new data and image URL
        data.recruitmentData.positions[positionIndex] = {
            ...data.recruitmentData.positions[positionIndex],
            ...updatedPosition,
            imageUrl,
        };

        // Write the updated data to the JSON file
        writeData(data);

        return NextResponse.json({ message: 'Position updated successfully', position: data.recruitmentData.positions[positionIndex] }, { status: 200 });
    } catch (error) {
        console.error('Error processing PUT request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
