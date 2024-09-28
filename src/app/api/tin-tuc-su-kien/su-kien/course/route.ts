// src/app/api/tin-tuc-su-kien/su-kien/course/route.ts

import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Path to the JSON file
const filePath = path.join(process.cwd(), 'src/data/tin-tuc-su-kien/su-kien/khoa-hoc-body.json');

// Function to read the data from the JSON file
const readDataFromFile = () => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

// Function to write the data to the JSON file
const writeDataToFile = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Generate a unique ID based on the current date and time
const generateUniqueId = (): string => {
  return new Date().toISOString(); // Returns the current date and time in ISO format
};

// Handler for GET method
export async function GET(req: NextRequest) {
  try {
    const data = readDataFromFile();
    return NextResponse.json(data.Courses);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

// Handler for POST method
export async function POST(req: NextRequest) {
  try {
    const data = readDataFromFile();
    const newCourse = { id: generateUniqueId(), ...await req.json() };
    data.Courses.unshift(newCourse);
    writeDataToFile(data);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding the course' }, { status: 500 });
  }
}

// Handler for PUT method
export async function PUT(req: NextRequest) {
  try {
    const data = readDataFromFile();
    const { id, ...updatedCourse } = await req.json();
    const index = data.Courses.findIndex((course: any) => course.id === id);

    if (index === -1) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    data.Courses[index] = { ...data.Courses[index], ...updatedCourse };
    writeDataToFile(data);
    return NextResponse.json(data.Courses[index]);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating the course' }, { status: 500 });
  }
}

// Handler for DELETE method
export async function DELETE(req: NextRequest) {
  try {
    const data = readDataFromFile();
    const { id } = await req.json();
    const index = data.Courses.findIndex((course: any) => course.id === id);

    if (index === -1) {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }

    data.Courses.splice(index, 1);
    writeDataToFile(data);
    return NextResponse.json({ message: 'Course deleted successfully' }, { status: 200 }); // Return 200 instead of 204 for clarity
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting the course', error: error.message }, { status: 500 });
  }
}

