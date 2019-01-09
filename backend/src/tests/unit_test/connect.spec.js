const chai = require('chai');
const mongo = require('../../db/mongo');
const mocha = require('mocha');
const config = require('config');
const { EventEmitter } = require('events');
const {connect} = require('../../app/controller/connect');
const {hobbyController} = require('../../app/controller/hobby_controller');

describe('-- Testing connect function -- ', () => {
    it('should connect with a promise', (done) => {



        const mediator = new EventEmitter();
        mediator.on('db.ready', (db_connection) => {
            chai.expect(connect(db_connection, hobbyController)).to.be.a('Promise');
            db_connection.close();
            done();
        });

        mongo.connect(config.dbSettings.test.url, mediator);

        mediator.emit('boot.ready');
    }); 


    it('should throw an error if null is passed to connect function', (done) => {
        const mediator = new EventEmitter();


        mediator.on('db.ready', (db_connection) => {

            connect(null, hobbyController).catch((err) => {
                console.log(err.message);
                chai.assert.equal(err.message, 'connecting db not supplied!');
                db_connection.close();
                done();

            });

        });

        mongo.connect(config.dbSettings.test.url, mediator);

        mediator.emit('boot.ready');
    });

    it('should throw an error if undefined is passed to connect function ', (done) => {
        const mediator = new EventEmitter();


        mediator.on('db.ready', (db_connection) => {

            connect(undefined, hobbyController).catch((err) => {
                console.log(err.message);
                chai.assert.equal(err.message, 'connecting db not supplied!');
                db_connection.close();
                done();

            });

        });

        mongo.connect(config.dbSettings.test.url, mediator);

        mediator.emit('boot.ready');
    });

    it('should throw an error if an empty object is passed to connect function', (done) => {
        const mediator = new EventEmitter();


        mediator.on('db.ready', (db_connection) => {

            connect({}, hobbyController).catch((err) => {
                console.log(err.message);
                chai.assert.equal(err.message, 'connecting db not supplied!');
                db_connection.close();
                done();

            });

        });

        mongo.connect(config.dbSettings.test.url, mediator);

        mediator.emit('boot.ready');
    });

    it('should throw an error if a repository is not supplied', (done) => {
        const mediator = new EventEmitter();


        mediator.on('db.ready', (db_connection) => {

            connect(db_connection, {}).catch((err) => {
                console.log(err.message);
                chai.assert.equal(err.message, 'Repository is not supplied!');
                db_connection.close();
                done();

            });

        });

        mongo.connect(config.dbSettings.test.url, mediator);

        mediator.emit('boot.ready');
    });
});
