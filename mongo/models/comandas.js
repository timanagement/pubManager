module.exports = function () {
    let { db } = require('./../../libs/connect-db')();
    let Schema = require('mongoose').Schema;

    return db.model('comanda', Schema({
        id_usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
        produtos: [ { type: Schema.Types.ObjectId, ref: 'produto' } ],
        date: { type: Date, default: Date.now },
        status: { type: Boolean, default: true }
    }, { collection: 'comanda', usePushEach: true }));
}
