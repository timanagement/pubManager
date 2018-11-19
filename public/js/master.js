var socket;
socket = io.connect();

$(document).ready(function () {
    //campo usuario cadastro
    $('#formCadastroUsuario #txtNome').on('input', function (e) {
        validaBarraUsuario();
    });
    $('#formCadastroUsuario').submit(function (e) {
        var nome = $('#formCadastroUsuario [name="nome"]').val().trim();
        var senha = $('#formCadastroUsuario [name="senha"]').val().trim();

        if (validaBarraUsuario() && nome !== '' && senha !== '') {
            socket.emit('cadastroUsuario', { nome, senha });
        }
        e.preventDefault();
    });
});

socket.on('retornoCadastroUsuario', function () {
    location.href = '/';
});

socket.on('erroCadastrarUsuario', function (data) {
    // Mostra o problema de não ter cadastrado
    $('#msgValUsuario').html(data);
});

function validaBarraUsuario() {
    $('#msgValUsuario').html('');
    var valido = /^[a-zA-Z0-9_.-]*$/.test($('#formCadastroUsuario #txtNome').val());
    if (!valido) {
        $('#msgValUsuario').html('Os nomes de usuário só podem usar letras, números, sublinhados e pontos.');
    }
    return valido;
}

function liberarComandaCliente(idCliente) {
    socket.emit('liberarComandaCliente', idCliente);
}

socket.on('retornoLiberarComandaCliente', function () {
    location.href = '/';
});

function clickChkProduto(evt, idProduto) {
    // Dá click no checkbox para marcar ou desmarcá-lo
    $('#chk_' + idProduto).click();

    var soma = 0;
    $('[id^=chk_]:checked').each(function(i, elem) {
        soma += parseFloat($(elem).data('preco'));
    })
    
    if ($('#chk_' + idProduto)[0].checked) {
        $('#panel_prod_' + idProduto).addClass('selecionado');
    } else {
        $('#panel_prod_' + idProduto).removeClass('selecionado');
    }

    $('#txtTotalPreco').text(soma);
}
