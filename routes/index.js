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

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/cadastro', (req, res) => {
	res.render('cadastro');
});

router.get('/home', (req, res) => {
	res.render('home');
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