const path = require('path');

process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '../config'); 

// Get the modules that we'll be stubbing
const hobbiesService = require('../../src/app/server/services/hobbies.service');
const hobbiesController = require('../../src/app/server/controllers/apis/hobbies.controller');
const Hobby = require('../../src/app/models/hobbies.model');

// Get the MongoDB and Express app
const db = require('../../src/app/db');
const app = require('../../src/app/server/app');
const {EventEmitter} = require('events');
const {dbSettings} = require('config');

// Setting up Test framework and utilities
const mocha = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Extend the capabilities of chai to use chai-http
chai.use(chaiHttp);

//Setting up In Memory MongoDB
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

describe('Testing hobbies controller', () => {
  
    describe('Testing getAll controller function', () => {

        before('Connecting to DB', (done) => {
            mongod.getConnectionString().then((mongoUri) => {
                const mediator = new EventEmitter();

                mediator.on('db.ready', () => {
                    done();
                });

                db.connect(mongoUri, mediator);

                mediator.emit('boot.ready');
    

            });
        });

        it('should get hobbies metadata with a 200 status', (done) => {

            chai.request(app).get('/api/v1/hobbies/getAll').end((err, res) => {
                chai.assert.exists(res);
                chai.assert.equal(res.status, 200);
                chai.assert.equal(res.body.message, 'Successfully retrieved hobbies');
                chai.assert.exists(res.body.hobbies);
                console.log(res.body.hobbies);
                done();
            }); 
        }); 

        it('should catch a 404 error and the message should say "Cannot get all hobbies" if an error is thrown by Hobby.find', (done) => {

           // ARRANGE: stub Hobby.find() function. Force it to reject
            const ModelFindStub = sinon.stub(Hobby, 'find').rejects();

            chai.request(app).get('/api/v1/hobbies/getAll').end((err, res) => {

                chai.assert.equal(res.status, 404);
                chai.assert.equal(res.body.message, 'Cannot get all hobbies');

                //Always restore the stubbed function
                ModelFindStub.restore();
                done();
            });
        });
        
        it('should catch an error if hobbiesService.getAll function throws an error', (done) => {
            // ARRANGE: stub hobbiesService getAll function. Force it to reject. 
            const getAllStub = sinon.stub(hobbiesService, 'getAllHobbies').rejects();

            chai.request(app).get('/api/v1/hobbies/getAll').end((err, res) => {
                chai.assert.equal(res.status, 404);
                chai.assert.exists(res.body.message);

                // Always restore the stubbed function
                getAllStub.restore();
                done();
            });
        });

        after((done) => {
            db.disconnect().then((res) => {
                console.log(res);
                done();
            }); 
        });
    });

    describe('Testing addHobby function', () => {
        before((done) => {
            mongod.getConnectionString().then((mongoUri) => {
                const mediator = new EventEmitter();

                mediator.on('db.ready', () => {
                    done();
                });

                db.connect(mongoUri, mediator);

                mediator.emit('boot.ready');

            });
        });

        it('should save a hobby and return a message saying: "Successfully saved a hobby."', (done) => {
            Hobby.db.dropDatabase();

            const hobby = {
                name: 'Olivia',
                hobby: 'crafts'
            };

            chai.request(app).post('/api/v1/hobbies/addHobby').send(hobby).end((err, res) => {
                chai.assert.notExists(err);
                chai.assert.equal(res.status, 201);
                chai.assert.exists(res.body.hobbyId);
                chai.assert.equal(res.body.message, 'Successfully saved a hobby.');
                done();
            });
        }); 

        it('should return a 500 error and return an error message if an error is thrown by hobbiesService getAll function', (done) => {

            // ARRANGE: Stub hobbiesService.getAll() and force it to reject.
            const getAllStub = sinon.stub(hobbiesService, 'addHobby').rejects();

            // DUMMY DATA
            const hobby = {
                name: 'Olivia',
                hobby: 'crafts'
            };

            chai.request(app).post('/api/v1/hobbies/addHobby').send(hobby).end((err, res) => {
                chai.assert.equal(res.status, 500);
                chai.assert.exists(res.body.message);

                //Alway restore the stubbed function
                getAllStub.restore();
                done();
            });
        }); 

        after((done) => {

            db.disconnect().then((res) => {
                console.log(res);
                done();
            });
        });
    });

    after((done) => {
        mongod.stop();
        done();
    });
}); 