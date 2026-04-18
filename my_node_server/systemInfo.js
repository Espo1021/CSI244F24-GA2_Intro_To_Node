const os = require('os');

function getSystemInfo() {
    return {
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpuCount: os.cpus().length
    };
}

module.exports = getSystemInfo;