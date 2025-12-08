// env-loader.ts
import * as dotenv from "dotenv";
import * as path from "path";

// Define the path to your special .env folder/file
const envPath = path.resolve(__dirname, ".env"); // Adjust the path as needed

dotenv.config({ path: envPath });

console.log("✅ Custom environment variables loaded successfully.");
