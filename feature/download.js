import fs from "fs";
import chalk from "chalk";
import rl from "readline-sync";

export default {
  show() {
  	console.log("");
console.log(chalk.cyan.bold("╔══════════════════════════════════════╗"));
console.log(
  chalk.cyan.bold("║") +
  chalk.white.bold("            DOWNLOADER MENU           ") +
  chalk.cyan.bold("║")
);
console.log(chalk.cyan.bold("╚══════════════════════════════════════╝"));

console.log(chalk.bold("Tools untuk mengunduh media dari berbagai platform."));
console.log("");

console.log(` ${chalk.green("›")} .tiktok     ${chalk.gray("│")} Download Video TikTok`);
console.log(` ${chalk.green("›")} .ig         ${chalk.gray("│")} Download Video Instagram`);
console.log(` ${chalk.green("›")} .fesnuk     ${chalk.gray("│")} Download Image Facebook`);
console.log(` ${chalk.green("›")} .splay      ${chalk.gray("│")} Cari & Download lagu Spotify`);

console.log("");
console.log(chalk.bold("────────────────────────────────────────"));
console.log(
  chalk.white("Ketik ") +
  chalk.cyan.bold(".back") +
  chalk.white(" untuk kembali ke menu awal")
);
console.log(chalk.bold("────────────────────────────────────────"));
  },
  
  async handle(input) {
  const args = input.split(" ");
  const cmd = args.shift();

  switch (cmd) {
    case ".tiktok":
      if (!args[0])
        return console.log("❌ Format: .tiktok <link>");
       
       try {
    const res = await fetch("https://api.nekolabs.web.id/dwn/tiktok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: args[0]
      })
    });

    const json = await res.json();

    if (!json.success || !json.result)
      return console.log("❌ Gagal mengambil data TikTok");

    const r = json.result;

    console.log(`
╔════════════════════════════════════════════╗
║        ▶▶ 𝗧𝗜𝗞𝗧𝗢𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 ◀◀             ║
╚════════════════════════════════════════════╝

🎬 𝗝𝘂𝗱𝘂𝗹
➤ ${r.title || "-"}

👤 𝗔𝘂𝘁𝗵𝗼𝗿
➤ Nama     : ${r.author?.name || "-"}
➤ Username : ${r.author?.username || "-"}

📊 𝗦𝘁𝗮𝘁𝗶𝘀𝘁𝗶𝗸
➤ ▶ Play    : ${r.stats?.play || "0"}
➤ ❤️ Like    : ${r.stats?.like || "0"}
➤ 💬 Comment : ${r.stats?.comment || "0"}
➤ 🔁 Share   : ${r.stats?.share || "0"}

🎵 𝗠𝘂𝘀𝗶𝗰 (MP3)
➤ ${r.musicUrl || "-"}

🎥 𝗩𝗶𝗱𝗲𝗼 (MP4)
➤ ${r.videoUrl || "-"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
   } catch (e) {
      console.log("❌ Fetch gagal: ", e.message);
    }
      break;

    case ".ig":
      if (!args[0])
        return console.log("❌ Masukkan link Instagram");

  try {
    console.log(chalk.yellow("⏳ Mengambil video Instagram..."));

    const res = await fetch("https://api.nekolabs.web.id/dwn/instagram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (KyynXz-CLI)"
      },
      body: JSON.stringify({
        url: args[0]
      })
    });

    if (!res.ok) {
      console.log("❌ Request gagal:", res.status);
      return;
    }

    const json = await res.json();
    if (!json.success || !json.result) {
      return console.log("❌ Video tidak tersedia atau link tidak valid");
    }

    const meta = json.result.metadata || {};
    const urls = json.result.downloadUrl || [];

    if (!urls.length) {
      return console.log("❌ Tidak ditemukan link video MP4");
    }

    const video = urls[0];

    console.log("〔 INSTAGRAM DOWNLOADER 〕");
    console.log("────────────────────────");
    console.log(`Akun     : ${meta.username || "-"}`);
    console.log(`Caption  : ${meta.caption || "-"}`);
    console.log(`Upload   : ${json.timestamp || "-"}`);
    console.log("");
    console.log("Video:");
    console.log(video);

  } catch (err) {
    console.log("❌ Error sistem:", err.message);
   }
      break;
      
    case ".fesnuk":
         if (!args[0])
      return console.log("❌ Format: .fesnuk <link_facebook>");
      
      try {
      console.log(chalk.yellow("⏳ Mengambil gambar Facebook..."));

    const res = await fetch("https://api.nekolabs.web.id/dwn/facebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: args[0].trim()
      })
    });

    const json = await res.json();

    if (!json.success || !json.result || !json.result.medias?.length)
      return console.log("❌ Gagal mengambil gambar Facebook");

    const media = json.result.medias[0];
    const title = json.result.title || "-";

    console.log(`
╓───〔 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗜𝗠𝗔𝗚𝗘 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 〕───

📅𝗨𝗽𝗹𝗼𝗮𝗱  : ${json.timestamp}

📝𝗗𝗲𝘀𝗸  : ${title || "-"}

🔗 𝗟𝗶𝗻𝗸 𝗚𝗮𝗺𝗯𝗮𝗿 :
➩ ${media.url}
`);

  } catch (err) {
     console.log("❌ Error:", err.message);
     }
      break;
      
    case ".splay":
        if (!args[0])
      return console.log("❌ Format: .splay <judul lagu>");
      const query = args.join(" ");
      
      try {
    console.log(chalk.yellow("⏳ Mencari lagu di Spotify..."));
    const res = await fetch("https://api.nekolabs.web.id/dwn/spotify/play/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: query
      })
    });

    const json = await res.json();
    if (!json.success || !json.result)
      return console.log("❌ Lagu tidak ditemukan");

    const meta = json.result.metadata;

    console.log(`
╓───〔 𝗦𝗣𝗢𝗧𝗜𝗙𝗬 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 〕────

𝗝𝘂𝗱𝘂𝗹   : ${meta.title}
𝗔𝗿𝘁𝗶𝘀   : ${meta.artist}
𝗗𝘂𝗿𝗮𝘀𝗶 : ${meta.duration}

𝗨𝗥𝗟     : ${meta.url}
𝗖𝗼𝘃𝗲𝗿  : ${meta.cover}

𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱 (MP3)
${json.result.downloadUrl}

𝗧𝗮𝗻𝗴𝗴𝗮𝗹 : ${json.timestamp}
𝗥𝗲𝘀𝗽𝗼𝗻 : ${json.responseTime}
`);
  } catch (err) {
    console.log("❌ Gagal mengambil data Spotify");
   }
     break;

      default:
        console.log("❌ Command tidak ditemukan!")
    }
  }
};