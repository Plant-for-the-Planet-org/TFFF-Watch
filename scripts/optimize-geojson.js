const fs = require("fs");
const path = require("path");

const inputFile = path.join(
  __dirname,
  "../public/ne_50m_admin_0_countries.geo.json"
);
const outputFile = path.join(
  __dirname,
  "../public/countries-optimized.geo.json"
);

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const optimized = {
  type: "FeatureCollection",
  features: data.features.map((f) => ({
    type: "Feature",
    properties: {
      name: f.properties.name,
      name_long: f.properties.name_long,
      iso_a2: f.properties.iso_a2,
      iso_a3: f.properties.iso_a3,
    },
    geometry: f.geometry,
  })),
};

fs.writeFileSync(outputFile, JSON.stringify(optimized));
console.log(
  `Optimized: ${fs.statSync(inputFile).size} → ${
    fs.statSync(outputFile).size
  } bytes`
);
