var expect 	= require('chai').expect,
	fs 		= require('fs'),
	path 	= require('path'),
	Branch 	= require('../../../../models/branch'),
	Member 	= require('../../../../models/member'),
	api 	= require('../../support/api');

describe('controller.api.branchs', function () {
	var branches

	beforeEach(function (done) {
		Branch.remove({},done);
	});

	beforeEach(function (done) {
		var file = path.join(__dirname,'../../../../config/memberDB/branchList.json')
		fs.readFile(file, 'utf8', function (err, data) {
			if (err)  throw err ;
			branches = JSON.parse(data);
			Branch.create(branches,done);
		});
	});

	describe('GET /api/branches', function() {
		it('it has 23 branches in database', function(done) {
			api.get('/api/branches')
			.expect(200)
			.expect(function(res){
				expect(res.body).to.have.length(branches.length);
			})
			.end(done)
		});

		it('branches data sorted in order. first branch id is 1', function(done) {
			api.get('/api/branches')
			.expect(200)
			.expect(function(res){
				expect(res.body[0].id).to.equals(1)
			})
			.end(done)
		});
	});

	describe('POST /api/branches', function () {
		var branch = {
			name: "測試分隊",
			corps: "第三救災救護大隊",
			pos : {
				lat     : 25.0927297,
			  	lng     : 121.4608639,
			  	address : "新北市蘆洲區長榮路792號6樓"
			}
		}
		beforeEach(function (done) {
			api.post('/api/branches')
			.send(branch)
			.end(done)
		});	

		it('it has one branch', function(done) {
			Branch.findOne({
				name : branch.name
			},function(err,_branch){
				expect(_branch).to.deep.equals(_branch)
				done();
			})
		});
	});



	afterEach(function (done) {
		Branch.remove({},done);
	});

	// describe('GET /api/branches/:branchId', function() {

	// 	// beforeEach(function(done){
	// 	// 	Member.remove({},done)
	// 	// })

	// 	// beforeEach(function(done){
	// 	// 	var file = path.join(__dirname,'../../../../config/memberDB/branchList.json')
	// 	// 	fs.readFile(file, 'utf8', function (err, data) {
	// 	// 		if (err)  throw err ;
	// 	// 		Member = JSON.parse(data);
	// 	// 		Member.create(branches,done);
	// 	// 	});



	// 	// })
	// 	it('it has branches details and members property', function(done) {
	// 		api.get('/api/branches/10?onDuty=true')
	// 		.expect(200)
	// 		.expect(function(res){
	// 			res.body.members.forEach(function(member){
	// 				expect(member.onDuty).to.have.equals(true);
	// 			});
	// 		})
	// 		.end(done);
	// 	});
	// });
});