import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(name) {
  const real = path.join(__dirname, `${name}.json`);
  const example = path.join(__dirname, `${name}.example.json`);

  if (fs.existsSync(real)) {
    return JSON.parse(fs.readFileSync(real, "utf-8"));
  }

  if (fs.existsSync(example)) {
    return JSON.parse(fs.readFileSync(example, "utf-8"));
  }

  throw new Error(`❌ Database ${name} tidak ditemukan`);
}

export const OWNER = loadJSON("owner");
export const USERS = loadJSON("user");
export const ADMIN = loadJSON("admin");
export const SESSION = loadJSON("session");