const path = require("path");
const potrace = require("potrace");
const fs = require("fs").promises;

const createSvg = (symbol) => `<svg xmlns="http://www.w3.org/2000/svg">${symbol}</svg>`;

const writeToFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    const trace = new potrace.Potrace();
    trace.loadImage(filePath, function(err) {
      if (err) reject(err);
      let fileName = path.parse(filePath).name;
      fs.writeFile(path.join(__dirname, 'svg', fileName + '.svg'), createSvg(trace.getSymbol(fileName)));
      resolve(true);
    });
  });
}

const readFiles = async () => {
  try {
    let convertedFiles = 0
    const files = await fs.readdir(path.join(__dirname, "png"));
    files.forEach(async file => {
      await writeToFile(path.join(__dirname, "png", file));
      convertedFiles++;
      console.log(`${convertedFiles}/${files.length} converted`)
    })
  } catch (err) {
    console.error('Error occurred while reading directory!', err);
  }
}

readFiles();