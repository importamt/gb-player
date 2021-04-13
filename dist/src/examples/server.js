"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var http = require('http');
var argv = require('minimist')(process.argv.slice(2));
function sendResponse(res, statusCode, body) {
    res.writeHead(statusCode);
    res.write(body);
    res.end();
}
function send200(res, body) {
    sendResponse(res, 200, body || '<h1>OK</h1>');
}
function send404(res, body) {
    sendResponse(res, 404, body || '<h1>Not Found</h1>');
}
function pipeFileToResponse(res, file, type) {
    if (type) {
        res.writeHead(200, {
            'Content-Type': type
        });
    }
    fs.createReadStream(path.join(__dirname, file)).pipe(res);
}
var server = http.createServer(function (req, res) {
    var url = req.url || '/';
    // Process axios itself
    if (/gtbPlayer\.min\.js$/.test(url)) {
        pipeFileToResponse(res, '../dist/gtbPlayer.min.js', 'text/javascript');
        return;
    }
    if (/gtbPlayer\.min\.map$/.test(url)) {
        pipeFileToResponse(res, '../dist/gtbPlayer.min.map', 'text/javascript');
        return;
    }
    if (/gtbPlayer\.js$/.test(url)) {
        pipeFileToResponse(res, '../dist/gtbPlayer.js', 'text/javascript');
        return;
    }
    if (/gtbPlayer\.map$/.test(url)) {
        pipeFileToResponse(res, '../dist/gtbPlayer.map', 'text/javascript');
        return;
    }
    if (url === '/' || url === '/index.html') {
        send200(res, fs.readFileSync('index.html', 'utf-8'));
        return;
    }
    else {
        send404(res);
    }
});
var PORT = argv.p || 3000;
server.listen(PORT);
console.log("Examples running on " + PORT);
//# sourceMappingURL=server.js.map