import mongoose from "mongoose";

export const initDb = async () => {
  await mongoose
    .connect("mongodb://mongo:27017/rethink", { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

export default mongoose;
