"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import ErrorMessage from "@/components/ErrorMessage";

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { signUpSchema } from '@/lib/zod';
import { handleCredentialSignin, handleSignUp } from '../actions/authActions';

export default function SignUp() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [globalError, setGlobalError] = useState<string>('');

    // Redirect if already logged in
    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/');
        }
    }, [status, router]);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    });

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        try {
            const result: SignUpResponse = await handleSignUp(values);
            if (result.success) {
                const valuesForSignin = {
                    email: values.email,
                    password: values.password,
                };
                await handleCredentialSignin(valuesForSignin);
            } else {
                setGlobalError(result.message);
            }
        } catch (error) {
            setGlobalError('An unexpected error occurred. Please try again.');
        }
    };

    // Display a loading indicator while the session status is being determined
    if (status === 'loading' || status === 'authenticated') {
        return <div className="flex items-center justify-center min-h-screen w-full">Loading authentication...</div>;
    }



    return (
        <div className='grow flex items-center justify-center p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader>
                    <CardTitle className='text-3xl font-bold text-center text-gray-800'>
                        Create Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {globalError && <ErrorMessage error={globalError} />}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                            {['name', 'email', 'password', 'confirmPassword'].map((field) => (
                                <FormField
                                    control={form.control}
                                    key={field}
                                    name={field as keyof z.infer<typeof signUpSchema>}
                                    render={({ field: fieldProps }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={
                                                        field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'
                                                    }
                                                    placeholder={`Enter your ${field}`}
                                                    {...fieldProps}
                                                    autoComplete='off'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <LoadingButton pending={form.formState.isSubmitting}>
                                Sign Up
                            </LoadingButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
