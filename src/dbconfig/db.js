import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    connection.on("error", (error) => {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error(
      "Something went wrong while connecting to the Database:",
      error
    );
    process.exit(1);
  }
}
