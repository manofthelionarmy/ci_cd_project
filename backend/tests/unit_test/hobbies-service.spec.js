const path = require('path');

process.env['NODE_CONFIG_DIR'] = path.resolve(__dirname, '../config');

const hobbyService = require('../../src/app/server/services/hobbies.service');
const mocha = require('mocha');
const chai = require('chai');
const db = require('../../src/app/db');
const {dbSettings} = require('config');
const {EventEmitter} = require('events');
const sinon = require('sinon');
const Hobby = require('../../src/app/models/hobbies.model');

/**Documentation found at: https://github.com/nodkz/mongodb-memory-server#simple-mochachai-test-example
 * Had to increase the mocha timeout due to the issue stated in the link above. 
 */
const {MongoMemoryServer} = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

describe('Testing Hobby Services', () => {

    describe('Testing getAllHobbies function', () => {

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
        it('should return a Promise with the resolved hobbies', (done) => {
            hobbyService.getAllHobbies().then((hobbies) => {
                chai.assert.exists(hobbies);
                console.log('\tHobbies:', hobbies);
                done();
            });
        });

        it('should catch an error', (done) => {

            /**stubbed Hobby.find() and forced it to reject and finally goy 100% code coverage. I guess I don't have to mimic
             * the code complete as I did in the comments below. @3:46 AM
            */
            
            const ModelFindStub = sinon.stub(Hobby, "find").rejects();
        
            //Stubbed hobbyService.getAllHobbies() and forced it to return a new Promise using the stubbed Hobby.find()
            //Should catch an error
            //Completely mimicked the code from hobbies.service and the tests pass (but still can't get 100% in code coverage) @3:26AM
           /* const isGetAllHobbiesStub = sinon.stub(hobbyService, "getAllHobbies").returns(new Promise((resolve, reject) => {
                const query = Hobby.find(); 

                query.catch((err) => {
                    reject(new Error('Cannot get all hobbies'));
                });
            })); */

            hobbyService.getAllHobbies().catch((err) => {
                console.log(err.message);
                chai.assert.exists(err);
                chai.assert.equal(err.message,'Cannot get all hobbies'); 

                ModelFindStub.restore();
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
        
        it('should return a resolved promise when a hobby is successfully added', async () => {

            const result = await Hobby.db.dropDatabase();

            const hobby = {
                name: 'Armando',
                hobby: 'learning'
            }; 

            const res = await hobbyService.addHobby(hobby); 

            chai.assert.exists(res.hobbyId);
            chai.assert.equal(res.message, 'Successfully saved a hobby.');

            
        });

        it('should catch an error if an error is thrown while saving the hobby', (done) => {
            const hobby = {
                name: 'Evan',
                hobby: 'drawing'
            }; 

            const ModelSaveStub = sinon.stub(Hobby.prototype, 'save').rejects(); 

            hobbyService.addHobby(hobby).catch((err) => {
                console.log(err.message);
                chai.assert.exists(err); 

                ModelSaveStub.restore();
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