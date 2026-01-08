import fs from "fs";
import chalk from "chalk";
import rl from "readline-sync";
import downloadMenu from "./feature/download.js";
import usersAuth from "./feature/users.js";
import admin from "./feature/admin.js";
import aiTools from "./feature/ai.js";
import game from "./feature/game.js";

import {
  USER_DB,
  ADMIN_DB,
  OWNER_DB
} from "./config/config.js";

let CURRENT_MENU = "main";

const OWNER = JSON.parse(fs.readFileSync(OWNER_DB, "utf-8"));
let DB = JSON.parse(fs.readFileSync(USER_DB, "utf-8"));
let ADMIN = JSON.parse(fs.readFileSync(ADMIN_DB, "utf-8"));

 if (!OWNER.owner) {
 	console.log(chalk.red("❌Owner tidak diset, Cek .database/owner.json"));
     process.exit(1);
 }

let SESSION = null;
const saveDB = () =>
  fs.writeFileSync(USER_DB, JSON.stringify(DB, null, 2));

const genID = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();
  
  function isAdmin(sender) {
  	return ADMIN.admins.includes(sender);
  }
  
  function title() {
    console.log(chalk.cyanBright.bold(`Welcome to NEBL TOOLS | Version : 1.0.0`));
    console.log(chalk.bold("NEBL TOOLS adalah tools berbasis terminal termux yang bisa digunakan untuk kebutuhan seperti download vidio, ai / image, game, dan tools lainnya, dikembangkan oleh KyynXznotDev"));
    console.log("");
    console.log(chalk.bold("[ ! ] Gunakan .menu <kategori> untuk melihat menu tools"));
    console.log(chalk.bold(`
┏━━━━━━〔 TOOLS INFORMATION 〕━━━━━━
┃ Name    : ${OWNER.botName}
┃ Version : ${OWNER.version}
┃ Owner   : ${OWNER.name}
┃ Github  : ${OWNER.github}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`));

    console.log(chalk.bold.yellow("          ⚡ PILIH MENU"));
console.log(chalk.bold("─────────────────────────────────────"));
console.log(`${chalk.green("➤")} ${chalk.bold(".menu download")} ${chalk.gray("│")} Menu Tools Downloader`);
console.log(`${chalk.green("➤")} ${chalk.bold(".menu ai")}       ${chalk.gray("│")} Menu AI / Image Tools`);
console.log(`${chalk.green("➤")} ${chalk.bold(".menu game")}     ${chalk.gray("│")} Menu Tools Game`);
console.log(`${chalk.green("➤")} ${chalk.bold(".menu admin")}    ${chalk.gray("│")} Menu Tools Only Admin`);
console.log(`${chalk.green("➤")} ${chalk.bold(".menu users")}    ${chalk.gray("│")} Menu Auth Users`);
console.log(chalk.bold("─────────────────────────────────────"));
console.log(chalk.gray(`     © Powered by ${OWNER.name}`));
console.log("");
     }
  
  function banner() {
    console.clear();
  console.log(`
╔════════════════════════════════════════════╗
║ ███╗   ██╗███████╗██████╗ ██╗              ║
║ ████╗  ██║██╔════╝██╔══██╗██║              ║
║ ██╔██╗ ██║█████╗  ██████╔╝██║              ║
║ ██║╚██╗██║██╔══╝  ██╔══██╗██║              ║
║ ██║ ╚████║███████╗██████╔╝███████╗         ║
║ ╚═╝  ╚═══╝╚══════╝╚═════╝ ╚══════╝         ║
╚════════════════════════════════════════════╝
           ${OWNER.botName} — v${OWNER.version}
   `);
  };
  
  function mainMenu() {
    banner();
    title();
  }

  async function startCLI() {
  mainMenu();

  while (true) {
    const input = rl.question(chalk.bold("Input > "));
    if (!input) continue;

    if (input === "exit") {
      console.log(chalk.yellow("👋 Keluar dari Menu NEBL TOOLS..."));
      process.exit(0);
    }

    if (input === "clear") {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  CURRENT_MENU = "main";

  console.clear();
  console.log(chalk.yellow("⏳ Membersihkan terminal..."));
  await sleep(1500);

  mainMenu();
  continue;
}

    if (input === ".back") {
      CURRENT_MENU = "main";
      mainMenu();
      continue;
    }

    const args = input.split(" ");
    const cmd = args.shift();

    // ===== MAIN MENU =====
    if (CURRENT_MENU === "main") {
      if (cmd === ".menu") {
        const target = args[0];

        switch (target) {
          case "download":
            CURRENT_MENU = "download";
            downloadMenu.show();
            break;

          case "users":
            CURRENT_MENU = "users";
            usersAuth.show();
            break;
            
          case "admin":
             CURRENT_MENU = "admin";
             admin.show();
             break;
             
          case "ai":
              CURRENT_MENU = "ai";
              aiTools.show();
              break;
              
           case "game":
              CURRENT_MENU = "game";
              game.show();
              break;

          default:
            console.log("❓ Menu tidak tersedia");
        }
      } else {
        console.log("❌ Command tidak ditemukan");
      }
      continue;
    }

    // ===== SUB MENU =====
    if (CURRENT_MENU === "download") {
      await downloadMenu.handle(input);
      continue;
    }

    if (CURRENT_MENU === "users") {
      await usersAuth.handle(input);
      continue;
    }
    
    if (CURRENT_MENU === "admin") {
    	await admin.handle(input);
        continue;
      }
      
     if (CURRENT_MENU === "ai") {
     	await aiTools.handle(input);
         continue;
      }
      
    if (CURRENT_MENU === "game") {
    	await game.handle(input);
        continue;
      }
  }
}

startCLI();