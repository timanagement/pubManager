module.exports = function(){
	let { db } = require('./../../libs/connect-db')();
	let Schema = require('mongoose').Schema;

	return db.model('usuario', Schema({
		nome: String,
		senha: String,
		/**
		 * 1 - Cliente
		 * 2 - Porteiro
		 * 3 - Caixa
		 * 4 - Adm
		 * 5 - Garçom
		 */
		tipo: Number,
		date: { type: Date, default: Date.now },
		status: { type: Boolean, default: true }
	}));
}
