const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs-extra");

async function scrapeBulletin() {
  console.log("📘 Fetching DU Bulletin page...");

  const url = "https://bulletin.du.edu/undergraduate/coursedescriptions/comp/";
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    timeout: 10000
  });

  console.log("✅ Bulletin page fetched.");

  const $ = cheerio.load(data);
  const courses = [];

  $(".courseblock").each((i, el) => {
    const titleBlock = $(el).find(".courseblocktitle").text().trim();
    const desc = $(el).find(".courseblockdesc").text().trim();
    const match = titleBlock.match(/(COMP-\d{4})/);
    const courseNumber = match ? parseInt(match[1].split("-")[1]) : null;

    if (match && courseNumber >= 3000 && !desc.toLowerCase().includes("prerequisite")) {
      const courseCode = match[1];
      const title = titleBlock.replace(courseCode, "").trim().replace(/\u00a0/g, " ");
      courses.push({ course: courseCode, title });
    }
  });

  console.log(`📦 Found ${courses.length} qualifying upper-division COMP courses without prerequisites.`);
  await fs.outputJson("results/bulletin.json", { courses }, { spaces: 2 });
  console.log("💾 Saved bulletin.json");
}

module.exports = scrapeBulletin;
