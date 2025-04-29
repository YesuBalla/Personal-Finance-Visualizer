"use client";

import { useState, useEffect, Key } from "react";
import axios from "axios";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Loader } from "@/components/Loader";
import AddTransaction from "@/components/AddTransaction";
import AppPieChart from "@/components/AppPieChart";

interface Transaction {
    _id: Key | null | undefined;
    amount: number;
    description: string;
    category: string;
    date: string;
}

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
    const [deleteId, setDeleteId] = useState<Key | null>(null);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/transactions");
            setTransactions(res.data.transactions);
        } catch (error) {
            setError("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await axios.delete(`/api/transactions/${deleteId}`);
            setDeleteId(null);
            fetchTransactions();
        } catch (error) {
            console.error("Failed to delete transaction", error);
        }
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
            fetchTransactions();
        } catch (error) {
            console.error("Failed to update transaction", error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-3 flex items-center justify-between mb-5">
                    <h1 className="text-3xl font-bold">All Transactions</h1>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="mt-3">
                                <Plus />
                                Add Transaction
                            </Button>
                        </SheetTrigger>
                        <AddTransaction onTransactionAdded={fetchTransactions} />
                    </Sheet>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-2 2xl:col-span-3">
                    {loading ? (
                        <Loader />
                    ) : (
                        <ScrollArea className="max-h-[500px] mt-4 overflow-y-auto">
                            {transactions?.map((tran) => (
                                <Card
                                    key={tran._id}
                                    className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between mb-2 mr-2"
                                >
                                    <CardTitle className="w-full md:w-[70%]">
                                        ₹{tran.amount} - {tran.description} ({tran.category}) on {formatDate(tran.date)}
                                    </CardTitle>
                                    <div className="w-full md:w-[30%] flex justify-end gap-2 mt-2 md:mt-0">
                                        <Button className="px-4" onClick={() => setEditTransaction(tran)}>
                                            Edit
                                        </Button>

                                        {/* Delete confirmation */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    className="px-4"
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
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setDeleteId(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={handleDelete}
                                                        >
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

                <div className="bg-primary-foreground p-4 rounded-lg">
                    <AppPieChart />
                </div>
            </div>

            {/* Edit Transaction Sheet */}
            {editTransaction && (
                <Sheet open={true} onOpenChange={(open) => !open && setEditTransaction(null)}>
                    <SheetContent>
                        <div className="p-4 space-y-4">
                            <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>

                            <div className="space-y-2">
                                <Label>Amount</Label>
                                <Input
                                    type="number"
                                    placeholder="Amount"
                                    value={editTransaction.amount}
                                    onChange={(e) =>
                                        setEditTransaction({ ...editTransaction, amount: +e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Input
                                    placeholder="Description"
                                    value={editTransaction.description}
                                    onChange={(e) =>
                                        setEditTransaction({ ...editTransaction, description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input
                                    placeholder="Category"
                                    value={editTransaction.category}
                                    onChange={(e) =>
                                        setEditTransaction({ ...editTransaction, category: e.target.value })
                                    }
                                />
                            </div>

                            <Button onClick={handleUpdate} className="w-full mt-4">
                                Update Transaction
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    );
};

export default TransactionsPage;
