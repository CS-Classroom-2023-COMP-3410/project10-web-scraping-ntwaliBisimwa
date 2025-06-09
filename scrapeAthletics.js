const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs-extra");

async function scrapeAthletics() {
  console.log("🏀 Fetching DU Men’s Basketball schedule...");

  const url = "https://denverpioneers.com/sports/mens-basketball/schedule";
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);
  const events = [];

  $(".sidearm-schedule-game").each((_, el) => {
    const dateRaw = $(el).find(".sidearm-schedule-game-opponent-date").text().trim();
    const opponentRaw = $(el).find(".sidearm-schedule-game-opponent-name").text().trim();
    const location = $(el).find(".sidearm-schedule-game-location").text().trim();

    if (!dateRaw || !opponentRaw) return;

    // Example: "Nov 4 (Mon)" → normalize to "November 4, 2024"
    const monthMap = {
      Jan: "January", Feb: "February", Mar: "March", Apr: "April",
      May: "May", Jun: "June", Jul: "July", Aug: "August",
      Sep: "September", Oct: "October", Nov: "November", Dec: "December"
    };
    const parts = dateRaw.split(" ");
    const formattedDate = parts.length >= 2 ? `${monthMap[parts[0]]} ${parts[1]}, 2024` : dateRaw;

    events.push({
      duTeam: "Denver Pioneers",
      opponent: opponentRaw,
      date: formattedDate
    });
  });

  await fs.outputJson("results/athletic_events.json", { events }, { spaces: 2 });
  console.log(`✅ Saved ${events.length} athletic events to athletic_events.json`);
}

module.exports = scrapeAthletics;
