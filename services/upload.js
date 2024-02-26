const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Ensure the uploads directory exists
const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
var storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, "uploads");
},
filename: function (req, file, cb) {
    let ext = file.originalname.split(".")[1];
    cb(null, `${Date.now()}.${ext}`);
},
});

const upload = multer({ storage: storage });
module.exports = upload;