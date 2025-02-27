import 'next-auth'
import { DefaultSession } from 'next-auth';
import { JWT } from "next-auth/jwt"

declare  module 'next-auth' {
    interface User {

        _id?: string;
        isVerified?: boolean;
        username?: string;
        isAdmin?: boolean;
    }
    interface Session {
           user: {
            _id?: string
            isVerified?: boolean;
            username?: string;
            isAdmin?: boolean
           } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {

    interface JWT {
        _id?: string;
        isVerified?: boolean;
        username?: string
        isAdmin?: boolean
    }
}