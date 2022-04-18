const fs = require("fs");
const DIR_PATH = "./data/master/";

const loadMasterData = (fileName) => {
  return JSON.parse(fs.readFileSync(DIR_PATH + fileName, "utf-8"));
};

module.exports = { loadMasterData };
