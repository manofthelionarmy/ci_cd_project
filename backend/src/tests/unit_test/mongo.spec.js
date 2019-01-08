const {EventEmitter} = require('events');
const chai = require('chai');
const mongo = require('../../db/mongo');
const mocha = require('mocha');
const config = require('config'); 

mocha.describe('-- Testing Mongo ---', () => {
    describe('Testing connection() function', () => {
        it('should emit Mongoose.Connection Object with an Event Emitter', (done) => {
            const mediator = new EventEmitter();

            mediator.on('db.ready', (connection) => {
                chai.assert.exists(connection);
                connection.close(() => {
                    console.log('Disconnected from MongoDB');
                });

                done();
            }); 

            mongo.connect(config.dbSettings.test, mediator); 

            mediator.emit('boot.ready');
        });

        it('should throw an error when MongoDB experiences an error', () => {
            const mediator = new EventEmitter();

            chai.assert.throws(() => {
                mongo.connect({}, mediator);

                mediator.emit('boot.ready');
            });
        })
    });
});