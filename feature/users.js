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

    console.log(chalk.blueBright.bold("╔══════════════════════════════╗"));
    console.log(
      chalk.blueBright.bold("║") +
      chalk.white.bold("        USER AUTH MENU        ") +
      chalk.blueBright.bold("║")
    );
    console.log(chalk.blueBright.bold("╚══════════════════════════════╝"));

    // STATUS LOGIN
    if (SESSION) {
      console.log(
        chalk.green(`🔐 Login otomatis sebagai ${SESSION.nama}`)
      );
      console.log("");
    }

    console.log(chalk.bold("Kelola akun pengguna dengan perintah berikut:"));
    console.log("");

    console.log(`${chalk.green("➤")} ${chalk.white(".login")}  ${chalk.bold("– Masuk ke akun")}`);
    console.log(`${chalk.green("➤")} ${chalk.white(".daftar")} ${chalk.bold("– Daftar akun baru")}`);
    console.log(`${chalk.green("➤")} ${chalk.white(".logout")} ${chalk.bold("– Keluar dari akun")}`);
    console.log("");
  },

  async handle(input) {
    const args = input.split(" ");
    const cmd = args.shift();

    switch (cmd) {

      case ".login": {
        if (!args[0]) {
          return console.log(
            chalk.red("❌ Format salah: .login <nomor>")
          );
        }

        const user = DB.users.find(u => u.nomor === args[0]);
        if (!user) {
          return console.log(
            chalk.red("❌ User tidak ditemukan")
          );
        }

        SESSION = user;
        saveSession();

        console.log(
          chalk.green(`✅ Login sukses sebagai ${user.nama}`)
        );
        break;
      }

      case ".logout": {
        if (!SESSION) {
          return console.log("❌ Kamu belum login");
        }

        console.log(
          chalk.yellow(`👋 Logout dari akun ${SESSION.nama}`)
        );

        SESSION = null;
        clearSession();
        break;
      }

      case ".daftar": {
        if (args.length < 3) {
          return console.log(
            chalk.red("❌ Format: .daftar <nama> <nomor> <motto>")
          );
        }

        const [nama, nomor, ...mottoArr] = args;
        const motto = mottoArr.join(" ");

        if (DB.users.find(u => u.nomor === nomor)) {
          return console.log(
            chalk.red("❌ User sudah terdaftar")
          );
        }

        const user = {
          id: genID(),
          nama,
          nomor,
          motto
        };

        DB.users.push(user);
        saveDB();

        console.log(
          chalk.green("✅ Pendaftaran berhasil, silakan .login <nomor>")
        );
        break;
      }

      default:
        console.log(chalk.red("❌ Command tidak ditemukan"));
    }
  }
};