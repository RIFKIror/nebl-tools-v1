import fs from "fs";
import chalk from "chalk";
import rl from "readline-sync";

const GPT5_API = "https://api.nekolabs.web.id/txt.gen/gpt/5";
const GPT5_SYSTEM_PROMPT = "You are a helpful assistant. Answer clearly, concisely, and politely.";
const GEMINI_PRO_API = "https://api.nekolabs.web.id/txt.gen/gemini/2.5-pro";
const GEMINI_PROMPT = "You are Gemini, a professional AI assistant. Answer clearly, accurately, and professionally.";
const CLAUDE_URL = "https://api.nekolabs.web.id/txt.gen/claude/3.5-haiku"
const CLAUDE = chalk.hex("#FFB000");
const CLAUDE_PROMPT = "You are a thoughtful AI assistant. Provide clear, well-reasoned, professional answers.";

export default {
	show() {
		console.log("");
console.log(chalk.blueBright.bold("╔══════════════════════════════════╗"));
console.log(
  chalk.blueBright.bold("║") +
  chalk.white.bold("        AI TOOLS MENU        ") +
  chalk.blueBright.bold("     ║")
);
console.log(chalk.blueBright.bold("╚══════════════════════════════════╝"));
console.log(chalk.bold("[ ! ] Chat AI Model atau generate gambar"));
console.log("");
console.log(`${chalk.blue("➤")} ${chalk.white(".gpt5")}     ${chalk.bold("– Chat with ai model gpt5")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".gemini")}   ${chalk.bold("– Gemini model 2-5 pro")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".claude")}   ${chalk.bold("– Model ai Claude 3-5 Haikku")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".deepseek")}  ${chalk.bold("– Model Deepseek AI R1")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".grokjbreak")} ${chalk.bold("– Grok 3 Jailbreak V2")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".figure")}   ${chalk.bold("– Convert image to action figure")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".ghibli")}   ${chalk.bold("– Ubah foto menjadi ghibli style")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".chibi")}    ${chalk.bold("– Convert image to chibi style")}`);
console.log(`${chalk.blue("➤")} ${chalk.white(".image")}   ${chalk.bold("– Convert image to chibi style")}`);
console.log("");
console.log(
  chalk.white("Ketik") +
  " " +
  chalk.blueBright.bold(".back") +
  " " +
  chalk.white("untuk kembali ke menu utama")
);
console.log("");
    },
    
   async handle(input) {
   	const args = input.split(" ");
       const cmd = args.shift(); 
       
     switch (cmd) {
     	// CHAT GPT MODEL AI
     	case ".gpt5":
         console.log(`
╓────────〔 GPT-5 CHAT MODE 〕─────────
│  Ketik .end untuk mengakhiri percakapan
╙──────────────────────────
`);

while (true) {
    const userText = rl.question("You : ");
    if (!userText) continue;
    if (userText.toLowerCase() === ".end") {
      console.log("\n[ ! ] Chat GPT-5 selesai");
      break;
    }
    
    const start = Date.now();
    
    try {
      const res = await fetch(GPT5_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        body: JSON.stringify({
          text: userText,
          systemPrompt: GPT5_SYSTEM_PROMPT,
          imageUrl: "",
          sessionId: "neko"
        })
    });
    
    const json = await res.json();

      if (!json.success)
        return console.log("❌ GPT-5 gagal merespon");

      console.log(`
GPT5 : ${json.result}

Tanggal : ${json.timestamp}
Respon  : ${json.responseTime || `${Date.now() - start}ms`}
`);

    } catch (err) {
      console.log("❌ Error GPT-5:", err.message);
       }
     }
       break;
       
       // GEMINI 2-5 PRO
     case ".gemini":
       console.log(chalk.cyanBright.bold(`
WELCOME TO GEMINI 2-5 PRO

${chalk.white("Gunakan .end untuk keluar dari obrolan")}
      `));
      
      while (true) {
        const userText = rl.question("You : ");
        if (!userText) continue;
        if (userText.toLowerCase() === ".end") {
          console.log("\n[ ! ] Chat Selesai")
          break;
        }
        
        const start = Date.now()
        
      try {
        const res = await fetch(GEMINI_PRO_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        body: JSON.stringify({
          text: userText,
          systemPrompt: GEMINI_PROMPT,
          imageUrl: "",
          sessionId: Date.now().toString()
        })
    });
    
    const json = await res.json();
     if (!json || !json.result) 
      return console.log("❌ Gemini Gagal meresponse")
      
      console.log(`
${chalk.cyanBright.bold("GEMINI 2.5 PRO RESPONSE")}

${chalk.cyan("GEMINI :")} ${chalk.white(json.result)}

${chalk.gray("Waktu    :")} ${json.timestamp}
${chalk.gray("Respon   :")} ${json.responseTime || `${Date.now() - start}ms`}
`);
      } catch (err) {
        return console.log("Error Handle API", err.message)
      }
    }
     break;
     
     // CLAUDE 3-5 HAIKKU MODEL
    case ".claude":
      console.log(chalk.yellow(`
CHAT WITH CLAUDE 3-5 HAIKKU

${chalk.white("ketik .end untuk mengakhiri obrolan")}
      `));
    
    while (true) {
        const userText = rl.question("You : ");
        if (!userText) continue;
        if (userText.toLowerCase() === ".end") {
          console.log("\n[ ! ] Chat Selesai")
          break;
        }
      
      const start = Date.now();
      
    try {
        const res = await fetch(CLAUDE_URL, {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
     },
        body: JSON.stringify({
          text: userText,
          systemPrompt: CLAUDE_PROMPT,
          imageUrl: "",
          sessionId: Date.now().toString()
        })
    });
    
    if (!res.ok) {
    	const errText = await res.text();
        console.log(chalk.red("❌HTTP RESPONSE ERROR", res.status));
        console.log(errText.slice(0, 300));
    }
    
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.log(chalk.red("❌ Response bukan JSON"));
      console.log(text.slice(0, 300)); // preview
     return;
    }

const json = await res.json();
    if (!json || !json.result) 
      return console.log(chalk.red("❌ Claude Gagal merespon!"))
      
    console.log(`
${CLAUDE.bold("CLAUDE RESPONSE")}

${CLAUDE("CLAUDE :")} ${chalk.white(json.result)}

${chalk.gray("Waktu    :")} ${json.timestamp}
${chalk.gray("Respon   :")} ${json.responseTime || `${Date.now() - start}ms`}
`);
    } catch(err) {
      return console.log("Error API Claude", err.message)
    }
  }
    break;
    
    // DEEPSEEK AI
    case ".deepseek": {
     console.log(
      chalk.cyan.bold(`
╔══════════════════════════════════════╗
║      CHAT WITH DEEPSEEK R1 AI        ║
╚══════════════════════════════════════╝
`)
  );

  console.log(
    chalk.white("Input prompt untuk memulai chat")
  );
  console.log(
    chalk.white("Ketik ") +
    chalk.cyan.bold(".end") +
    chalk.white(" untuk mengakhiri obrolan\n")
  );

  while (true) {
    const prompt = rl.question(chalk.bold("You > "));
    if (!prompt) continue;

    if (prompt.toLowerCase() === ".end") {
      console.log(
        chalk.yellow("\n[ ✓ ] Obrolan DeepSeek berakhir\n")
      );
      break;
    }

    const start = Date.now();

    try {
      const res = await fetch(
        "https://api.nekolabs.web.id/text.gen/deepseek/r1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
          },
          body: JSON.stringify({
            text: prompt,
            systemPrompt: "You are a helpful AI assistant.",
            sessionId: Date.now().toString()
          })
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.log(
          chalk.red(`❌ HTTP ERROR ${res.status}`)
        );
        console.log(
          chalk.gray(err.slice(0, 300))
        );
        continue;
      }

      const json = await res.json();

      const answer =
        json.result ||
        json.response ||
        json.answer ||
        "Tidak ada respon dari AI";

      const time = ((Date.now() - start) / 1000).toFixed(2);

      console.log(`
${chalk.cyanBright.bold("DEEPSEEK R1 RESPONSE")}

${chalk.cyan("Deepseek : ")} ${chalk.white(answer)}

${chalk.gray("Waktu    :")} ${json.timestamp}
${chalk.gray("Respon   :")} ${json.responseTime || `${time}ms`}
`);

    } catch (err) {
      console.log(
        chalk.red("❌ Gagal menghubungi DeepSeek AI")
      );
      console.log(
        chalk.gray(err.message)
      );
    }
  }

  break;
}
    
    // TO FIGURE IMAGE 
   case ".figure":
     if (!args[0])
       return console.log(chalk.red("❌ Format: .figure <link_gambar>"));
       
       console.log(chalk.yellow(`\n⏳Membuat gambar action figure... Mohon tunggu`));
       
       try {
    const res = await fetch(
      `https://api.baguss.xyz/api/edits/tofigure?image=${encodeURIComponent(args[0])}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json"
        }
      }
    );

    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return console.log(chalk.red("❌ API gagal mengembalikan JSON!"));
    }

    if (!json.result)
      return console.log(chalk.red("❌ Gagal generate figure"));

    console.log(`
╓───〔 TO FIGURE RESULT 〕────

${chalk.bold("> > Hasil Gambar Figure < <")}
${chalk.cyan(json.result)}

─────────────────────────────
`);

  } catch (err) {
    console.log(chalk.red("❌ Error ToFigure:", err.message));
    }
    break;
    
   case ".grokjbreak": {
      console.log(
       chalk.red.bold(`
╔══════════════════════════════════════╗
║        GROQ JAILBREAK AI             ║
╚══════════════════════════════════════╝
`)
  );

  console.log(
    chalk.red("WELCOME TO GROK JAILBREAK V2")
  );
  console.log("");
  console.log(
    chalk.white("Ketik ") +
    chalk.red.bold(".end") +
    chalk.white(" untuk mengakhiri obrolan\n")
  );

  while (true) {
    const prompt = rl.question(chalk.bold("You > "));
    if (!prompt) continue;

    if (prompt.toLowerCase() === ".end") {
      console.log(
        chalk.yellow("\n[ ✓ ] Obrolan Groq berakhir\n")
      );
      break;
    }

    const start = Date.now();

    try {
      const res = await fetch("https://api.nekolabs.web.id/text.gen/grok/3-jailbreak/v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "NEBL-TOOLS/1.0"
          },
          body: JSON.stringify({
            text: prompt
          })
        }
      );

      if (!res.ok) {
        const errText = await res.text();
        console.log(
          chalk.red(`❌ HTTP ERROR ${res.status}`)
        );
        console.log(
          chalk.gray(errText.slice(0, 300))
        );
        continue;
      }

      const json = await res.json();
      const answer =
        json.result ||
        json.response ||
        json.answer ||
        "Tidak ada respon dari AI";
      const time = ((Date.now() - start) / 1000).toFixed(2);

        console.log(`
${chalk.red.bold("GROQ JAILBREAK RESPONSE")}

${chalk.red("Groq : ")} ${chalk.white(answer)}

${chalk.gray("Waktu    :")} ${json.timestamp}
${chalk.gray("Respon   :")} ${json.responseTime || `${time}ms`}
`);

    } catch (err) {
      console.log(
        chalk.red("❌ Gagal menghubungi Groq AI")
      );
      console.log(
        chalk.gray(err.message)
      );
    }
  }

  break;
}
    
    // TO GHIBLI IMAGE
   case ".ghibli":
      if (!args[0])
       return console.log(chalk.red("❌ Contoh: .ghibli https://example.com/image.png"));
       
       console.log(chalk.yellow(`\n⏳ Sedang membuat gambar... Mohon tunggu`));
       
       try {
    const res = await fetch(
      `https://api.baguss.xyz/api/edits/toghibli?image=${encodeURIComponent(args[0])}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json"
        }
      }
    );

    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return console.log(chalk.red("❌ API tidak mengembalikan JSON"));
    }

    if (!json.result)
      return console.log(chalk.red("❌ Gagal membuat gambar"));

    console.log(`
───────────────────────────
   ${chalk.bold("TO GHIBLI IMAGE")}
───────────────────────────

${chalk.bold("HASIL GAMBAR")}
${chalk.cyan("➤")} ${json.result}

───────────────────────────
`);

  } catch (err) {
    console.log(chalk.red("❌ Error:"), err.message);
    }
    break;
    
   // TO CHIBI IMAGE
   case ".chibi":
      if (!args[0]) {
      return console.log(chalk.red("❌ Contoh: .chibi https://example.com/image.jpg")
      );
    }
    
    console.log(chalk.yellow("⏳ Sedang memproses gambar..."));
    
    try {
    const apiUrl =
      `https://api.fikmydomainsz.xyz/imagecreator/tochibi?url=${encodeURIComponent(args[0])}`

    const res = await fetch(apiUrl, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (NEBL-CLI)"
      }
    });

    const text = await res.text();

    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return console.log(
        chalk.red("❌ API tidak mengembalikan JSON valid")
      );
    }

    if (!json.result) {
      return console.log(
        chalk.red("❌ Gagal membuat gambar chibi")
      );
    }

    console.log(`
────────────────────────────
      ${chalk.bold("TO CHIBI RESULT")}
────────────────────────────
➤ Gambar : ${chalk.cyan(json.result)}
`);

  } catch (err) {
    console.log(
      chalk.red("❌ Error ToChibi:", err.message)
     );
   }
    break;
   
   // IMAGE GENERATE
  case ".image":
     if (!args.length)
       return console.log("❌ Format: .image <prompt>");

      const prompt = args.join(" ");
      try {
      const res = await fetch(
      "https://api.nekolabs.web.id/img.gen/dall-e/3",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: prompt,
        })
      }
    );
    
    const json = await res.json();

    if (!json || !json.result)
      return console.log("❌ Gagal generate gambar");

     console.log(`
\n════════ [ IMAGE GENERATED ] ════════

➤ 🔗 IMG LINK : ${json.result}
➤ 📝 PROMPT : ${prompt}

[ TANGGAL ] : ${json.timestamp}
Response — ${json.responseTime}

═════════════════════════════════════
`);

  } catch (err) {
      console.log("❌ Fetch gagal", err);
    }
   break;
    
    default:
       console.log("❌ Perintah tidak ditemukan");
       }
     }
  }