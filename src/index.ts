import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello, TypeScript Express Server!");
});

const abc = 44;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
