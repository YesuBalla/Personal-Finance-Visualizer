import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/lib/transaction';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import mongoose from 'mongoose';

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                { error: 'Unauthorized: User not authenticated.' },
                { status: 401 }
            );
        }

        const userObjectId = session.user.id;
        const transactionId = new mongoose.Types.ObjectId(params.id);

        const deletedTransaction = await Transaction.findOneAndDelete({
            _id: transactionId,
            userId: userObjectId,
        });

        if (!deletedTransaction) {
            return NextResponse.json(
                { error: "Transaction not found or you don't have permission to delete it" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Transaction deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting transaction:', error);
        return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: 'Unauthorized: User not authenticated.' }, { status: 401 });
        }

        const userObjectId = session.user.id;
        const transactionId = new mongoose.Types.ObjectId(params.id);
        const body = await req.json();

        // Find and update the transaction, but only if it belongs to the authenticated user
        const updatedTransaction = await Transaction.findOneAndUpdate(
            {
                _id: transactionId,
                userId: userObjectId,
            },
            body,
            { new: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found or you don't have permission to update it" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}
