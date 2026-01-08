import chalk from "chalk";
import fs from "fs";
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
console.log(chalk.cyan.bold("╔══════════════════════════════════════╗"));
console.log(
  chalk.cyan.bold("║") +
  chalk.yellow.bold("            RANDOM GAME           ") +
  chalk.cyan.bold("    ║")
);
console.log(chalk.cyan.bold("╚══════════════════════════════════════╝"));

console.log(chalk.bold("Tools menu Random game (Lihat daftar game dibawah ini)"));

  console.log("");
  console.log(`${chalk.cyan(">>")} ${chalk.white(".caklontong")}   ${chalk.bold("– Pertanyaan logika Cak lontong")}`);
  console.log(`${chalk.cyan(">>")} ${chalk.white(".asahotak")}   ${chalk.bold("– Asah otak seputar pengetahuan umum")}`);
  console.log("");
  },

  async handle(input) {
    const args = input.split(" ");
    const cmd = args.shift();

    let CAK_SESSION = null;

  switch (cmd) {
     case ".caklontong": {
       try {
         while (true) {
          const res = await fetch("https://api.baguss.xyz/api/game/caklontong");
          const json = await res.json();

        if (!json.status) {
           console.log("❌ Gagal mengambil soal");
           break;
         }
         
      const jumlahHuruf = json.jawaban.replace(/\s+/g, "").length;

      console.log("");
      console.log(chalk.cyan.bold("╔══════════════════════════════╗"));
      console.log(
        chalk.cyan.bold("║") +
        chalk.white.bold("        CAK LONTONG        ") +
        chalk.cyan.bold("   ║")
      );
      console.log(chalk.cyan.bold("╚══════════════════════════════╝"));
      console.log("");

      console.log(chalk.yellow("❓ Pertanyaan Cak lontong :"));
      console.log(chalk.white(json.soal));
      console.log("");

      console.log(chalk.white("Jawab langsung"));
      console.log(
        chalk.white("Gunakan command ") +
        chalk.cyan.bold(".nyerah ") +
        chalk.white(`Untuk menyerah dan melihat jawaban\n`) +
        chalk.white("Gunakan command ") +
        chalk.cyan.bold(".reset ") +
        chalk.white("Untuk mereset pertanyaan")
      );
      console.log("");
      console.log(chalk.bold(`Note : Jawaban terdiri dari ${jumlahHuruf} huruf`));
      console.log("");

      const jawab = rl.question(chalk.bold("Jawab > ")).toLowerCase().trim();

      // NYERAHHHH
      if (jawab === ".nyerah") {
        console.log("");
        console.log(chalk.red.bold("❌ Yahahaha Nyerah 😹"));
        console.log(chalk.green.bold(`✅ Jawabannya : ${json.jawaban}`));
        console.log(chalk.white(`[ ! ]  ${json.deskripsi}`));
        break;
      }

      if (jawab === ".reset") {
        console.log(chalk.yellow("🔄 Mengambil soal baru..."));
        continue;
      }

      // CEK JAWA
      if (jawab === json.jawaban.toLowerCase()) {
        console.log("");
        console.log(chalk.green.bold("🎉 JAWABAN BENAR!"));
        console.log(chalk.gray(json.deskripsi));
        break;
      } else {
        console.log("");
        console.log(chalk.red.bold("❌ Salah woi jawaban lu 😹"));
        console.log(chalk.green.bold(`✅ Jawaban yg bener : ${json.jawaban}`));
        console.log(chalk.white(`[ ! ]  ${json.deskripsi}`));
        break;
      }
    }
  } catch (e) {
    console.log("❌ Error:", e.message);
  }
  break;
}

  case ".asahotak": {
  if (!SESSION) {
    console.log(chalk.red("❌ Login dulu untuk bermain"));
    console.log(chalk.bold("[ ! ] Karna game ini memerlukan auth user untuk menampung score dan leaderscore"))
    break;
  }

  try {
    while (true) {
      const res = await fetch("https://api.baguss.xyz/api/game/asahotak");
      const json = await res.json();

      if (!json.status) {
        console.log("❌ Gagal mengambil soal");
        break;
      }

      if (typeof SESSION.score !== "number") {
        SESSION.score = 0;
      }

      const jumlahHuruf = json.jawaban.replace(/\s+/g, "").length;

      console.log("");
console.log(chalk.yellow.bold("╔══════════════════════════════╗"));
console.log(
  chalk.yellow.bold("║") +
  chalk.white.bold("          ASAH OTAK           ") +
  chalk.yellow.bold("║")
);
console.log(chalk.yellow.bold("╚══════════════════════════════╝"));
console.log("");

console.log(chalk.yellow("❓ Pertanyaan:"));
console.log(chalk.white(json.soal));
console.log("");

console.log(
  chalk.bold(`💡 Jawaban terdiri dari ${jumlahHuruf} huruf`)
);
console.log("");

console.log(chalk.bold("=> Gunakan Perintah:"));
console.log(
  chalk.cyan(".nyerah") +
  chalk.bold(" | Menyerah dan melihat jawaban")
);
console.log(
  chalk.cyan(".reset") +
  chalk.bold("  | Reset soal")
);
console.log(
  chalk.cyan(".cekscore") +
  chalk.bold(" | Lihat score kamu saat ini")
);
console.log(
  chalk.cyan(".leaderscore") +
  chalk.bold(" | Lihat leaderscore paling banyak")
);
console.log("");

      const jawab = rl.question(chalk.bold("Jawab > ")).trim().toLowerCase();

      // NYERAHHHH
      if (jawab === ".nyerah") {
        console.log("");
        console.log(chalk.red.bold("❌ Kamu menyerah"));
        console.log("");
        console.log(chalk.green(`✅ Jawaban : ${json.jawaban}`));
        break;
      }

      // RESET SOAL ASAH OTAK
      if (jawab === ".reset") {
        console.log(chalk.yellow("🔄 Mengambil soal baru..."));
        continue;
      }

      // CEK
      if (jawab === ".cekscore") {
        console.log(
          chalk.cyan(`📊 Score ${SESSION.nama}: ${SESSION.score}`)
        );
        continue;
      }

      // LEADERSCORE
      if (jawab === ".leaderscore") {
        console.log(chalk.bold("\n🏆 LEADERBOARD SCORE\n"));

        const sorted = [...DB.users]
          .filter(u => typeof u.score === "number")
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        if (!sorted.length) {
          console.log("❌ Belum ada score");
        } else {
          sorted.forEach((u, i) => {
            console.log(
              `${i + 1}. ${u.nama} — ${chalk.green(u.score)}`
            );
          });
        }
        console.log("");
        continue;
      }

      // CEKKK JAWABBB
      if (jawab === json.jawaban.toLowerCase()) {
        SESSION.score += 5;

        const idx = DB.users.findIndex(u => u.id === SESSION.id);
        if (idx !== -1) {
          DB.users[idx].score = SESSION.score;
          saveDB();
        }

        console.log("");
        console.log(chalk.green.bold("🎉 JAWABAN BENAR!"));
        console.log(chalk.white(json.jawaban));
        console.log("");
        console.log(chalk.cyan(`+5 Score | Total: ${SESSION.score}`));
        break;
      } else {
        console.log("");
        console.log(chalk.red("❌ Jawaban salah bre"));
        console.log(chalk.green(`✅ Jawaban benar: ${json.jawaban}`));
        console.log("");
        break;
      }
    }
  } catch (e) {
    console.log("❌ Error:", e.message);
  }
  break;
}

      default:
        console.log("❌ Command tidak ditemukan");
    }
  }
};