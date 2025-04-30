"use client"

import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"
import axios from "axios"
import { LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppStore } from "@/stores/appStore";

export const transactionSchema = z.object({
    amount: z.preprocess(
        (val) => Number(val),
        z.number({ invalid_type_error: "Amount must be a number" }).positive("Amount must be greater than zero")
    ),
    date: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid date format. Use a valid ISO string (YYYY-MM-DD)" }
    ),
    description: z.string()
        .min(2, "Description must be at least 2 characters")
        .max(100, "Description must be less than 100 characters"),
    category: z.string(),
});


const AddTransaction = ({ onClose }: { onClose: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const toggleDataChanged = useAppStore((state) => state.toggleDataChanged);
    const dataChanged = useAppStore((state) => state.dataChanged);

    const form = useForm<z.infer<typeof transactionSchema>>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            amount: "",
            date: new Date().toISOString().split('T')[0],
            description: '',
            category: "Food",
        },
    });

    const onSubmit = async (data: z.infer<typeof transactionSchema>) => {
        setIsSubmitting(true);
        try {
            await axios.post("/api/transactions", data);
            form.reset();
            onClose();
        } catch (error) {
            console.error("Failed to submit transaction:", error);
        } finally {
            setIsSubmitting(false);
        }

        toggleDataChanged();
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/api/categories");
            setCategories(res.data.map((category: { name: string }) => category.name));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [dataChanged]);

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Add Transaction</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter amount" {...field} />
                                        </FormControl>
                                        <FormDescription>Enter the transaction amount.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Description" {...field} />
                                        </FormControl>
                                        <FormDescription>Describe your transaction.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormDescription>Select the transaction date.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>Select a category for your transaction.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    );
};

export default AddTransaction;
