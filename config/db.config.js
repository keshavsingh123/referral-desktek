import mongoose from "mongoose";

export const connectMongoose= async () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log(" Mongoose is connected");
    });
  } catch (err) {
    console.log(err);
  }
};
