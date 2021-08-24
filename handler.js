const fs = require("fs");

const loadList = () => {
  const fileBuffer = fs.readFileSync("./data/list.json", "utf-8");
  const lists = JSON.parse(fileBuffer);
  return lists;
};

module.exports = { loadList };
