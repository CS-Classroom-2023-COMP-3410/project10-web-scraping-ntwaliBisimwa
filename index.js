// index.js
const scrapeBulletin = require("./scrapeBulletin");
const scrapeAthletics = require("./scrapeAthletics");
const scrapeCalendar = require("./scrapeCalendar");

(async () => {
  try {
    console.log("🚀 Starting full scrape...");

    await scrapeBulletin();
    console.log("✅ Bulletin done");

    await scrapeAthletics();
    console.log("✅ Athletics done");

    await scrapeCalendar();
    console.log("✅ Calendar done");

    console.log("🎉 All scraping completed successfully.");
  } catch (err) {
    console.error("❌ Error during scraping:", err.message);
  }
})();
