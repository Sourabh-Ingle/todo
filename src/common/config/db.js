import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI

const dbConnect = async () => {
   try {
       const conn = await mongoose.connect(MONGO_URI);
       console.log(`mongodb connected :${conn.connection.host}`);

   } catch (error) {
       console.log(`db connection failed`, error);
       process.exit(1)
   }
}

export default dbConnect;