export function readFileToLines(inputPath: string) {
  const fs = require("fs");
  const data = fs.readFileSync(inputPath, { encoding: "utf-8", flag: "r" });
  return data.split("\n");
}

module.exports = {
  readFileToLines,
};
