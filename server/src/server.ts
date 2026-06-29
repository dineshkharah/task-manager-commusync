import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  if (!MONGO_URI) {
    console.error("MONGO_URI is missing.");
    process.exit(1);
  }

  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("failed to start server:", error);
    process.exit(1);
  }
}

start();
