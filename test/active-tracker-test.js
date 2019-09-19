// connect to db
// insert seed data into db
// make HTTP requests to API using the test client
// inspect the state of the db after request is made
// tear down the db

// using ES6 promises

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// requiring in the js files from this app
const Sport = require('../models/sport/model');
//console.log(Sport);
const User = require('../models/user/model');
//console.log(User);
const {app, runServer, closeServer} = require('../server');
// import TEST_DATABASE_URL from ('../config');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');
console.log(TEST_DATABASE_URL);

// chai
const should = chai.should();
chai.use(chaiHttp);


//========

//Create user to seed db and test create user
function generateUser() {
    return {
      firstName: faker.name.firstName(),
      username: faker.random.word(),
      password: faker.internet.password()
    }
}

function seedUserData() {
  console.info('Seeding user data');
  const seedData = [];

  for (let i=1; i<10; i++) {
    seedData.push(generateUser());
  }
  console.log(seedData);
  return User.insertMany(seedData);
}



function seedSportData() {
  console.info('seeding sport data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateSportData());
  }
  // this will return a promise
  return sport.insertMany(seedData);
}


// used to generate data to put in db

function generateSports() {
    const sports = [
                    'activity', 'distanceCovered', 'timeElapsed','comment'];
    return sports[Math.floor(Math.random() * sports.length)];
}


// generate an object represnting sports.

function generateSportData() {
  return {
    user: generateUser(),
    sports: generateSports()
    
  };
}


// this function deletes the entire database.


function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Sport API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedSportData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedSportData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });


	describe('GET endpoint', function() {
		it('should return all sports in the DB for a user', function() {
			let res;
			return chai.request(app)
				.get('/sports/')
				.then(function(_res) {
					res = _res;
					expect(res).to.have.status(200);
					expect(res.body.sports).to.have.length.of.at.least(1);
                    return Sport.count();
                   })
				.then(function(count) {
                 expect(res.body.sports).to.have.length.of(count);
              });
		});
	});

	it('should return sports with the right fields', function() {
		// ensure they have the expected keys
		return chai.request(app)
			.get('/sports/')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.sportsOutput.should.be.a('array');
				res.body.sportsOutput.should.have.length.of.at.least(1);

				res.body.sportOutput.forEach(function(sport) {
					sport.should.be.a('object');
					sport.should.include.keys('activity', 'distanceCovered', 'timeElapsed', 'comment');
				});
			});
	});

	describe('POST endpoint', function() {
		it('should add a new sport activites', function() {
			const newSport = generateSportData();
			console.log(newSport);

			return chai.request(app)
				.post('/sports/create')
				.send(newSport)
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						'id', 'activity', 'distanceCovered', 'timeElapsed', 'location', 'comment');
					res.body.user.should.equal(newSport.user);
					res.body.activity.should.equal(newSport.activity);
					res.body.distanceCovered.should.equal(newSport.distanceCovred);
					res.body.activityTimeElapsed.should.equal(newSport.timeElapsed);
					res.body.location.should.equal(newSport.location);
					res.body._id.should.not.be.null;

					return sport.findById(res.body.id);
				})
		});
	});

	describe('PUT endpoint', function() {
		it('should update fields sent over', function() {
			const updateData = {
				activity: 'cycling',
				distanceCovered: '50'
			};

			return Sports
				.findOne()
				.then(function(sports) {
					updateData.id = sport.id;
					return chai.request(app)
						.put(`/sport/${sport.id}`)
						.send(updateData);
				})
				.then(function(res) {
					res.should.have.status(204);
					return sport.findById(updateData.id);
				})
				.then(function(sport) {
					sports.activity.should.equal(updateData.activity);
					sports.distanceCovered.should.equal(updateData.distanceCovered);
				});
		});
	});

	describe('DELETE endpoint', function() {
		it('should delete sport by ID', function() {
			let sport;
			return sport
				.findOne()
				.then(function(_sport) {
					sport = _sport;
					return chai.request(app).delete(`/sport/${sport.id}`);
				})
				.then(function(res) {
					res.should.have.status(204);
					return sport.findById(sport.id);
				})
				.then(function(_sport) {
					should.not.exist(_sport);
				});
		});
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
		return closeServer();
	});
});


