const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/trigger", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const response = await fetch(
      "https://valaq122.app.n8n.cloud/webhook/vis", // PRODUCTION URL (no -test)
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: req.body.name,
          whatsapp: req.body.whatsapp
        })
      }
    );

    const text = await response.text();
    res.status(200).send(text);

  } catch (error) {
    console.error("Forwarding error:", error);
    res.status(500).send({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Clearbook backend running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
