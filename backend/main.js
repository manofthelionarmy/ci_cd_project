const server = require('./src/app/server');
const db = require('./src/app/db');
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

db.connect(dbSettings.url, mediator);

mediator.emit('boot.ready'); 