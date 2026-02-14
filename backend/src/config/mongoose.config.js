import mongoose from "mongoose";

const url = process.env.MONGO_URL;

export const connectToMongoose = async () => {
  try {
    mongoose.connect(url);
    console.log("MongoDB is connected using mongoose");
  } catch (error) {
    console.log(error);
  }
};
