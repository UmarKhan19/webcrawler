const { normalizeURL, getURLsFromHTML } = require("../dist/crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("NormalizeURL with a trailing '/'", () => {
  const input = "https://boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("NormalizeURL with capitals", () => {
  const input = "https://BOOT.dev/path/";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

test("NormalizeURL with empty string", () => {
  const input = "";
  const actual = normalizeURL(input);
  const expected = "";
  expect(actual).toEqual(expected);
});

test("NormalizeURL strip HTTP", () => {
  const input = "http://boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "boot.dev/path";
  expect(actual).toEqual(expected);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test("getURLsFromHTML absolute path", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://boot.dev/path"> boot.dev </a>
        </body>
    </html>
    `;

  const inputBaseURL = "https://boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://boot.dev/path"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative path", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/"> boot.dev </a>
        </body>
    </html>
    `;

  const inputBaseURL = "https://boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both relative and absolute path", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://boot.dev/path"> boot.dev </a>
            <a href="/path/"> boot.dev </a>
        </body>
    </html>
    `;

  const inputBaseURL = "https://boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://boot.dev/path", "https://boot.dev/path/"];
  expect(actual).toEqual(expected);
});
test("getURLsFromHTML Invalid", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="Invalid"> boot.dev </a>
        </body>
    </html>
    `;

  const inputBaseURL = "https://boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
