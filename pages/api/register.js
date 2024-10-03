import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcryptjs.hash(password, 10);

      await connectMongoDB();

      await User.create({ name, email, password: hashedPassword });

      return res.status(201).json({ message: "Registration successful." });
    } catch (error) {
      console.error("Registration error: ", error);
      return res.status(500).json({ message: "An error occurred during registration." });
    }
  } else {
   
    return res.status(405).json({ message: "Method not allowed." });
  }
}