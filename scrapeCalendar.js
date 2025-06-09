const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs-extra");

async function scrapeCalendar() {
  console.log("📅 Fetching DU calendar page...");

  const url = "https://www.du.edu/calendar";
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);
  const events = [];

  let currentDate = "";

  // Traverse through event containers
  $(".event-listing").each((_, el) => {
    const textBlock = $(el).text().trim().split("\n").map(s => s.trim()).filter(Boolean);

    if (textBlock.length === 0) return;

    // If first line is a date (e.g. "June 9")
    const maybeDate = textBlock[0];
    if (/^[A-Z][a-z]+ \d{1,2}$/.test(maybeDate)) {
      currentDate = maybeDate + ", 2025"; // Append 2025 for assignment
      textBlock.shift(); // Remove the date line
    }

    const title = textBlock[0] || "Untitled Event";
    const time = textBlock[1] && textBlock[1].match(/\d/) ? textBlock[1] : undefined;

    const event = {
      title,
      date: currentDate
    };

    if (time) {
      event.time = time;
    }

    events.push(event);
  });

  await fs.outputJson("results/calendar_events.json", { events }, { spaces: 2 });
  console.log(`✅ Saved ${events.length} events to calendar_events.json`);
}

module.exports = scrapeCalendar;
