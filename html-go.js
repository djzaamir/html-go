const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const log = console.log;
const error = (err) => {
  log(chalk.white.bgRed.bold(err));
};
const info = (inf) => {
  log(chalk.white.bgBlue.bold(inf));
};
const success = (succ) => {
  log(chalk.white.bgGreen.bold(succ));
};

//TODO

//Instead of creating a structure from scratch
//Move a ready-made project structure with base code in it from a known location
//And allow user via command line to edit this template
//Because the current structure looks very convoluted

//Make sure user provided file generation schema is correct, before actually generating files
//resolvePath function not correct, does not return incase of faulty path
//Apply DRY and add js style object structure for functions maybe!
//Extract project structure conf file into its own structure
//Improve formatting of output in console everything is unorganized

//File and Folder Structure
const projectStructureTemplate = [
  {
    js: {
      type: "folder",
      items: [
        {
          "app.js": {
            type: "file",
          },
        },
      ],
    },
  },
  {
    css: {
      type: "folder",
      items: [
        {
          "styles.css": {
            type: "file",
          },
        },
      ],
    },
  },
  {
    "index.html": {
      type: "file",
    },
  },
];

function creationCallback(e, artifact, artifactName, targetPath) {
  if (e) {
    if (e.code == "EEXIST") {
      info(`${artifact} already exists -> "${artifactName}" in ${targetPath}`);
    } else {
      error(`Unable to create ${artifact} -> "${artifactName}" in ${targetPath}`);
    }
  } else {
    success(`Created ${artifact} -> "${artifactName}" in ${targetPath}`);
  }
}

function createProjectStructureRecursively(targetPath, itemArray) {
  itemArray.forEach((item) => {
    //Extract the configuration structure against file || folder
    const artifactName = Object.keys(item)[0]; //File || folder name
    const artifactObject = item[artifactName];
    let fullyQualifiedPath = path.join(targetPath, artifactName);

    if (artifactObject["type"] == "folder") {
      fs.mkdir(fullyQualifiedPath, (e) => {
        creationCallback(e, "folder" , artifactName , targetPath);
      });
    } else {
      //its a file
      fs.writeFile(fullyQualifiedPath, "", { flag: "wx" }, (e) => {
        creationCallback(e, "file" , artifactName , targetPath);
      });
    }

    //if object contains items, then recursively create them as well
    if (Object.keys(artifactObject).indexOf("items") > -1) {
      createProjectStructureRecursively(
        fullyQualifiedPath,
        artifactObject["items"]
      );
    }
  });
}

//Wrapper Function for the main recursive function
function createProjectStructure(targetPath) {
  createProjectStructureRecursively(targetPath, projectStructureTemplate);
}

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
