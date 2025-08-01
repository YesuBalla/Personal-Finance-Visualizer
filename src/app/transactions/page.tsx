"use client";

import { useState, useEffect, Key } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader, // Import SheetHeader
    SheetTitle,   // Import SheetTitle
    SheetFooter, // Import SheetFooter
    SheetDescription, // Import SheetDescription for better accessibility
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Loader } from "@/components/Loader";
import AddTransaction from "@/components/AddTransaction";
import AppPieChart from "@/components/AppPieChart";
import { useAppStore } from "@/stores/appStore";

interface Transaction {
    _id: Key | null | undefined;
    amount: number;
    description: string;
    category: string;
    date: string;
}

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
    const [deleteId, setDeleteId] = useState<Key | null>(null);
    const dataChanged = useAppStore((state) => state.dataChanged);
    const toggleDataChanged = useAppStore((state) => state.toggleDataChanged);
    const [transactionSheetOpen, setTransactionSheetOpen] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/api/transactions");
                setTransactions(res.data.transactions);
            } catch (error: any) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [dataChanged]);

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await axios.delete(`/api/transactions/${deleteId}`);
            setDeleteId(null);
        } catch (error: any) {
            console.error("Failed to delete transaction", error);
        }
        toggleDataChanged();
    };

    const handleUpdate = async () => {
        if (!editTransaction) return;
        try {
            await axios.patch(`/api/transactions/${editTransaction._id}`, {
                amount: editTransaction.amount,
                description: editTransaction.description,
                category: editTransaction.category,
            });
            setEditTransaction(null);
        } catch (error: any) {
            console.error("Failed to update transaction", error);
        }
        toggleDataChanged();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">All Transactions</h1>
                <Sheet open={transactionSheetOpen} onOpenChange={setTransactionSheetOpen}>
                    <SheetTrigger asChild>
                        <Button onClick={() => setTransactionSheetOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Transaction
                        </Button>
                    </SheetTrigger>
                    <AddTransaction onClose={() => setTransactionSheetOpen(false)} />
                </Sheet>
            </div>

            {/* Transactions List and Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Transactions List */}
                <div className="col-span-1 lg:col-span-2 bg-primary-foreground p-4 rounded-lg">
                    {loading ? (
                        <Loader />
                    ) : (
                        <ScrollArea className="max-h-[500px] overflow-y-auto">
                            {transactions.map((tran) => (
                                <Card
                                    key={tran._id}
                                    className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between mb-2"
                                >
                                    <CardTitle className="w-full md:w-[70%]">
                                        ₹{tran.amount} - {tran.description} ({tran.category}) on{" "}
                                        {new Date(tran.date).toLocaleDateString()}
                                    </CardTitle>
                                    <div className="w-full md:w-[30%] flex justify-end gap-2 mt-2 md:mt-0">
                                        <Button onClick={() => setEditTransaction(tran)}>Edit</Button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => setDeleteId(tran._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </DialogTrigger>

                                            {deleteId === tran._id && (
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Confirm Deletion</DialogTitle>
                                                    </DialogHeader>
                                                    <div>Are you sure you want to delete this transaction?</div>
                                                    <DialogFooter className="mt-4">
                                                        <Button variant="outline" onClick={() => setDeleteId(null)}>
                                                            Cancel
                                                        </Button>
                                                        <Button variant="destructive" onClick={handleDelete}>
                                                            Delete
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            )}
                                        </Dialog>
                                    </div>
                                </Card>
                            ))}
                        </ScrollArea>
                    )}
                </div>

                {/* Pie Chart */}
                <div className="bg-primary-foreground p-4 rounded-lg">
                    <AppPieChart />
                </div>
            </div>

            {/* Edit Transaction Sheet */}
            {editTransaction && (
                <Sheet open={true} onOpenChange={(open) => !open && setEditTransaction(null)}>
                    <SheetContent>
                        {/* The h2 has been replaced with SheetTitle for accessibility. */}
                        <SheetHeader>
                            <SheetTitle>Edit Transaction</SheetTitle>
                            <SheetDescription>
                                Update the details of your transaction here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>

                        {/* The rest of the form content */}
                        <div className="p-4 space-y-4 flex-1">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={editTransaction.amount}
                                    onChange={(e) =>
                                        setEditTransaction({ ...editTransaction, amount: +e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={editTransaction.description}
                                    onChange={(e) =>
                                        setEditTransaction({ ...editTransaction, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={editTransaction.category}
                                    onChange={(e) =>
                                        setEditTransaction({ ...editTransaction, category: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                        <SheetFooter className="p-4 border-t">
                            <Button onClick={handleUpdate} className="w-full">
                                Update Transaction
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    );
};

export default TransactionsPage;
