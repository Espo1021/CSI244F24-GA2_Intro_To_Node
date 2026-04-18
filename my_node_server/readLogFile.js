const fs = require ('fs');
const path = require ('path');

function getLogFile() {
    const logFilePath = path.join(__dirname, 'visitors.log');
    return fs.readFileSync(logFilePath, 'utf8');
}

module.exports = fetLogFile;