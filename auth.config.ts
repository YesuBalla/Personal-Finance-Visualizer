import Credentials from 'next-auth/providers/credentials'
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { signInSchema } from '@/lib/zod';
import { connectDB } from '@/lib/mongoose'
import User from '@/lib/user';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';

const publicRoutes = ['/signin', '/signup']
const authRoutes = ['/signin', '/signup']

export default {
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        GitHub({
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' }
            },
            async authorize(credentials) {
                // Validate credentials
                const parsedCredentials = signInSchema.safeParse(credentials);
                if (!parsedCredentials.success) {
                    throw new Error('InvalidInput');
                }

                await connectDB();

                // Find user by email
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error('UserNotFound');
                }

                // Check if password is set (for OAuth-only users)
                if (!user.password) {
                    throw new Error('OAuthAccountExists');
                }

                // Validate password
                const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password);
                if (!isPasswordValid) {
                    throw new Error('InvalidPassword');
                }

                // Return user (without password)
                const userObject = user.toObject();
                const { password, ...userWithoutPassword } = userObject;
                return userWithoutPassword;
            }
        })],

    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;

            // Always allow public routes
            if (publicRoutes.includes(pathname)) return true;

            // Prevent logged-in users from accessing auth routes
            if (authRoutes.includes(pathname)) {
                return !isLoggedIn;
            }

            // All other routes require auth
            return isLoggedIn;
        },

        async jwt({ token, user }) {
            if (user) {

                // Safely get ID from different shapes
                token.id = user.id ?? user._id ?? null;
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.id && session?.user) {
                session.user.id = token.id;
            }
            return session;
        },

    },

    pages: {

        signIn: '/signin'

    },
} satisfies NextAuthConfig;