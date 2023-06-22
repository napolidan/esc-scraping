const fs = require("fs");

function eraseScreenshots() {
  let filePath = "screenshot";
  for (let file = 1956; file < 2025; file++) {
    filePath += file + ".png";

    fs.unlink(filePath, (err) => {
      if (err) {
        //console.error(`Failed to delete the file: ${err}`);
        return;
      }
      // console.log("File deleted successfully");
    });

    filePath = "screenshot";
  }
}

module.exports = { eraseScreenshots };
