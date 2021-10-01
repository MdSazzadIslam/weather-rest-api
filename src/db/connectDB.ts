import mongoose from "mongoose";

type TInput = {
  db: string;
};

export default ({ db }: TInput) => {
  const connectDB = () => {
    mongoose
      .connect(db, {})
      .then(() => {
        return console.info("Successfully connected to database");
      })
      .catch((error) => {
        console.error("Error connecting to database: " + error.message);
        return process.exit(1);
      });
  };
  connectDB();

  mongoose.connection.on("disconnected", connectDB);
};
