module.exports = function () {
    let db = require('./../../libs/connect-db')();
    let Schema = require('mongoose').Schema;

    return db.model('pedidos', Schema({
        id_usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
        produtos: [{ type: Schema.Types.ObjectId, ref: 'produto' }],
        mesa: String,
        date: { type: Date, default: Date.now },
        status: { type: Boolean, default: true }
    }, { collection: 'pedidos', usePushEach: true }));
}
