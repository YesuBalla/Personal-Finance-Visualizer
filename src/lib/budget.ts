import mongoose, { Schema, model, models } from "mongoose";

const BudgetSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        month: {
            type: String,
            required: true, // format: YYYY-MM
        },
    },
    { timestamps: true }
);

// check if already exists (to avoid overwrite on hot-reload in dev)
export const Budget = models.Budget || model("Budget", BudgetSchema);
