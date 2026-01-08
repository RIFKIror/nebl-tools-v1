import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const DB_PATH = path.join(ROOT, "database");

if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

function resolveDB(name) {
  const real = path.join(DB_PATH, `${name}.json`);
  const example = path.join(DB_PATH, `${name}.example.json`);

  if (fs.existsSync(real)) return real;

  if (fs.existsSync(example)) {
    fs.copyFileSync(example, real);
    console.log(`📁 Database ${name}.json dibuat dari template`);
    return real;
  }

  fs.writeFileSync(real, JSON.stringify({}, null, 2));
  console.log(`📁 Database ${name}.json dibuat kosong`);
  return real;
}

// PATH DATABASE
export const USER_DB = resolveDB("user");
export const ADMIN_DB = resolveDB("admin");
export const OWNER_DB = resolveDB("owner");
export const SESSION_DB = resolveDB("session");

try {
  const OWNER = JSON.parse(fs.readFileSync(OWNER_DB, "utf-8"));

  if (!OWNER.owner || OWNER.owner.trim() === "") {
    console.log(
      "\n⚠️  Owner belum diset.\n" +
      "👉 Silakan edit file: database/owner.json\n"
    );
  }
} catch (e) {
  console.log("⚠️  Gagal membaca owner.json");
}
