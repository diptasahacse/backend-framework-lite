import express from "express";
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";
import { UserProfileTable } from "./modules/userProfile/userProfile.schema";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", async (_req, res) => {
   try {
    await db.insert(UserProfileTable).values({
      userId: "836ed426-5c7b-4b23-8625-30523e0395d7",
      dob: "1990-01-01",
      profilePicture: "https://i.imgur.com/vMppUMs.jpg",
      bio: "I am a developer"
    });

    const user = await db.select().from(UserTable);
    res.json({ message: "Inserted", data: user });
  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
});

const abc = 44;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}....`);
});
