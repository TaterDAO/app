const fs = require("fs");

const configs = fs.readdirSync("../contracts/.openzeppelin");

const map = configs.reduce((memo, filename) => {
  const raw = fs.readFileSync(`../contracts/.openzeppelin/${filename}`);
  const data = JSON.parse(raw.toString());
  const latestProxy = data.proxies[data.proxies.length - 1];

  let networkName = filename.split(".json")[0];
  if (networkName === "unknown-31337") networkName = "localhost";

  return { ...memo, [networkName]: latestProxy.address };
}, {});

fs.writeFileSync("src/data/addresses.json", JSON.stringify(map));
