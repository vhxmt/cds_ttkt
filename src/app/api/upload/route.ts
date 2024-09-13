// src/app/api/upload/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to delete the old image file
function deleteOldImage(filePath: string) {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath); // Delete the old image
    }
}

export async function POST(req: Request) {
    try {
        // Parse the form data
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folderPath = formData.get('folderPath') as string;
        const oldFilePath = formData.get('oldFilePath') as string | null;

        if (!file || !folderPath) {
            return NextResponse.json({ message: 'File or folder path is missing' }, { status: 400 });
        }

        // Define the upload directory dynamically based on folderPath
        const uploadDir = path.join(process.cwd(), 'public', folderPath);

        // Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Convert the file to a buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate a unique filename and save the file
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);

        // If an old file path is provided, delete the old image
        if (oldFilePath) {
            deleteOldImage(oldFilePath);
        }

        // Return the file path relative to the public directory
        return NextResponse.json({
            message: 'File uploaded successfully',
            filePath: `/${folderPath}/${fileName}`, // Public URL to the file
        });
    } catch (error) {
        console.error('File upload failed', error);
        return NextResponse.json({ message: 'File upload failed', error }, { status: 500 });
    }
}
