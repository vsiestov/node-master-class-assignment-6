
const http = require('http');
const https = require('https');
const fs = require('fs');
const config = require('./config.js');
const app = require('./app');
const cluster = require('cluster');
const os = require('os');

const key = fs.readFileSync(`${__dirname}/ssl/key.pem`);
const cert = fs.readFileSync(`${__dirname}/ssl/cert.pem`);

const httpsServerOptions = {
	key,
	cert
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsServerOptions, app);

const server = {
};

/**
 * Init application listeners
 */
server.init = () => {
    httpServer.listen(config.httpPort, () => {
        console.log(`The server is listening on port ${config.httpPort}, current environment: ${config.environment}`);
    });

    httpsServer.listen(config.httpsPort, () => {
        console.log(`The server is listening on port ${config.httpsPort}, current environment: ${config.environment}`);
    });
};

// Walk through the list of available cpu and run the application

if (cluster.isMaster) {
	const cpus = os.cpus();
	const cpusCount = cpus.length;

    for (let i = 0; i < cpusCount; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {
    server.init();

    console.log(`Worker ${process.pid} started`);
}