import { Category } from '@/lib/category';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name } = await req.json();

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return NextResponse.json({ message: 'Category already exists' }, { status: 400 });
        }

        const newCategory = new Category({ name });

        await newCategory.save();

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}