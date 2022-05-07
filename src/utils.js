const readline = require("readline");
const { COLOR_MAP } = require("./constants");

const pipeline = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printer = (val, color) => {
  console.log(`${COLOR_MAP[color]}%s\x1b[0m`, val);
};

module.exports = {
  printer,
  pipeline,
};
