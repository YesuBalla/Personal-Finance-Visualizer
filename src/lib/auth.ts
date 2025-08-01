import NextAuth from 'next-auth'

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongoClient";
import authConfig from '../../auth.config';






export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),

    session: {
        strategy: 'jwt',
    },
    ...authConfig
})