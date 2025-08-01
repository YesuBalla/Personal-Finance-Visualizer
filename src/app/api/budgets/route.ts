import { connectDB } from "@/lib/mongoose";
import { Budget } from "@/lib/budget";  // we'll create this Budget model
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const budget = await Budget.create(body);
        return NextResponse.json(budget, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const budgets = await Budget.find().sort({ month: -1 });
        return NextResponse.json(budgets, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
