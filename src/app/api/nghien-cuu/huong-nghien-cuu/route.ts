import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ResearchData, ResearchArea, RelatedNews } from '@/interfaces/nghien-cuu/huong-nghien-cuu/interface';

const filePath = path.join(process.cwd(), 'src/data/nghien-cuu/huong-nghien-cuu/data.json');

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

export async function POST(req: NextRequest) {
    const body = await req.json();
    const data = readData();

    if (body.type === 'area') {
        const newArea: ResearchArea = {
            researchAreaID: new Date().toISOString(),
            ...body.area
        };
        data.researchAreas.push(newArea);
        writeData(data);
        return NextResponse.json({ message: 'Research area added successfully', area: newArea }, { status: 201 });
    } else if (body.type === 'news') {
        // Check if the area exists
        const areaExists = data.researchAreas.some(area => area.researchAreaID === body.researchAreaID);
        if (!areaExists) {
            return NextResponse.json({ message: 'Research area not found' }, { status: 404 });
        }

        const newNews: RelatedNews = {
            id: new Date().toISOString(), // Generate ID based on creation time
            researchAreaID: body.researchAreaID, // Link to research area
            ...body.news
        };

        data.relatedNews.push(newNews);
        writeData(data);
        return NextResponse.json({ message: 'Related news added successfully', news: newNews }, { status: 201 });
    } else {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
}


// Handle PUT requests
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const data = readData();

    if (body.type === 'area') {
        const areaIndex = data.researchAreas.findIndex(area => area.researchAreaID === body.area.researchAreaID);
        if (areaIndex === -1) {
            return NextResponse.json({ message: 'Research area not found' }, { status: 404 });
        }
        data.researchAreas[areaIndex] = body.area;
    } else if (body.type === 'news') {
        const newsIndex = data.relatedNews.findIndex(news => news.id === body.news.id);
        if (newsIndex === -1) {
            return NextResponse.json({ message: 'Related news not found' }, { status: 404 });
        }
        data.relatedNews[newsIndex] = body.news;
    }

    writeData(data);
    return NextResponse.json({ message: 'Update successful' });
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const data = readData();

    const { researchAreaID, id, type } = body;

    if (type === 'area') {
        // Delete research area
        data.researchAreas = data.researchAreas.filter(
            (area) => area.researchAreaID !== researchAreaID
        );

        // Delete all related news associated with this researchAreaID
        data.relatedNews = data.relatedNews.filter(
            (news) => news.researchAreaID !== researchAreaID
        );

        writeData(data);
        return NextResponse.json({ message: 'Research area and related news deleted successfully' });
    } else if (type === 'news') {
        // Delete specific related news by ID
        data.relatedNews = data.relatedNews.filter((news) => news.id !== id);

        writeData(data);
        return NextResponse.json({ message: 'Related news deleted successfully' });
    } else {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }
}

