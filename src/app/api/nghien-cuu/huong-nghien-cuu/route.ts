import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'src/data/nghien-cuu/huong-nghien-cuu/data.json');

interface ResearchArea {
    name: string;
    description?: string;
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
    researchAreas: ResearchArea[];
}

function readData(): ResearchData {
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
}

function writeData(data: ResearchData): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Handle GET requests
export async function GET(req: NextRequest) {
    const data = readData();
    return NextResponse.json(data);
}

// Handle POST requests
export async function POST(req: NextRequest) {
    const body = await req.json();
    const data = readData();

    if (body.type === 'area') {
        const newArea: ResearchArea = body.area;
        data.researchAreas.push(newArea);
        writeData(data);
        return NextResponse.json({ message: 'Research area added successfully' }, { status: 201 });
    } else if (body.type === 'news') {
        const areaName = body.areaName;
        const area = data.researchAreas.find((area) => area.name === areaName);
        if (!area) {
            return NextResponse.json({ message: 'Research area not found' }, { status: 404 });
        }

        if (!area.relatedNews) {
            area.relatedNews = [];
        }

        const newNews: RelatedNews = body.news;
        area.relatedNews.unshift(newNews);
        writeData(data);
        return NextResponse.json(data, { status: 201 });
    } else {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
}

// Handle PUT requests for updating an area
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const data = readData();

    const areaName = body.areaName;
    const areaIndex = data.researchAreas.findIndex((area) => area.name === areaName);

    if (areaIndex === -1) {
        return NextResponse.json({ message: 'Research area not found' }, { status: 404 });
    }

    data.researchAreas[areaIndex] = body.area;
    writeData(data);
    return NextResponse.json({ message: 'Research area updated successfully' });
}

// Handle DELETE requests
export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const data = readData();

    const { areaName, newsId } = body;

    if (newsId) {
        // Delete related news
        const area = data.researchAreas.find((area) => area.name === areaName);
        if (!area) {
            return NextResponse.json({ message: 'Research area not found' }, { status: 404 });
        }

        area.relatedNews = area.relatedNews.filter((news) => news.id !== newsId);
        writeData(data);
        return NextResponse.json({ message: 'Related news deleted successfully' });
    } else if (areaName) {
        // Delete research area
        data.researchAreas = data.researchAreas.filter((area) => area.name !== areaName);
        writeData(data);
        return NextResponse.json({ message: 'Research area deleted successfully' });
    } else {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
}
