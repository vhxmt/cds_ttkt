import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Define the path to the JSON file and the directory for uploaded images
const jsonFilePath = path.join(process.cwd(), 'src/data/lien-he/thong-tin-lien-he.json');
const uploadDir = path.join(process.cwd(), 'public/image/lien-he/thong-tin-lien-he');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define the unified interface for the data
interface ContactData {
    schoolName: string;
    address: string;
    phone: string;
    officeHours: string;
    email: string;
    facebookPage: string;
    bannerImageSrc: string;
    bannerAltText: string;
    bannerWidth: number;
    bannerHeight: number;
}

// Helper function to read the JSON file
function readData(): ContactData {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write to the JSON file
function writeData(data: ContactData): void {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Handle GET request - Fetch contact data
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch contact data' }, { status: 500 });
    }
}

// Handle PUT request - Update contact data and optionally upload a new banner
export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const contactInfoString = formData.get('contactInfo');
        const bannerFile = formData.get('banner') as File | null;

        // Ensure contact info exists and parse it
        if (!contactInfoString) {
            return NextResponse.json({ message: 'Missing contact info' }, { status: 400 });
        }
        const updatedContactInfo = JSON.parse(contactInfoString.toString()) as ContactData;

        // Read current data
        const data = readData();

        // Update contact info
        Object.assign(data, updatedContactInfo);

        // Handle banner upload if a new banner is provided
        if (bannerFile) {
            const bannerFileName = `${Date.now()}-${bannerFile.name}`;
            const bannerFilePath = path.join(uploadDir, bannerFileName);
            const buffer = Buffer.from(await bannerFile.arrayBuffer());

            // Save the new banner file
            fs.writeFileSync(bannerFilePath, buffer);

            // Update the banner info in the JSON
            data.bannerImageSrc = `/image/lien-he/thong-tin-lien-he/${bannerFileName}`;
        }

        // Write updated data back to the JSON file
        writeData(data);

        return NextResponse.json({ message: 'Contact information updated successfully', data });
    } catch (error) {
        console.error('Failed to update contact information:', error);
        return NextResponse.json({ message: 'Failed to update contact information' }, { status: 500 });
    }
}
