"use client"

import { useState } from "react"
import AddBudget from "@/components/AddBudget"
import AppPieChart from "@/components/AppPieChart"
import ComparisonChart from "@/components/ComparisonChart"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Plus } from "lucide-react"


const BudgetsPage = () => {
    const [transactionSheetOpen, setTransactionSheetOpen] = useState(false);
    return (
        <div className="space-y-6">
            {/* Top Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">All Budgets</h1>
                <Sheet open={transactionSheetOpen} onOpenChange={setTransactionSheetOpen}>
                    <SheetTrigger asChild>
                        <Button onClick={() => setTransactionSheetOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Budget
                        </Button>
                    </SheetTrigger>
                    <AddBudget onClose={() => setTransactionSheetOpen(false)} />
                </Sheet>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-1 lg:col-span-2 bg-primary-foreground p-4 rounded-lg">
                    <ComparisonChart />
                </div>
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <AppPieChart />
                </div>
            </div>
        </div>
    )
}

export default BudgetsPage;
