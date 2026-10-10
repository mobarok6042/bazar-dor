import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";



const client = new MongoClient(process.env.AUTH_DB);
const db = client.db('bazar-dor-users');


export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_ID, 
            clientSecret: process.env.GOOGLE_SECRET, 
        }, 
    },

    database: mongodbAdapter(db, {
        client,
    }),

});