let io;

module.exports = function (_io) {
    io = _io;

    io.sockets.on('connection', function (socket) {
        const cUsuarios = require('./mongo/controller/usuarios');

        //index
        socket.on('cadastroUsuario', function (obj) {
            cUsuarios.pesquisarPorNome(obj.nome, (usuario) => {
                let validaCaractereEspecial = (/^[a-zA-Z0-9_.-]*$/.test(obj.nome));

                if (!validaCaractereEspecial) {
                    socket.emit('erroCadastrarUsuario', 'Os nomes de usuário só podem usar letras, números, sublinhados e pontos.');
                } else if (usuario == undefined) {
                    cUsuarios.criar({
                        nome: obj.nome,
                        senha: obj.senha,
                        tipo: 1 /* 1 - Cliente */
                    }, function () {
                        socket.emit('retornoCadastroUsuario');
                    });
                } else {
                    socket.emit('erroCadastrarUsuario', 'Este usuário já existe.');
                }
            });
        });
    });
};