import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/lib/transaction';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import mongoose from 'mongoose';

// Handle POST requests to create a new transaction for the authenticated user
export async function POST(req: Request) {
    try {
        await connectDB();

        const session = await auth(); // Get the current user session

        // If no session or user ID, return unauthorized
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
        }

        const body = await req.json();

        const transactionData = {
            ...body,
            userId: session.user.id,
        };


        const transaction = await Transaction.create(transactionData);
        return NextResponse.json(transaction, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to create transaction. Please check your input.' }, { status: 500 });
    }
}

// Handle GET requests to retrieve transactions for the authenticated user
export async function GET() {
    try {
        await connectDB();
        const session = await auth();

        // If no session or user ID, return unauthorized
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
        }

        const userObjectId = session.user.id;

        // Find transactions belonging only to the authenticated user
        const transactions = await Transaction.find({ userId: userObjectId }).sort({ date: -1, _id: -1 });

        // For now, it's the first 6 of the user's sorted transactions.
        const recentTransactions = transactions.slice(0, 6);

        return NextResponse.json({ recentTransactions, transactions }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to fetch transactions.' }, { status: 500 });
    }
}


