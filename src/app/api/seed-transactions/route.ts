import { generateDummyTransactions } from "@/lib/generateDummyTransactions";

import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/lib/transaction';
import { NextResponse } from 'next/server';



export async function GET() {
    try {
        await connectDB();
        const dummyTransactions = generateDummyTransactions(90);
        await Transaction.insertMany(dummyTransactions);
        return NextResponse.json({ message: "Dummy transactions inserted!" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
