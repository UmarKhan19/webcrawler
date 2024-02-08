import { JSDOM } from "jsdom";

export function normalizeURL(url: string): string {
  let hostPath: string = url;
  if (hostPath.length > 0) {
    const URLObject: URL = new URL(url);
    hostPath = `${URLObject.hostname}${URLObject.pathname}`.toLowerCase();
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
      return hostPath.slice(0, -1);
    }
  }
  return hostPath;
}

export function getURLsFromHTML(htmlBody: string, baseURL: string): string[] {
  const urls: string[] = [];
  const dom: JSDOM = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href[0] === "/") {
      try {
        const validURL: URL = new URL(`${baseURL}${linkElement.href}`);
        urls.push(validURL.href);
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      try {
        const validURL: URL = new URL(linkElement.href);
        urls.push(validURL.href);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  }
  return urls;
}

export async function crawlPage(
  baseURL: string,
  currentURL: string,
  pages: Record<string, number>
) {
  const baseURLObj: URL = new URL(baseURL);
  const currentURLObj: URL = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL: string = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`actively crawling: ${currentURL}`);

  try {
    const res = await fetch(currentURL);
    if (res.status > 399) {
      console.log(
        `error in fetch with status code: ${res.status} on page: ${currentURL}`
      );
      return pages;
    }

    const contentType = res.headers.get("Content-Type");

    if (!contentType?.includes("text/html")) {
      console.log(
        `non html response, content type: ${contentType} on page: ${currentURL}`
      );
      return pages;
    }
    const html = await res.text();
    const nextURLs = getURLsFromHTML(html, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error: any) {
    console.log(`error in fetch: ${error.message} on page: ${currentURL}`);
  }
  return pages;
}
