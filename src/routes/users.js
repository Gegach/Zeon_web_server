const express = require("express");
const router = express.Router();
const { readJSON, writeJSON } = require("../utils/fileManager");

const FILE = "users.json";

// GET all users
router.get("/", async (req, res) => {
    const users = await readJSON(FILE);
    res.json(users);
});

// GET user by ID
router.get("/:id", async (req, res) => {
    const users = await readJSON(FILE);
    const user = users.find(u => u.id == req.params.id);
    res.json(user || null);
});

// CREATE user
router.post("/", async (req, res) => {
    const users = await readJSON(FILE);
    const newUser = { id: Date.now(), ...req.body };

    users.push(newUser);
    await writeJSON(FILE, users);

    res.json(newUser);
});

// UPDATE user
router.put("/:id", async (req, res) => {
    const users = await readJSON(FILE);
    const idx = users.findIndex(u => u.id == req.params.id);

    if (idx === -1) return res.status(404).json({ error: "User not found" });

    users[idx] = { ...users[idx], ...req.body };

    await writeJSON(FILE, users);
    res.json(users[idx]);
});

// DELETE user
router.delete("/:id", async (req, res) => {
    const users = await readJSON(FILE);
    const filtered = users.filter(u => u.id != req.params.id);

    await writeJSON(FILE, filtered);
    res.json({ success: true });
});

module.exports = router;
