import fs from "fs";
import chalk from "chalk";
import rl from "readline-sync";

import {
  USER_DB,
  ADMIN_DB,
  OWNER_DB,
  SESSION_DB
} from "../config/config.js";

const OWNER = JSON.parse(fs.readFileSync(OWNER_DB, "utf-8"));
let DB = JSON.parse(fs.readFileSync(USER_DB, "utf-8"));
let ADMIN = JSON.parse(fs.readFileSync(ADMIN_DB, "utf-8"));

let SESSION = JSON.parse(
  fs.readFileSync(SESSION_DB, "utf-8")
).user;

const saveSession = () =>
  fs.writeFileSync(
    SESSION_DB,
    JSON.stringify({ user: SESSION }, null, 2)
  );

const clearSession = () =>
  fs.writeFileSync(
    SESSION_DB,
    JSON.stringify({ user: null }, null, 2)
  );

const saveDB = () =>
  fs.writeFileSync(USER_DB, JSON.stringify(DB, null, 2));

const genID = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

function isAdmin(sender) {
  return ADMIN.admins.includes(sender);
}

  export default {
  	show() {
  	  console.log("");
console.log(chalk.redBright.bold("╔══════════════════════════════╗"));
console.log(
  chalk.redBright.bold("║") +
  chalk.white.bold("         ADMIN MENU        ") +
  chalk.redBright.bold("   ║")
);
console.log(chalk.redBright.bold("╚══════════════════════════════╝"));
console.log(chalk.red("⚠ Hanya admin yang bisa mengakses menu ini"));
console.log("");
console.log(`${chalk.red("➤")} ${chalk.white(".cekusr")}   ${chalk.bold("– Lihat seluruh user di database")}`);
console.log(`${chalk.red("➤")} ${chalk.white(".deluser")}  ${chalk.bold("– Hapus user dari database")}`);
console.log(`${chalk.red("➤")} ${chalk.white(".adduser")}  ${chalk.bold("– Tambah user baru ke database")}`);
console.log("");
    },
    
    async handle(input) {
    	const args = input.split(" ");
        const cmd = args.shift(); 
        
        // CEK USER
      switch (cmd) {
      	case ".cekusr":
       if (!SESSION) return console.log("❌ Login Dulu");
      
      if (!isAdmin(SESSION.nomor))
        return console.log("❌ Hanya bisa digunakan oleh Admin");
        
      if (!DB.users.length) 
        return console.log("❌ Tidak menemukan user di database")
        
      console.log(chalk.bold(`\n[ DATABASE USER ]`));
      DB.users.forEach(u =>
      console.log(`• ${u.nama} — ${u.nomor} — ${u.motto} | ID:${u.id}`));
        break;
        
      // DEL USER
      case ".deluser":
        if (!SESSION) return console.log("❌ Login Dulu")
      
      if (!isAdmin(SESSION.nomor))
        return console.log("❌ Hanya bisa digunakan oleh Admin")
      
      if (!args[0]) return console.log("❌ Format : .deluser <id>");
      
      const userId = args[0];

      const index = DB.users.findIndex(u => u.id === userId);
      if (index === -1)
       return console.log("❌ User tidak ditemukan");

      DB.users.splice(index, 1);

    fs.writeFileSync(
      USER_DB,
      JSON.stringify(DB, null, 2)
    );

      console.log(chalk.green(`✅ User ${userId} berhasil dihapus`));
       break;
      
      case ".adduser":
        if (!SESSION) return console.log("❌ Login Dulu");
      if (!isAdmin(SESSION.nomor)) return console.log("❌ Hanya bisa digunakan oleh Admin");
      if (!args[0])
        return console.log("❌ Format salah\nContoh: .adduser Nama|Nomor|Motto");
        
      const [nama, nomor, motto] = args.join(" ").split("|");
      if (!nama || !nomor) return console.log("❌ Nama dan nomor wajib diisi");
      
      const id = `USR-${String(DB.users.length + 1).padStart(3, "0")}`;
      
      const userBaru = {
        id,
        nama: nama.trim(),
        nomor: nomor.trim(),
        motto: motto ? motto.trim() : "-"
     };
     
     DB.users.push(userBaru);
    saveDB();

    console.log(chalk.green("✅ User berhasil ditambahkan"));
    console.log(`• Nama  : ${userBaru.nama}`);
    console.log(`• Nomor : ${userBaru.nomor}`);
    console.log(`• ID    : ${userBaru.id}`);
       break;
       
     default:
       console.log("❌ Command tidak ditemukan")
        }
     }
   };