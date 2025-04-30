"use client"

import { Key, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BanknoteArrowDown, IndianRupee } from "lucide-react";
import { Loader } from "./Loader";
import { useAppStore } from "@/stores/appStore";

interface RecentTransaction {
    _id: Key | null | undefined;
    amount: number;
    description: string;
    category: string;
    date: string;
}

const RecentTransactions = () => {
    const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [Err, setErr] = useState<string | null>(null);
    const dataChanged = useAppStore((state) => state.dataChanged);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/transactions");
            setRecentTransactions(res.data.recentTransactions);
        } catch (error) {
            setErr("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [dataChanged]);

    return (
        <div>
            <h1 className="text-lg font-medium mb-6">Recent Transactions</h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col gap-2">
                    {recentTransactions?.map((item) => (
                        <Card key={item._id} className="flex-row items-center justify-between gap-4 p-3">
                            <div className="rounded-sm relative overflow-hidden">
                                <CardContent className="flex flex-row items-center p-0 gap-2">
                                    <BanknoteArrowDown size={40} />
                                    <div>
                                        <CardTitle className="text-medium font-bold">{item.category}</CardTitle>
                                        <Badge variant="secondary" className="text-[10px]">{item.date.split('T')[0]}</Badge>
                                    </div>
                                </CardContent>
                            </div>
                            <CardFooter className="p-2 text-sm font-bold">
                                <IndianRupee size={12} />{item.amount}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;
