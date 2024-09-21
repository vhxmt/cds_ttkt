// src/pages/api/hop-tac/hop-tac-khoi-han-lam/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addEvent, updateEvent, deleteEvent, readData } from '@/utils/hop-tac/crudUtils';

const subPath = 'hop-tac/hop-tac-quoc-te';

export async function GET(req: NextRequest) {
    const data = readData(subPath);
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    return addEvent(req, subPath);
}

export async function PUT(req: NextRequest) {
    return updateEvent(req, subPath);
}

export async function DELETE(req: NextRequest) {
    return deleteEvent(req, subPath);
}