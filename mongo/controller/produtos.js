const express = require('express');
const model = require('./../models/produtos')();

const crud = {
    pesquisar: (query, callback) => {
        model.find(query, {})
            .exec((err, usuarios) => {
                if (err) throw err;
                callback(usuarios);
            });
    },
    criar: (fields, callback) => {
        model.create(fields, (err, usuario) => {
            if (err) throw err;
            callback();
        });
    },
    alterar: (produtoId, fields, callback) => {
        crud.pesquisarPorId(produtoId, (produto) => {
            Object.keys(fields).forEach((key) => {
                produto[key] = fields[key];
            });

            produto.save((err, produtoAlterado) => callback(produto));
        });
    },
    pesquisarPorId: (query, callback) => {
        model.findById(query, (err, usuario) => {
            if (err) throw err;
            callback(usuario);
        });
    },
    pesquisarPorNome: (query, callback) => {
        model.findOne({ nome: query }, (err, usuario) => {
            if (err) throw err;
            callback(usuario);
        });
    }
}

module.exports = crud;