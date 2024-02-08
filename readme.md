# @umarkhan9166/webcrawler

## Overview

@umarkhan9166/webcrawler is a simple CLI web crawler written in TypeScript. It takes a website URL as input, crawls the website, and generates a report of links along with their occurrence counts.

## Setup

To set up the project locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/UmarKhan19/webcrawler.git
cd webcrawler
```

Install dependencies:

```bash
npm install
```

Building TypeScript Files.
Compile the TypeScript files into JavaScript using the following command:

```bash
npm run build
```

This command will transpile. TypeScript files from the `src` directory into the `dist` directory.

Running the Web Crawler.
To run the web crawler, use the following command:

```bash
npm start <website-url>
```

Replace `<website-url>` with the URL of the website you want to crawl.

## Project Structure

- `index.ts`: The entry point of the CLI, parsing command-line arguments and initiating the crawling process.
- `crawl.ts`: Contains functions for crawling pages, normalizing URLs, and extracting URLs from HTML content.
- `report.ts`: Provides functions for sorting and printing the crawled data.

## Run as npm package

To run `webcrawler` as npm package you can install it globally.

```
npm i -g @umarkhan9166/webcrawler
```

## Example Usage

```bash
webcrawler https://example.com
```

This will initiate the crawler on the specified website and output a report detailing the links and their occurrence counts.

## Notes

- Ensure you have Node.js and npm installed on your machine.
- The crawler uses the jsdom library for HTML parsing and manipulation.
- Please note that this is a simple CLI tool and might not handle all edge cases or complex websites.
- Feel free to explore and modify the code as needed for your specific use case. Happy crawling!

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please open an issue on GitHub.

## License

This project is licensed under the ISC License - see the LICENSE file for details.
