import { connectDB } from "@/lib/mongoose";
import { Transaction } from "@/lib/transaction";
import { NextResponse } from "next/server";

// DELETE a transaction
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { _id } = params;
        await Transaction.findByIdAndDelete(_id);
        return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
    }
}

// UPDATE a transaction
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = params;
        const body = await req.json();
        const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}
