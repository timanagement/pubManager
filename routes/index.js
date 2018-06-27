const express = require('express');
let router = express.Router();

const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const KEY = 'chaaaaaaaaaaaave';
const SECRET = 'seeeeeeeeeeeegredoo';
const cookie = cookieParser(SECRET);
let store = new sessions.MemoryStore();

let sessionMiddleware = sessions({
	secret: SECRET,
	name: KEY,
	resave: true,
	saveUninitialized: true,
	store: store
});

router.use(cookie);
router.use(sessionMiddleware);

const cUsuarios = require('./../mongo/controller/usuarios');
const cProdutos = require('./../mongo/controller/produtos');
const cComandas = require('./../mongo/controller/comandas');

router.get('/', (req, res) => {
	var session = req.session;
	if (!session.exist) {
		res.redirect('/login');
	} else {
		var session = req.session;
		cUsuarios.pesquisarPorId(session._id, (usuario) => {
			let obj = {
				usuario,
			};
			
			if (usuario.tipo == 1) {
				cProdutos.pesquisar({}, (produtos) => {
					cComandas.pesquisar({ id_usuario: session._id }, (comandas) => {
						obj.produtos = produtos;
						obj.comandas = comandas;
						
						res.render('cliente/home', obj);
					});
				});
			} else if (usuario.tipo == 2) {
				cProdutos.pesquisar({}, (produtos) => {
					obj.produtos = produtos;
					cUsuarios.pesquisar({ tipo: 1 }, (clientes) => {
						obj.clientes = clientes;

						res.render('porteiro/home', obj);
					});
				});
			} else if (usuario.tipo == 4) {
				cProdutos.pesquisar({}, (produtos) => {
					obj.produtos = produtos;

					res.render('adm/home', obj);
				});
			}
		});
	}
});

router.get('/login', function (req, res) {
	res.render('index');
});

router.get('/cadastro', (req, res) => {
	res.render('cadastro');
});

router.post('/logar', function (req, res) {
	var campos = req.body;
	cUsuarios.logar({ nome: campos.nome, senha: campos.senha }, function (valido, usuario) {
		if (valido) {
			session = req.session;
			session.exist = true;
			session._id = usuario._id;
			res.redirect('/logando');
		} else {
			res.redirect('/');
		}
	});
});

router.get('/logando', function (req, res) {
	var session = req.session;
	if (session.exist) {
		res.redirect('/');
	} else {
		res.redirect('/login');
	}
});

router.get('/sair', function (req, res) {
	req.session.destroy(function () {
		res.redirect('/login');
	});
});

router.post('/addProduto', (req, res) => {
	var body = req.body;
	cProdutos.criar({
		nome: body.nomeProduto
	}, () => {
		res.redirect('/');
	});
});

router.post('/alteraProduto', (req, res) => {
	var body = req.body;
	cProdutos.alterar(body.idProduto, {
		nome: body.nomeProduto
	}, () => {
		res.redirect('/');
	});
});

router.post('/pedir', (req, res) => {
	var body = req.body;
	
	if (Array.isArray(body.chkProdutos)) {
		cComandas.adicionaProdutoComanda(body.txtComanda, body.chkProdutos, () => {
			res.redirect('/');
		});
	} else if (typeof body.chkProdutos == 'string') {
		cComandas.adicionaProdutoComanda(body.txtComanda, [body.chkProdutos], () => {
			res.redirect('/');
		});
	}

});

router.get('/adm/produtos', (req, res) => {
    res.render('adm/crudProdutos');
});

router.get('/atend/scan', (req, res) => {
	res.render('atendente/scanCliente');
});

module.exports = {
	router,
	sessionMiddleware
};