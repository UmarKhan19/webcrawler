const { sortPages } = require("../dist/report.js");
const { expect, test } = require("@jest/globals");

test("Sort results", () => {
  const input = {
    "https://wagslane.dev": 3,
    "https://wagslane.dev/path": 8,
  };

  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev/path", 8],
    ["https://wagslane.dev", 3],
  ];
  expect(actual).toEqual(expected);
});
