const server = require('./src/app/server/server');
const db = require('./src/db/mongo');
const {EventEmitter} = require('events');
const {dbSettings} = require('config');
const {serverSettings} = require('config');
const {connect} = require('./src/app/controller/connect');
const {hobbyController} = require('./src/app/controller/hobby_controller');
const hobbyAPI = require('./src/app/routes/api/hobbies');
const app = require('./src/app/server/app');

const mediator = new EventEmitter();

mediator.on('db.ready', (connection) => {
    connect(connection, hobbyController).then((controller) => {
        // add the routes to the express app
        hobbyAPI.addRoutes(app, controller); 
        server.start(serverSettings.port).then((serv) => {
            serv.on('close', () => {
                connection.close(() => {
                    console.log('Disconnected from MongoDB');
                }); 
            }); 
        }).catch((err) => {
            console.log(serverSettings);
            console.log(err); 
        })
    }).catch((err) => {
        console.log(err);
    }); 
}); 

mediator.on('db.error', (err) => {
    console.log(err);
}); 

db.connect(dbSettings.default.url, mediator);

mediator.emit('boot.ready'); 