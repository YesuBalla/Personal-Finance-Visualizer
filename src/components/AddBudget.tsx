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

export const budgetSchema = z.object({
    category: z.string().min(1, { message: "Category is required" }),
    amount: z.preprocess(
        (val) => Number(val),
        z.number({ invalid_type_error: "Amount must be a number" }).positive("Amount must be greater than zero")
    ),
    month: z.string().refine(
        (val) => /^\d{4}-\d{2}$/.test(val),
        { message: "Month must be in YYYY-MM format" }
    ),
})

const AddBudget = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [categories, setCategories] = useState<string[]>([])

    const form = useForm<z.infer<typeof budgetSchema>>({
        resolver: zodResolver(budgetSchema),
        defaultValues: {
            category: "Food",
            amount: "",
            month: new Date().toISOString().slice(0, 7), // YYYY-MM
        },
    })

    const onSubmit = async (data: z.infer<typeof budgetSchema>) => {
        setIsSubmitting(true)
        try {
            await axios.post("/api/budgets", data)
            form.reset()
        } catch (error) {
            console.error("Failed to submit budget:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/api/categories")
            setCategories(res.data.map((category: { name: any }) => category.name))
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Add Budget</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
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
                                        <FormDescription>Select the budget category.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter budget amount" {...field} />
                                        </FormControl>
                                        <FormDescription>Set your budget for this category.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="month"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Month</FormLabel>
                                        <FormControl>
                                            <Input type="month" placeholder="Select month" {...field} />
                                        </FormControl>
                                        <FormDescription>Select the month for the budget.</FormDescription>
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
    )
}

export default AddBudget
