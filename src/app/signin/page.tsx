'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { signInSchema } from '@/lib/zod';
import LoadingButton from '@/components/LoadingButton';
import ErrorMessage from '@/components/ErrorMessage';
import { handleCredentialSignin, handleGithubSignin, handleGoogleSignin } from "../actions/authActions";

export default function SignIn() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useSearchParams();
    const errorParam = params.get('error');

    const [globalError, setGlobalError] = useState<string>('');


    useEffect(() => {
        if (errorParam && status === 'unauthenticated') {
            switch (errorParam) {
                case 'OAuthAccountNotLinked':
                    setGlobalError('An account with this email exists but is linked to another provider. Please sign in with your other method.');
                    break;
                default:
                    setGlobalError('An unexpected error occurred. Please try again.');
            }

            // clear the error from the URL *after* showing it
            const newParams = new URLSearchParams(window.location.search);
            newParams.delete('error');
            const newUrl = window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : '');
            router.replace(newUrl);
        }
    }, [errorParam, status, router]);


    // Initialize react-hook-form
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Handle form submission for credentials sign-in
    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        setGlobalError(''); // Clear any previous errors before a new attempt
        try {
            const response = await handleCredentialSignin(values);

            if (!response.success) {
                setGlobalError(response.message || "An unexpected error occurred. Please try again.");
            } else {
                router.push('/');
            }
        } catch (error) {
            if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
                throw error;
            }
            console.error('An unexpected client-side error occurred:', error);
            setGlobalError('An unexpected error occurred. Please try again.');
        }
    };

    // Only display a loading indicator if the session status is loading.
    if (status === 'loading') {
        return <div className="flex items-center justify-center min-h-screen w-full">Loading authentication...</div>;
    }


    // The sign-in form will only render when status is 'unauthenticated'
    return (
        <div className="w-full flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-grey-800">
                        Welcome Back
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="w-full mb-4" action={handleGoogleSignin}>
                        <Button variant='outline' className="w-full" type="submit">
                            <FcGoogle className="h-4 w-4 mr-2" />
                            Sign in with Google
                        </Button>
                    </form>
                    <form className="w-full" action={handleGithubSignin}>
                        <Button variant='outline' className="w-full" type="submit">
                            <GitHubLogoIcon className='h-4 w-4 mr-2' />
                            Sign in with Github
                        </Button>
                    </form>
                    <div className="relative flex items-center py-5">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="enter your email address" autoComplete="off" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="enter your password" autoComplete="off" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton pending={form.formState.isSubmitting}>
                                Sign In
                            </LoadingButton>
                        </form>
                    </Form>
                    {globalError && <ErrorMessage error={globalError} />}
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-semibold text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
