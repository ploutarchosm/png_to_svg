const fs = require("fs");
const path = require("path");
const potrace = require("potrace");
const trace = new potrace.Potrace();

const createSvg = (image) =>
  `<svg xmlns="http://www.w3.org/2000/svg">${image}</svg>`;
const createDelay = ms => new Promise(res => setTimeout(res, ms))

const createFile = async (time, file) => {
  await createDelay(time);
  trace.loadImage(file, (err) => {
    if (err) throw err;
    let fName = path.parse(file).name;
    fs.writeFileSync(path.join(__dirname, 'svg', fName + '.svg'), createSvg(trace.getSymbol(fName)))
  });
}

fs.readdir(path.join(__dirname, "png"), (err, files) => {
  if (err) {
    throw err;
  }
  for (let i=0; i < files.length; i++) {
    (async (i) => {
      await createFile(100 * i, path.join(__dirname, "png", files[i]))
    })(i)
  }
});
