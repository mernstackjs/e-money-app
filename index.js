import { config } from "dotenv";
config();
import express from "express";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "E-Money APP is running on PORT " + PORT,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
