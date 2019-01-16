const path = require('path');

process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '../config');

const db = require('../../src/app/db');
const chai = require('chai');
const mocha = require('mocha');
const {EventEmitter} = require('events');
const {dbSettings} = require('config');
const mongoose = require('mongoose');
const sinon = require('sinon');

describe('Testing Mongo DB', () => {
    describe('Testing connect function', () => {
        it('should successfully connect and emit an EventEmitter Object', (done) => {
            const mediator = new EventEmitter();

            mediator.on('db.ready', (msg) => {
                chai.assert.equal(msg, 'Connected to Database');
                mongoose.connection.close().then(() => {
                    console.log('Disconnected from the Database');
                })
                done();
            });

            db.connect(dbSettings.test.url, mediator);

            mediator.emit('boot.ready');
        });

        it('should emit db.error when mongoose.connect() expreiences an error', (done) => {

            const stub_mognoose_connect = sinon.stub(mongoose, 'connect').rejects();

            const mediator = new EventEmitter();

            mediator.on('db.error', (err) => {
                chai.assert.exists(err);
                console.log(err.message);
                stub_mognoose_connect.restore();
                done();
            });

            db.connect(dbSettings.test.url, mediator);

            mediator.emit('boot.ready');
        });
    });

    describe('Testing disconnect function', () => {

       it('should throw an error', (done) => {
           const stub_mongooseconnection_close = sinon.stub(mongoose.connection, 'close').rejects();

           db.disconnect().catch((err) => {
               chai.assert.exists(err);
               stub_mongooseconnection_close.restore();
               done();
           });
       });
    }); 
});