// src/pages/api/tin-tuc-su-kien/su-kien/courses/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
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

// Generate a unique ID based on the current time
const generateUniqueId = (): string => {
  return new Date().getTime().toString();
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get all courses
    const data = readDataFromFile();
    res.status(200).json(data.upcomingCourses);
  } else if (req.method === 'POST') {
    // Add a new course
    try {
      const data = readDataFromFile();
      const newCourse = { id: generateUniqueId(), ...req.body };
      data.upcomingCourses.push(newCourse);
      writeDataToFile(data);
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(500).json({ message: 'Error adding the course' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
