// src/pages/api/nghien-cuu/bang-sang-che/route.ts
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'src/data/nghien-cuu/bang-sang-che/data.json');

// Define interfaces for the data structure
interface Patent {
    stt: number;
    author: string;
    type: string;
    title: string;
    submissionDate: string;
    submissionYear: string;
    applicationNumber: string;
    grantYear: string;
    grantDate: string;
    grantNumber: string;
    decisionNumber: string;
    unit: string;
}

interface PatentData {
    patents: Patent[];
}

function readData(): PatentData {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

function writeData(data: PatentData): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method, body } = req;
    const { patentId } = query as { patentId?: string };

    const data = readData();

    switch (method) {
        case 'GET':
            if (patentId) {
                const patent = data.patents.find(p => p.stt === parseInt(patentId));
                if (!patent) {
                    res.status(404).json({ message: 'Patent not found' });
                    return;
                }
                res.status(200).json(patent);
            } else {
                res.status(200).json(data.patents);
            }
            break;

        case 'POST':
            const newPatent: Patent = body;
            data.patents.unshift(newPatent);
            writeData(data);
            res.status(201).json({ message: 'Patent added successfully', patent: newPatent });
            break;

        case 'PUT':
            if (patentId) {
                const patentIndex = data.patents.findIndex(p => p.stt === parseInt(patentId));
                if (patentIndex === -1) {
                    res.status(404).json({ message: 'Patent not found' });
                    return;
                }
                data.patents[patentIndex] = { ...data.patents[patentIndex], ...body };
                writeData(data);
                res.status(200).json({ message: 'Patent updated successfully', patent: data.patents[patentIndex] });
            } else {
                res.status(400).json({ message: 'Patent ID is required for updating' });
            }
            break;

        case 'DELETE':
            if (patentId) {
                const updatedPatents = data.patents.filter(p => p.stt !== parseInt(patentId));
                if (updatedPatents.length === data.patents.length) {
                    res.status(404).json({ message: 'Patent not found' });
                    return;
                }
                data.patents = updatedPatents;
                writeData(data);
                res.status(200).json({ message: 'Patent deleted successfully' });
            } else {
                res.status(400).json({ message: 'Patent ID is required for deletion' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

