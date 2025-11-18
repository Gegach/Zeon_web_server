const express = require("express");
const router = express.Router();
const { readJSON, writeJSON } = require("../utils/fileManager");

const FILE = "trainers.json";

router.get("/", async (req, res) => {
    res.json(await readJSON(FILE));
});

router.post("/", async (req, res) => {
    const trainers = await readJSON(FILE);
    const newTrainer = { id: Date.now(), ...req.body };
    trainers.push(newTrainer);
    await writeJSON(FILE, trainers);
    res.json(newTrainer);
});

module.exports = router;
