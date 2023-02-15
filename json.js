const fs = require("fs").promises;


const readFiles = async () => {
    const files = await fs.readdir(path.join(__dirname, "svg"));
};

readFiles();