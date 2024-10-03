import { connectMongoDB } from "@/lib/mongodb";
import Feedback from "@/models/feedback";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fullname, email, message } = req.body;
      try {
        await connectMongoDB()
        await Feedback.create({ fullname, email, message })
  
        res.status(200).json({ msg: "Feedback received successfully" });
      } catch (error) {
        console.error("Error processing feedback:", error);
        res.status(500).json({ error: "An error occurred while processing feedback" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" }); 
    }
  }
  