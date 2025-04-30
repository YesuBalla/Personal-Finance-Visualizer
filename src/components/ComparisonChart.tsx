"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Loader } from "./Loader";
import { useAppStore } from "@/stores/appStore";

const chartConfig = {
    budgeted: {
        label: "Budgeted",
        color: "var(--chart-1)",
    },
    spent: {
        label: "Spent",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

const ComparisonChart = () => {
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const dataChanged = useAppStore((state) => state.dataChanged);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const transactionsRes = await axios.get("/api/transactions");
                const budgetsRes = await axios.get("/api/budgets");
                setTransactions(transactionsRes.data.transactions);
                setBudgets(budgetsRes.data);
            } catch (error: any) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataChanged]);

    const prepareChartData = () => {
        const categorySpend: { [key: string]: number } = {};

        transactions.forEach((txn: any) => {
            const { category, amount } = txn;
            if (!categorySpend[category]) {
                categorySpend[category] = 0;
            }
            categorySpend[category] += amount;
        });

        const chartData = budgets.map((budget: any) => ({
            category: budget.category,
            budgeted: budget.amount,
            spent: categorySpend[budget.category] || 0,
        }));

        return chartData;
    };

    const chartData = prepareChartData();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget vs Spending</CardTitle>
                <CardDescription>Per Category Overview</CardDescription>
            </CardHeader>

            {loading ? (
                <Loader />
            ) : (
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            // tickFormatter={(value) => value.slice(0, 5)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey="budgeted" fill={chartConfig.budgeted.color} radius={4} />
                            <Bar dataKey="spent" fill={chartConfig.spent.color} radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            )}

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing your budgets vs actual spending
                </div>
            </CardFooter>
        </Card>
    );
};

export default ComparisonChart;
