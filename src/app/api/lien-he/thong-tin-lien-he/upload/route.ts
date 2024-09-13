// src/app/api/lien-he/thong-tin-lien-he/upload/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the upload directory
const uploadDir = path.join(process.cwd(), 'public/image/lien-he/thong-tin-lien-he/');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: Request) {
    try {
        // Parse the form data
        const formData = await req.formData();
        const bannerFile = formData.get('banner') as File;

        if (!bannerFile) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        // Convert the file to a buffer
        const arrayBuffer = await bannerFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate a unique filename and save the file
        const fileName = `${Date.now()}-${bannerFile.name}`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);

        // Return the file path to the client
        return NextResponse.json({
            message: 'Banner uploaded successfully',
            filePath: `/image/lien-he/thong-tin-lien-he/${fileName}`,
        });
    } catch (error) {
        return NextResponse.json({ message: 'Banner upload failed', error }, { status: 500 });
    }
}
