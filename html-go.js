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
//Make sure user provided file generation schema is correct, before actually generating files
//resolvePath function not correct, does not return incase of faulty path

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

function createProjectStructureRecursively(targetPath, itemArray) {
  itemArray.forEach((item) => {
    //Extract the configuration structure against file || folder
    const artifactName = Object.keys(item)[0]; //File || folder name
    const artifactObject = item[artifactName];
    let fullyQualifiedPath = path.join(targetPath, artifactName);

    if (artifactObject["type"] == "folder") {
      fs.mkdir(fullyQualifiedPath, (e) => {
        if (e) {
          if (e.code == "EEXIST") {
            info(`Folder already exist : "${artifactName}" in ${targetPath}`);
          } else {
            error(
              `Unable to create folder :  "${artifactName}" in ${targetPath}`
            );
          }
        } else {
          success(`Created folder : "${artifactName}" in ${targetPath}`);
        }
      });
    } else {
      //its a file
      fs.writeFile(fullyQualifiedPath, "",{flag : "wx"}, (e) => {
        if (e) {
          if (e.code == "EEXIST") {
            info(`File already exist : "${artifactName}" in ${targetPath}`);
          } else {
            error(
              `Unable to create file :  "${artifactName}" in ${targetPath}`
            );
          }
        } else {
          success(`Created file : "${artifactName}" in ${targetPath}`);
        }
      });
    }

    //if object contains items, then recursively create them as well
    if(Object.keys(artifactObject).indexOf("items") > -1){
        createProjectStructureRecursively(fullyQualifiedPath , artifactObject["items"]);
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
