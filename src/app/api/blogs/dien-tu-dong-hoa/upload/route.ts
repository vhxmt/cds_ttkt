// src/app/api/upload/route.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const imageFolderPath = path.join(process.cwd(), 'public/image/blog/dien-tu-dong-hoa');

// Ensure that the folder exists
if (!fs.existsSync(imageFolderPath)) {
    fs.mkdirSync(imageFolderPath, { recursive: true });
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(imageFolderPath, fileName);

    // Write the uploaded file to the file system
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/image/blog/dien-tu-dong-hoa/${fileName}`;

    return NextResponse.json({ imageUrl });
}
