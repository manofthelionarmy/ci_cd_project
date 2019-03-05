const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./app');


const normalizePort = (val) => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;

    switch (error.code) {
        case "EACCESS":
            console.error(bind + " require elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;

        default:
            throw error;
    }
}


const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    debug("Listening on " + bind);

    console.log("Listening on " + port);
}

const start = (portSettings)  => {

    return new Promise((resolve, reject) => {
        try {
            port = normalizePort(portSettings);

            app.set('port', port);

            server = http.createServer(app);
            server.on("error", onError);
            server.on("listening", onListening);

            // The call back resolves our server once it is listening on the port. 
            server.listen(port, '0.0.0.0', () => resolve(server));
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    start: start
}