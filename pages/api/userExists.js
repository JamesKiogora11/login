import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await connectMongoDB();
            const { email } = req.body;

            const user = await User.findOne({ email }).select('_id');

            console.log("user: ", user);
            return res.status(200).json({ user });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).json({ message: "An error occurred while fetching the user." });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed." });
    }
}
