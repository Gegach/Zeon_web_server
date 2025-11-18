const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/users", require("./src/routes/users"));
app.use("/trainers", require("./src/routes/trainers"));

// Render health check
app.get("/", (req, res) => {
    res.json({ status: "Zeon API running" });
});

// required for Render to know which port to use
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
