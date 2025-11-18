const fs = require("fs").promises;
const path = require("path");

// Dinamički pronađi root direktorij projekta
const PROJECT_ROOT = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(PROJECT_ROOT, "data");

async function readJSON(filename) {
    try {
        const filepath = path.join(DATA_DIR, filename);
        console.log(`Attempting to read file at: ${filepath}`);
        
        // Provjeri postoji li file
        await fs.access(filepath);
        
        const data = await fs.readFile(filepath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file '${filename}':`, error);
        console.error(`Full path attempted: ${path.join(DATA_DIR, filename)}`);
        
        // Ako file ne postoji, vrati prazan array
        if (error.code === 'ENOENT') {
            console.log(`File not found, returning empty array`);
            return [];
        }
        throw error;
    }
}

async function writeJSON(filename, data) {
    try {
        const filepath = path.join(DATA_DIR, filename);
        console.log(`Attempting to write file at: ${filepath}`);
        
        // Kreiraj data direktorij ako ne postoji
        await fs.mkdir(DATA_DIR, { recursive: true });
        
        await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
        console.log(`Successfully wrote to ${filename}`);
    } catch (error) {
        console.error(`Error writing JSON file '${filename}':`, error);
        throw error;
    }
}

module.exports = { readJSON, writeJSON };