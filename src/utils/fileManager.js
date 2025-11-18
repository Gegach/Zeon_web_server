const fs = require("fs-extra");
const path = require("path");

const DATA_DIR = "/data"; // Render Persistent Disk

function getFilePath(filename) {
    return path.join(DATA_DIR, filename);
}

async function readJSON(filename) {
    const filePath = getFilePath(filename);

    try {
        if (!fs.existsSync(filePath)) {
            await fs.writeJSON(filePath, []); // default empty array
        }
        return await fs.readJSON(filePath);
    } catch (err) {
        console.error("Error reading JSON:", err);
        return [];
    }
}

async function writeJSON(filename, data) {
    const filePath = getFilePath(filename);
    await fs.writeJSON(filePath, data, { spaces: 2 });
}

module.exports = { readJSON, writeJSON };
