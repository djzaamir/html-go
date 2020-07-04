const fs = require("fs");
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

function createProjectStructure() {

}

function main() {
    let targetPath = String(process.argv.slice(2, 3));

    if (targetPath != null && targetPath.length > 0) {
        try {
            fs.statSync(targetPath).isDirectory();
        } catch (e) {
            if (e.code == "ENOENT") {
                console.log("Path does not exist...");
                return;
            }            
        }

    } else {
        targetPath = null;
    }

    console.log(targetPath);

    createProjectStructure();
}


main();