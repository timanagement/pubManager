const model = require('./../models/comandas')();

const crud = {
    pesquisar: (query, callback) => {
        model.find(query, {})
            .exec((err, comandas) => {
                if (err) throw err;
                callback(comandas);
            });
    },
    criar: (fields, callback) => {
        model.create(fields, (err, comanda) => {
            if (err) throw err;
            callback(comanda);
        });
    },
    alterar: (comandaId, fields, callback) => {
        crud.pesquisarPorId(comandaId, (comanda) => {
            Object.keys(fields).forEach((key) => {
                comanda[key] = fields[key];
            });

            comanda.save((err, comandaAlterado) => callback(comandaAlterado));
        });
    },
    pesquisarPorId: (query, callback) => {
        model.findById(query, (err, comanda) => {
            if (err) throw err;
            callback(comanda);
        });
    },
    pesquisarPorNome: (query, callback) => {
        model.findOne({ nome: query }, (err, comanda) => {
            if (err) throw err;
            callback(comanda);
        });
    },
    adicionaProdutoComanda: (idComanda, produtos, callback) => {
        crud.pesquisarPorId(idComanda, (comanda) => {
            produtos.forEach((produto) => {
                comanda.produtos.push(produto);
                comanda.save();    
            });
            
            
            comanda.save((err, comandaAlterado) => callback(comandaAlterado));
        });
    }
}

module.exports = crud;