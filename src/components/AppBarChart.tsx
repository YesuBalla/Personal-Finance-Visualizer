"use client";
import { Key, useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig;

interface ChartData {
    _id: Key | null | undefined;
    amount: number;
    description: string;
    category: string;
    date: string;
    month: string;
}

const AppBarChart = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [Err, setErr] = useState<string | null>(null);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/transactions");
            const data = res.data.transactions;

            // Group data by month
            const groupedData = groupDataByMonth(data);
            setChartData(groupedData);
        } catch (error) {
            setErr("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    // Helper function to group data by month
    const groupDataByMonth = (data: ChartData[]) => {
        return Object.entries(
            data.reduce((acc, { date, amount }) => {
                const month = new Date(date).toLocaleString("default", { month: "long" });
                acc[month] = (acc[month] || 0) + amount;
                return acc;
            }, {})
        ).map(([month, amount]) => ({ month, amount }));
    };

    // Calculate percentage change between the current and previous month's total
    const calculatePercentageChange = () => {
        if (chartData.length < 2) return 0; // Not enough data to calculate change
        const lastMonthAmount = chartData[chartData.length - 1].amount;
        const previousMonthAmount = chartData[chartData.length - 2].amount;

        return ((lastMonthAmount - previousMonthAmount) / previousMonthAmount) * 100;
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const totalAmount = chartData.reduce((total, item) => total + item.amount, 0);
    const percentageChange = calculatePercentageChange();
    const monthsRange =
        chartData.length > 0
            ? `${chartData[0].month} - ${chartData[chartData.length - 1].month}`
            : "No data";

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Expenses</CardTitle>
                <CardDescription>{monthsRange}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)} // Display first 3 letters of the month
                        />
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                        <Bar
                            dataKey="amount"
                            fill="var(--color-desktop)"
                            radius={8}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {percentageChange >= 0 ? "Trending +" : "Trending "}
                    {percentageChange.toFixed(2)}% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Total amount for the period: ₹{totalAmount.toLocaleString()}
                </div>
            </CardFooter>
        </Card>
    );
};

export default AppBarChart;
