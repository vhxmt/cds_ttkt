import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm, Fields, Files } from 'formidable';
import { IncomingMessage } from 'http';
import { Readable } from 'stream';

// Path to the directory where uploaded files will be saved
const uploadDir = path.join(process.cwd(), 'public/image/nhan-luc/ctv-nc');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper function to convert NextRequest to a Node.js-readable stream (IncomingMessage-like)
async function nextRequestToIncomingMessage(req: NextRequest): Promise<IncomingMessage> {
    const readable = new Readable();
    readable._read = () => {}; // No-op
    readable.push(Buffer.from(await req.arrayBuffer()));
    readable.push(null);

    // Cast the readable stream to IncomingMessage
    (readable as any).headers = Object.fromEntries(req.headers);
    (readable as any).method = req.method;
    (readable as any).url = req.url;

    return readable as unknown as IncomingMessage;
}

export async function POST(req: NextRequest) {
    const form = new IncomingForm({
        uploadDir,          // The directory where the files will be uploaded
        keepExtensions: true, // Keep file extensions
        // No need for the filename option, the default behavior will retain the original filename
    });

    // Convert NextRequest to IncomingMessage
    const incomingMessage = await nextRequestToIncomingMessage(req);

    return new Promise<NextResponse>((resolve, reject) => {
        form.parse(incomingMessage, (err: Error, fields: Fields, files: Files) => {
            if (err) {
                return reject(NextResponse.json({ message: 'Failed to upload image' }, { status: 500 }));
            }

            // Ensure files.file is defined and is an array
            if (!files.file || !Array.isArray(files.file) || files.file.length === 0) {
                return reject(NextResponse.json({ message: 'No files uploaded' }, { status: 400 }));
            }

            // Get the uploaded file path
            const uploadedFile = files.file[0];
            const imageUrl = `/image/nhan-luc/ctv-nc/${path.basename(uploadedFile.filepath)}`;

            resolve(NextResponse.json({ imageUrl }));
        });
    });
}
