const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/trigger", async (req, res) => {
  try {
    const response = await fetch("https://valaq122.app.n8n.cloud/webhook-test/vis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.text();
    res.status(200).send(data);

  } catch (error) {
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


