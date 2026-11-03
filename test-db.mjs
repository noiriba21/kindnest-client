import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
console.log("Username in use:", uri.split("//")[1]?.split(":")[0]);
console.log("Link starts with:", uri.slice(0, 14));

try {
  const c = new MongoClient(uri);
  await c.db("kindnest").command({ ping: 1 });
  console.log("✅ CONNECTED");
  await c.close();
} catch (e) {
  console.log("❌ FAILED:", e.message);
}