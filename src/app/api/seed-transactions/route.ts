import { generateDummyTransactions } from "@/lib/generateDummyTransactions";
import { connectDB } from '@/lib/mongoose';
import { Transaction } from '@/lib/transaction';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
    try {
        // 1. Get the user session using the recommended `auth()` function.
        const session = await auth();

        // 2. Check if the user is logged in.
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // 3. Extract the user ID from the session.
        const userId = session.user.id;

        // 4. Connect to the database.
        await connectDB();

        // 5. Generate dummy transactions using the authenticated user's ID.
        // We'll generate 90 transactions, but you can change this number.
        const dummyTransactions = generateDummyTransactions(userId, 90);

        // 6. Insert the generated transactions into the database.
        await Transaction.insertMany(dummyTransactions);

        return NextResponse.json({ message: "Dummy transactions inserted successfully!" });
    } catch (error: any) {
        console.error("Error generating dummy transactions:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
