import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to backend-framework-lite!" });
});

const abc = 44;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}....`);
});
