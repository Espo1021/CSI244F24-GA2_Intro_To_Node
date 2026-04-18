const fs = require ('fs');
const path = require('path');

function logVisitor(visitorData) {
    const logFilePath = path.join(__dirname, 'visitors.log');
    fs.appendFileSync(logFilePath, visitorData + '\n');
}

module.exports = logVisitor;