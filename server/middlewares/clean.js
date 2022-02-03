const fs = require('fs');
const path = require('path');

const clean =async (req,res,next)=>{
    let files = req.files;
    console.log("------ CLEAN MIDDLEWARE START -----",files);
    for(let i = 0; i < files.length; i++){
        let file = files[i];
        let filePath = path.resolve(file.path);
        fs.unlinkSync(filePath);
        let afterFiles = fs.readdirSync(path.resolve(`seperate/after`));
        console.log("AFTER FİLES",afterFiles);
        let filtered = afterFiles.filter(item => item.includes(file.filename));
        for(let j = 0; j < filtered.length; j++){
            let afterFile = filtered[j];
            let afterFilePath = path.resolve(`seperate/after/${afterFile}`);
            fs.unlinkSync(afterFilePath);
        }
    }
    next();
    console.log("------ CLEAN MIDDLEWARE END -----");
}
module.exports = clean;