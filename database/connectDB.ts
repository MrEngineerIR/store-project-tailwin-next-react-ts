import mongoose, { Mongoose } from "mongoose";

let connected = false;
let client: Mongoose;
const connectDB = async () => {
  if (connected) {
    console.log("database already connected");
    return;
  }
  try {
    client = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/store"
      // {
      //   serverApi: {
      //     // version: ServerApiVersion.v1,
      //     strict: true,
      //     deprecationErrors: true,
      //   },
      // }
    );
    console.log("database connect ...");
    connected = true;
    return;
  } catch (error: any) {
    throw new Error(error);
  }
};
export { client };
export default connectDB;
