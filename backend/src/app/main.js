//Setting the config directory
const path = require('path');

process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, 'config');


const server = require('./server');
const db = require('./db');
const {dbSettings} = require('config');
const {serverSettings} = require('config');
const {EventEmitter} = require('events');

const mediator = new EventEmitter();


mediator.on('db.ready', () => {
    mediator.emit('boot.server');
});

mediator.on('db.error', (err) => {
    console.log(err);
});

mediator.once('boot.server', () => {
    server.start(serverSettings.port).then((serv) => {
        serv.on('close', () => {
            db.disconnect().then((res) => {
                console.log(res);
            })
        });
    }).catch((err) => {
        console.log(serverSettings);
        console.log(err);
    });
});

db.connect(dbSettings.default.url, mediator);

mediator.emit('boot.ready'); 