const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");


//Chalk helper methods
const log = console.log;
const error = (err) => {
  log(chalk.white.bgRed.bold(err));
};
const info = (inf) => {
  log(chalk.white.bgBlue.bold(inf));
};
const success = (succ) => {
  log(chalk.white.bgGreen.bold(succ));
  fs.cop
};

//TODO

//Instead of creating a structure from scratch
//Move a ready-made project structure with base code in it from a known location
//And allow user via command line to edit this template
//Because the current structure looks very convoluted

//Make sure user provided file generation schema is correct, before actually generating files
//Apply DRY and add js style object structure for functions maybe!
//Improve formatting of output in console everything is unorganized


//Will Resolve Path for creating project structure, as well as validate its existence
function resolvePath(targetPath) {
  if (targetPath != null && targetPath.length > 0) {
    try {
      if (!fs.existsSync(targetPath)) {
        error("Path does not exist.");
        info("Please provide a valid path or no path to use defaults.");
        return null;
      }
    } catch (e) {
      error("Encountered exception while validating path...");
      return null;
    }

    //if all good, return original path as good path
    return targetPath;
  } else {
    //Return default path
    return "./";
  }
}

function main() {
  let targetPath = String(process.argv.slice(2, 3));

  //Resolve and validate targetPath
  targetPath = resolvePath(targetPath);
  if (targetPath == null) return;

  createProjectStructure(targetPath);
}
main();
