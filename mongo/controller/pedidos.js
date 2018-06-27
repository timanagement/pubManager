const model = require('./../models/pedidos')();

const crud = {
    pesquisar: (query, callback) => {
        model.find(query, {})
            .populate('id_usuario')
            .populate('produtos')
            .exec((err, pedidos) => {
                if (err) throw err;
                callback(pedidos);
            });
    },
    criar: (fields, callback) => {
        model.create(fields, (err, pedido) => {
            if (err) throw err;
            callback(pedido);
        });
    },
    alterar: (idPedido, fields, callback) => {
        crud.pesquisarPorId(idPedido, (pedido) => {
            Object.keys(fields).forEach((key) => {
                pedido[key] = fields[key];
            });

            pedido.save((err, pedidoAlterado) => callback(pedidoAlterado));
        });
    },
    pesquisarPorId: (query, callback) => {
        model.findById(query, (err, pedido) => {
            if (err) throw err;
            callback(pedido);
        });
    },
    pesquisarPorNome: (query, callback) => {
        model.findOne({ nome: query }, (err, pedido) => {
            if (err) throw err;
            callback(pedido);
        });
    },
    adicionaProduto: (idPedido, produtos, callback) => {
        crud.pesquisarPorId(idPedido, (pedido) => {
            produtos.forEach((produto) => {
                pedido.produtos.push(produto);
                pedido.save();
            });

            pedido.save((err, pedidoAlterado) => callback(pedidoAlterado));
        });
    }
}

module.exports = crud;