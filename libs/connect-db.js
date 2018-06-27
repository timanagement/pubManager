const mongoose = require("mongoose");

let db;

module.exports = function(){
	if(!db){
		const DATABASE = 'pub';
		mongoose.Promise = global.Promise;
		db = mongoose.connect(`mongodb://127.0.0.1:27017/${DATABASE}`);
		// db = mongoose.connect(`mongodb://pub:pub@cluster0-shard-00-00-zq7hu.mongodb.net:27017,cluster0-shard-00-01-zq7hu.mongodb.net:27017,cluster0-shard-00-02-zq7hu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`);
	}
	return db;
}
