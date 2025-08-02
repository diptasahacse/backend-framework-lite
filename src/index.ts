import express from "express";
import apiRouter from "./routes";

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", apiRouter); // all modules under /api prefix

app.get("/", async (_req, res) => {
   res.json({ message: "Hello World" });
});

const abc = 44;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}....`);
});
