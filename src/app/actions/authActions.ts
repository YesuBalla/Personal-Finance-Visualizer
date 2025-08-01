"use server";

import { signIn, signOut } from '@/lib/auth';
import { signUpSchema } from '@/lib/zod';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { connectDB } from '@/lib/mongoose';
import User from '@/lib/user';


// Handle credentials login (email and password)
export async function handleCredentialSignin({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<SignInResponse> {
    try {
        // Attempt to sign in with provided credentials
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/", // Redirect to the dashboard on success
        });
        // If signIn is successful, Auth.js typically handles the redirect internally
        // by throwing a NEXT_REDIRECT error. This line will generally not be reached.
        return { success: true };
    } catch (error) {
        // IMPORTANT: If the error is NEXT_REDIRECT, re-throw it so Next.js can handle the redirect
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }

        // Check if the error is an instance of AuthError from next-auth
        if (error instanceof AuthError) {
            // Handle 'CallbackRouteError' which often wraps other errors,
            // particularly when a custom error is thrown in the `authorize` callback.
            if (error.type === 'CallbackRouteError') {
                const causeError = (error.cause as any)?.err; // Safely access the nested 'err' property

                // Check if the nested error is our custom 'OAuthAccountExists'
                if (causeError && typeof causeError === 'object' && causeError.message === 'OAuthAccountExists') {
                    return {
                        success: false,
                        message: "This email is already linked to a Google or GitHub account.",
                        errorType: "OAuthAccountExists",
                    };
                }
                // Check if the nested error is our custom 'InvalidPassword'
                if (causeError && typeof causeError === 'object' && causeError.message === 'InvalidPassword') {
                    return {
                        success: false,
                        message: "Invalid email or password.",
                        errorType: "InvalidPassword",
                    };
                }
                // Check if the nested error is our custom 'UserNotFound'
                if (causeError && typeof causeError === 'object' && causeError.message === 'UserNotFound') {
                    return {
                        success: false,
                        message: "No account found with this email.",
                        errorType: "UserNotFound",
                    };
                }
                // If it's a CallbackRouteError but not the specific OAuthAccountExists, InvalidPassword, or UserNotFound case,
                // return a generic authentication error message.
                return { success: false, message: "An authentication error occurred. Please try again.", errorType: "UnknownError" };
            }

            // Fallback for any other AuthError types not explicitly handled above
            return { success: false, message: "Something went wrong during sign-in.", errorType: "UnknownError" };
        }

        // Handle any generic JavaScript Error instances that are not AuthError
        if (error instanceof Error) {
            return { success: false, message: `An unexpected error occurred: ${error.message}`, errorType: "UnknownError" };
        }

        // Ultimate fallback for any other unhandled error types
        return {
            success: false,
            message: "An unknown error occurred. Please try again.",
            errorType: "UnknownError",
        };
    }
}

// --- OAuth Sign-In Actions ---

// Handle Google Sign In
export async function handleGoogleSignin() {
    await signIn('google', { redirectTo: '/' });
}

// Handle GitHub Sign In
export async function handleGithubSignin() {
    await signIn('github', { redirectTo: '/' });
}

// --- Sign Out Action ---

// Handle user sign out
export async function handleSignOut() {
    await signOut();
}

// --- User Sign Up Action ---

// Handle new user registration
export async function handleSignUp({
    name,
    email,
    password,
    confirmPassword,
}: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}) {
    try {
        // Validate input data using Zod schema
        const parsed = signUpSchema.safeParse({ name, email, password, confirmPassword });

        if (!parsed.success) {
            // Return validation errors if parsing fails
            return { success: false, message: 'Invalid data provided.' };
        }

        // Connect to the MongoDB database
        await connectDB();

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, message: 'Email already exists. Please login to continue.' };
        }

        // Hash the user's password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Return success message upon successful account creation
        return { success: true, message: 'Account created successfully!' };
    } catch (error) {
        // Log any unexpected errors during the sign-up process
        // Return a generic error message for the user
        return { success: false, message: 'Something went wrong during sign up. Please try again.' };
    }
}
