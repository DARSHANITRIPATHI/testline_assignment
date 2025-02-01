import express from "express";
import fetch from "node-fetch";
import cors from "cors"; 
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Proxy endpoint to fetch quiz data
app.get("/api/quiz", async (req, res) => {
  try {
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    res.status(500).send("Error fetching quiz data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
