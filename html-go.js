const fs = require("fs");
const chalk = require("chalk");
const log = console.log;

//TODO
//Make sure user provided file generation schema is correct, before actually generating files

//File and Folder Structure
const projectStructureTemplate = [{
    "js": {
        "type": "folder",
        "items": [{
            "app.js": {
                "type": "file"
            }
        }]
    }
},
{
    "css": {
        "type": "folder",
        "items": [{
            "styles.css": {
                "type": "file"
            }
        }]
    }
},
{
    "index.html": {
        "type": "file"
    }
}
];


function createProjectStructureRecursively(targetPath , itemArray){
    itemArray.forEach(item => {
         
    });
}

//Wrapper Function for the main recursive function
function createProjectStructure(targetPath) {
   createProjectStructureRecursively(targetPath , projectStructureTemplate);
}


//Will Validate Existence of Path
function validatePath(targetPath){
    if (targetPath != null && targetPath.length > 0) {
        try {
            if (!fs.existsSync(targetPath)) {
                log("🔥 " + chalk.black.bgRed(("Path does not exist...")));
                return;
            }
        }catch(e){
            log("🔥 " + chalk.black.bgRed(("Encountered exception while validating path...")));

        }
    } else {
        targetPath = null;
    }   
}

//Will Resolve Path for creating project structure, as well as validate its existence
function resolveProjectPath(targetPath){
    const validateResult = validatePath(targetPath);
    return validateResult != null ? validateResult : "./";
}


function main() {
    let targetPath = String(process.argv.slice(2, 3));

    //Resolve and validate targetPath
    targetPath = resolveProjectPath(targetPath);

    createProjectStructure(targetPath);
}
main();