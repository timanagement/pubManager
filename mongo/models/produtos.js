module.exports = function(){
	let { db } = require('./../../libs/connect-db')();
	let Schema = require('mongoose').Schema;

	return db.model('produto', Schema({
		nome: String,
		imagem: String,
		preco: Number,
		quantidade: Number,
		date: { type: Date, default: Date.now },
		status: { type: Boolean, default: true }
	}, { collection: 'produto' }));
}
