import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import { IncomingMessage } from 'http';

// Path to the directory where uploaded files will be saved
const uploadDir = path.join(process.cwd(), 'public/image/nhan-luc/can-bo');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Formidable options
const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true, // Keep file extensions
    filename: (name, ext, part, form) => `${Date.now()}_${part.originalFilename}`
});

export async function POST(req: NextRequest) {
    return new Promise<NextResponse>((resolve, reject) => {
        form.parse(req as unknown as IncomingMessage, (err, fields, files) => {
            if (err) {
                return reject(NextResponse.json({ message: 'Failed to upload image' }, { status: 500 }));
            }

            // Ensure files.file is defined and is an array
            if (!files.file || !Array.isArray(files.file) || files.file.length === 0) {
                return reject(NextResponse.json({ message: 'No files uploaded' }, { status: 400 }));
            }

            // Get the uploaded file path
            const uploadedFile = files.file[0];
            const imageUrl = `/image/nhan-luc/can-bo/${path.basename(uploadedFile.filepath)}`;

            resolve(NextResponse.json({ imageUrl }));
        });
    });
}
