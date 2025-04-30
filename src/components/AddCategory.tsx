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
import { Button } from "./ui/button"
import axios from "axios"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useAppStore } from "@/stores/appStore";


// Schema for Category validation
const categorySchema = z.object({
    name: z
        .string()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name must be less than 50 characters")
        .regex(/^[A-Z]/, "Category name must start with an uppercase letter"),
});
const AddCategory = ({ onClose }: { onClose: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [err, setErr] = useState<string | null>(null);
    const toggleDataChanged = useAppStore((state) => state.toggleDataChanged);
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof categorySchema>) => {
        setIsSubmitting(true);
        try {
            await axios.post("/api/categories/add", data);
            form.reset();
            setErr('')
            onClose();
        } catch (error: any) {
            setErr(error.message)
        } finally {
            setIsSubmitting(false);
        }

        toggleDataChanged();
    };

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="mb-4">Add Category</SheetTitle>
                <SheetDescription asChild>
                    <Form {...form}>
                        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mb-2">Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter category name" {...field} />
                                        </FormControl>
                                        <FormDescription className={err ? 'text-red-400/90 font-bold' : ''}>{err ? err : 'Enter the category name with the first letter capitalized.'}</FormDescription>
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
}

export default AddCategory;
