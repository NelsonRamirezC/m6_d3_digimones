const digimones = require("./digimones.json");

let setNiveles = new Set();

for (const digimon of digimones) {
    setNiveles.add(digimon.level);
}

console.log(setNiveles);
