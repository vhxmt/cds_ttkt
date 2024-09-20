// src/pages/api/tuyen-dung/submit.ts
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Path to the JSON file for saving recruitment data
const jsonFilePath = path.join(process.cwd(), 'src/data/tuyen-dung/list/data.json');

// Helper function to read the JSON file
function readData() {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(jsonData);
}

// Helper function to write the JSON file
function writeData(data: any) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// Helper function to get the current date and time
function getCurrentDate() {
    return new Date().toISOString(); // Return current date and time in ISO format
}

// POST method to save form data
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, phone, email, researchDirection, position, questions } = body;

        // Validate required fields
        if (!name || !phone || !email) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newApplicant = {
            hoTen: name,
            soDienThoai: phone,
            email: email,
            dinhHuongNghienCuu: researchDirection,
            viTriDangKy: position,
            cauHoiThacMac: questions,
            ngayDangKy: getCurrentDate() // Add current date and time
        };

        // Read existing data
        const data = readData();

        // Add new applicant to the list
        data.RecruitData.push(newApplicant);

        // Write updated data back to the file
        writeData(data);

        return NextResponse.json({ message: 'Form submitted successfully', newApplicant }, { status: 201 });
    } catch (error) {
        console.error('Error saving recruitment data:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
