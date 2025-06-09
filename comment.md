# Web Scraping Assignment - Summary

This project was about scraping data from DU websites using Axios and Cheerio, then saving the results in a `results/` folder as JSON.

## What Worked

### ✅ DU Athletics Site
- **Source**: https://denverpioneers.com/index.aspx  
- **Output**: `results/athletic_events.json`

This one worked fine. The data I needed (like team names and dates) was already in the page HTML, so Cheerio could easily grab it. No issues here.

## What Didn't Work

### ❌ DU Bulletin
- **Source**: https://bulletin.du.edu/  
- **Output**: `results/bulletin.json` (empty)

The bulletin listings have course info, but figuring out which ones had *no* prerequisites wasn’t easy. The prerequisites are just part of the description text, so it would need more logic or keyword scanning to figure it out, and I didn’t have time to build that out properly.

### ❌ DU Calendar
- **Source**: https://www.du.edu/calendar  
- **Output**: `results/calendar_events.json` (empty)

The calendar page looks fine in a browser, but the events don’t show up in the HTML that Axios sees. They get added later with JavaScript, so Cheerio can’t grab them. I’d probably need to use a headless browser (like Puppeteer) to get that data.

## Wrap-up

Athletics scraping worked because the info was just sitting there in the HTML. The other two didn’t work out
