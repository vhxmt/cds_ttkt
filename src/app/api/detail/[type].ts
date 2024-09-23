import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'src/data/detail');

// Helper function to read JSON files based on type
function getDataByType(type: string) {
    const filePath = path.join(dataDirectory, `${type}.json`);
    if (fs.existsSync(filePath)) {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
    }
    return null;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { type } = req.query;

    if (!type || Array.isArray(type)) {
        return res.status(400).json({ message: 'Invalid type parameter' });
    }

    const data = getDataByType(type);

    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: `No data found for type: ${type}` });
    }
}
