import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const filePath = path.join(process.cwd(), 'src/data/nghien-cuu/huong-nghien-cuu/data.json');

// Define interfaces for the data structure
interface ResearchArea {
    name: string;
    description?: string;
    highlight?: boolean;
    relatedNews: RelatedNews[];
}

interface RelatedNews {
    id: number;
    title: string;
    description: string;
    link: string;
}

interface ResearchData {
    title: string;
    description: string;
    researchAreas: ResearchArea[];
}

function readData(): ResearchData {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

function writeData(data: ResearchData): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, method, body } = req;
    const { areaName, newsId } = query as { areaName?: string; newsId?: string };

    const data = readData();

    switch (method) {
        case 'GET':
            if (areaName) {
                const area = data.researchAreas.find(area => area.name === areaName);
                if (!area) {
                    res.status(404).json({ message: 'Research area not found' });
                    return;
                }
                res.status(200).json(area);
            } else {
                res.status(200).json(data.researchAreas);
            }
            break;

        case 'POST':
            // Logic for POST method
            break;

        case 'PUT':
            // Logic for PUT method
            break;

        case 'DELETE':
            // Logic for DELETE method
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
