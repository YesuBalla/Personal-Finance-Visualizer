import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/lib/transaction';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const transaction = await Transaction.create(body);
        return NextResponse.json(transaction, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const recentTransactions = await Transaction.find().sort({ date: -1, _id: -1 }).limit(6);
        const transactions = await Transaction.find().sort({ date: -1, _id: -1 });
        return NextResponse.json({ recentTransactions, transactions }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
