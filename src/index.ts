import { crawlPage } from "./crawl";
import { printReport } from "./report";

async function main() {
  if (process.argv.length < 3) {
    console.log("No website provided");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("Please pass only one website");
    process.exit();
  }
  const baseURL = process.argv[2];

  console.log(`Starting crawl of ${baseURL}`);

  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
}

main();
