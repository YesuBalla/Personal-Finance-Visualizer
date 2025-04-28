"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, PieChart, Label } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Loader } from "@/components/Loader";

const chartConfig = {
    totalAmount: { label: "TotalAmount" },
    food: { label: "Food", color: "var(--chart-1)" },
    rent: { label: "Rent", color: "var(--chart-2)" },
    utilities: { label: "Utilities", color: "var(--chart-3)" },
    travel: { label: "Travel", color: "var(--chart-4)" },
    health: { label: "Health", color: "var(--chart-5)" },
} satisfies ChartConfig;

const AppPieChart = () => {
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/transactions");
            const data = res.data.transactions;
            const groupedData = aggregateData(data);
            setChartData(groupedData);
        } catch (error) {
            setError("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    const aggregateData = (data: any[]) => {
        const aggregated = data.reduce((acc: any, transaction: any) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
        }, {});
        return Object.keys(aggregated).map((category) => ({
            name: category,
            value: aggregated[category],
            fill: getColorByCategory(category),
        }));
    };

    const getColorByCategory = (category: string) => {
        const categoryColors: Record<string, string> = {
            Rent: "var(--color-rent)",
            Utilities: "var(--color-utilities)",
            Transportation: "var(--color-transportation)",
            Entertainment: "var(--color-entertainment)",
            Health: "var(--color-health)",
            Shopping: "var(--color-shopping)",
            Education: "var(--color-education)",
            Investments: "var(--color-investments)",
            Travel: "var(--color-travel)",
            Food: "var(--color-food)",
        };
        return categoryColors[category] || "var(--color-default)";
    };

    const formatAmount = (amount: number) => (amount / 1000).toFixed(1) + "k";

    const totalAmount = chartData.reduce((sum, entry) => sum + entry.value, 0);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Category Pie Chart</CardTitle>
                <CardDescription>Summary of your spendings</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {loading ? (
                    <div className="flex justify-center items-center h-[250px]">
                        <Loader />
                    </div>
                ) : (
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }: any) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {formatAmount(totalAmount)}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground text-sm"
                                                    >
                                                        Total
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {!loading && (
                    <div className="text-muted-foreground">
                        {`Showing total amount across ${chartData.length} categories`}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default AppPieChart;
