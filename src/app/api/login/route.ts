import { NextResponse } from 'next/server';
import users from '@/data/users.json';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            return NextResponse.json(user);
        } else {
            return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng.' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Đã xảy ra lỗi.' }, { status: 500 });
    }
}
