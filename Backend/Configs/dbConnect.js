import mongoose from "mongoose";

export default async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}