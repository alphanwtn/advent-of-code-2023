function readFileToLines(inputPath) {
  const fs = require("fs");
  const data = fs.readFileSync(inputPath, { encoding: "utf-8", flag: "r" });
  return data.split("\n");
}

exports.readFileToLines = readFileToLines;
