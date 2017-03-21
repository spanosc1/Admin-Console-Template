// Dependency

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize"); 
// sequelize (lowercase) references my connection to the DB. You could name it something else, but I was just following their convention.
var sequelize = require("../config/connection.js"); 

// Creates an "Item" model that matches up with DB
var Item = sequelize.define("autoupdates", {
	startdate: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
  enddate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemname: {
  	type: Sequelize.STRING,
  	allowNull: false,
  },
  itemdesc: {
  	type: Sequelize.TEXT
  }
});

// Syncs with DB
Item.sync();

// Makes the item Model available for other files (will also create a table)
module.exports = Item;