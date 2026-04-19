const http = require('http');
const getSystemInfo = require('./systemInfo');
const logVisitor = require('./logVisitor');
const getLogFile = require('./readLogFile');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/system-info') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getSystemInfo()));
    } else if (req.url === '/log-visitor') {
        const visitorData = `Visitor at ${new Date().toISOString()}`;
        logVisitor(visitorData);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Visitor logged');
    } else if (req.url === '/view-log') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(getLogFile());
    } else if (req.url === '/') {
        const studentInfoPath = path.join(__dirname, 'studentInfo.html');
        fs.readFile(studentInfoPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading student information');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/user-form') {
        const formPath = path.join(__dirname, 'userForm.html');
        fs.readFile(formPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading form');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/submit-form' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            const data = `Name: ${name}, Email: ${email}, Message: ${message}\n`;

            fs.appendFile('formSubmissions.txt', data, (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error saving form data');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end('<h1>Form submitted successfully!</h1><a href="/user-form">Submit another response</a>');
                }
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});