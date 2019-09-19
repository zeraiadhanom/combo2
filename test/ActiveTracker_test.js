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
const Achievement = require('../models/achievement');
//console.log(Achievement);
const User = require('../models/user');
//console.log(User);
const {app, runServer, closeServer} = require('../server');
// import TEST_DATABASE_URL from ('../config');
const {DATABASE_URL, TEST_DATABASE_URL} = require('../config');
console.log(TEST_DATABASE_URL);

// chai
const should = chai.should();
chai.use(chaiHttp);

// function definitions
function seedAchievementData() {
	console.info('Seeding achievement data');
	const seedData = [];

	for (let i=1; i<=10; i++) {
		seedData.push(generateAchievementData());
	}
	// console.log(seedData);
	// console.log(Achievement);
	// should return a promise
	return Achievement.insertMany(seedData);
}
const testUsername = faker.random.word() + faker.random.number();

function generateUserData() {
	return {
		username: testUsername,
		password: faker.random.word()
	}
}

function generateTrait() {
	const Sports = [
		'Optimism', 'Creativ', 'Resilience', 'Self-Control', 'Focus', 'Flexibility', 'Vision', 'Time Management', 'Communication Skills', 'Courage', 'Generosity', 'Confidence', 'Curiosity', 'Planning', 'Balance', 'Enthusiasm', 'People Skills', 'Listening Skills', 'Empathy', 'Preparation', 'Self-Reliance', 'Gratitude', 'Forgiveness', 'Goal Setting', 'Grit', 'Tenacity'];
		return traits[Math.floor(Math.random() * traits.length)];
}

function generateAchievementData() {
	return {
		// should be the same as username from generateUserData() above
		user: testUsername, 
		achieveWhat: faker.lorem.sentence(),
		achieveHow: [generateTrait(), generateTrait(), generateTrait()],
		achieveWhen: faker.date.past().toString(),
		achieveWhy: faker.lorem.sentence()
	}
}

function tearDownDb() {
	console.warn('Deleting database!');
	return mongoose.connection.dropDatabase();
}

describe('sports API resource', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL)
		.then(console.log('running server'))
		.catch(err => console.log({err}));
	});

	beforeEach(function() {
		return seedSportData();
	});

	describe('GET endpoint', function() {
		it('should return all sports in the DB for a user', function() {
			let res;
			return chai.request(app)
				.get('/sports/' + testUsername)
				.then(function(_res) {
					res = _res;
					res.should.have.status(200);
					res.body.sportOutput.should.have.length.of.at.least(1);
					return sport.count();
				})
				.then(function(count) {
					res.body.sportOutput.should.have.length.of(count);
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

				res.body.sportOutput.forEach(function(achievement) {
					sport.should.be.a('object');
					sport.should.include.keys(
						'id', 'activity', 'distanceCovered', 'timeElapsed', 'comment');
				});
			});
	});

	describe('POST endpoint', function() {
		it('should add a new sport activites', function() {
			const newActivity = generateSportData();
			console.log(newActivity);

			return chai.request(app)
				.post('/sports/create')
				.send(newActivity)
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body.should.include.keys(
						''id', activity', 'distanceCovered', 'timeElapsed', 'location', 'comment');
					res.body.user.should.equal(new.user);
					res.body.activity.should.equal(newActivity.activity);
					// res.body.distanceCovered.should.equal(newActivity.distanceCovred); // returns two objects that look same but says they're not
					res.body.activityTimeElapsed.should.equal(newtimeElapsed.timeElapsed);
					res.body.location.should.equal(newActivity.location);
					res.body._id.should.not.be.null;

					return sport.findById(res.body.id);
				})
				// .then(function(achievement) {
				// 	console.log(achievement);
				// 	achievement.user.should.equal(newAchievement.user);
				// 	// achievement.achieveWhat.should.equal(newAchievement.achieveWhat);
				// 	// achievement.achieveHow.should.equal(newAchievement.achieveHow);
				// 	// achievement.achieveWhen.should.equal(newAchievement.achieveWhen);
				// 	// achievement.achieveWhy.should.equal(newAchievement.achieveWhy);
				// });
		});
	});

	describe('PUT endpoint', function() {
		it('should update fields sent over', function() {
			const updateData = {
				activity: 'cycling',
				distanceCovered: '50'
			};

			return Achievement
				.findOne()
				.then(function(achievement) {
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
					achievement.achieveWhat.should.equal(updateData.activity);
					achievement.achieveWhy.should.equal(updateData.distanceCovered);
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