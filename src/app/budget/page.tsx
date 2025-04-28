import AddBudget from "@/components/AddBudget"
import AppPieChart from "@/components/AppPieChart"
import ComparisonChart from "@/components/ComparisonChart"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { Plus } from "lucide-react"

const BudgetsPage = () => {
    return (
        <div className="space-y-6">
            {/* Top Header Section */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Budgets</h1>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Budget
                        </Button>
                    </SheetTrigger>
                    <AddBudget />
                </Sheet>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-2 2xl:col-span-3">
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
