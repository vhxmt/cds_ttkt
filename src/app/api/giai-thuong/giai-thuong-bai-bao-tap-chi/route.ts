// src/pages/api/giai-thuong/giai-thuong-bai-bao-tap-chi/route.ts
import { NextRequest,NextResponse } from 'next/server';
import { addAward, updateAward, deleteAward, getAward } from '@/utils/giai-thuong/crudUtils';

const subPath = 'giai-thuong-bai-bao-tap-chi';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const result = getAward(subPath, id || undefined);
    return NextResponse.json(result, { status: 200 });
}

export async function POST(req: NextRequest) {
    return addAward(req, subPath);
}

export async function PUT(req: NextRequest) {
    return updateAward(req, subPath);
}

export async function DELETE(req: NextRequest) {
    return deleteAward(req, subPath);
}
