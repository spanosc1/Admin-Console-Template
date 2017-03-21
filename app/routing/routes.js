var Item = require("../model/item.js");
var path = require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){
	app.get('/api/all', function(req, res){
		Item.findAll({}).then(function(result){
			console.log(result);
			res.json(result);
		});
	});
	app.get('/api/current', function(req, res){
		var timeStamp = Math.floor(Date.now())/1000;
		Item.findAll({
			where: {
				startdate: {
					lte: timeStamp
				},
				enddate: {
					gt: timeStamp
				}
			}
		}).then(function(result){
			console.log(result);
			res.json(result);
		});
	});
	app.post('/api/add', function(req, res){
		var dateTimeStart = new Date(req.body.startDate).getTime()/1000;
		var dateTimeEnd = new Date(req.body.endDate).getTime()/1000;
		Item
			.build({ startdate: dateTimeStart, enddate: dateTimeEnd, itemname: req.body.itemName, itemdesc: req.body.itemDesc})
			.save()
			.then(function(){
				console.log("Success");
			});
		res.send(true);
	});
	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../public/html/index.html'));
	});
}