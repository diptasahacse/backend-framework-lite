import express from "express";
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", async (_req, res) => {
  await db.insert(UserTable).values({
    name: "John",
    email: "john@example.com",
    password: "123456",
    status: "active",
  });

  const user = await db.select().from(UserTable);

  res.json({ message: "Welcome to backend-framework-lite!", data: user });
});

const abc = 44;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}....`);
});
