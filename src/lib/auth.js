import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";



const client = new MongoClient(process.env.AUTH_DB);
const db = client.db('bazar-dor-users');

const vercelOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
const authBaseURL =
    process.env.BETTER_AUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    vercelOrigin ??
    "http://localhost:3000";

export const auth = betterAuth({
    baseURL: authBaseURL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [
        authBaseURL,
        "https://bazar-dor-lovat.vercel.app",
        vercelOrigin,
    ].filter(Boolean),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),

});