import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

export const DB_PATH = path.join(ROOT, "database");

function resolveDB(name) {
  const real = path.join(DB_PATH, `${name}.json`);
  const example = path.join(DB_PATH, `${name}.example.json`);

  if (fs.existsSync(real)) return real;
  if (fs.existsSync(example)) return example;

  throw new Error(`❌ Database ${name} tidak ditemukan`);
}

export const USER_DB = resolveDB("user");
export const ADMIN_DB = resolveDB("admin");
export const OWNER_DB = resolveDB("owner");
export const SESSION_DB = resolveDB("session");

if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}