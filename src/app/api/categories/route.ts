import { connectDB } from '@/lib/mongoose';
import { Category } from '@/lib/category';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const categories = await Category.find();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}