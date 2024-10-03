import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {

    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = !!connection.connections[0].readyState;
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        throw new Error("Database connection failed");
    }
};