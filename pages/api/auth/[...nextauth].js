import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectMongoDB();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("User not found kindly Register");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Incorrect password");
                }

                return { id: user._id, email: user.email };
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
