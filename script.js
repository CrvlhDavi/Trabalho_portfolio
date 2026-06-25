// Referências aos elementos do HTML
// Essas variáveis pegam os principais elementos da página para poder usar depois
const formularioContato = document.querySelector('#formulario-contato');
const avisoFormulario = document.querySelector('#aviso-formulario');
const botaoTema = document.querySelector('.botao-tema');
const linkMenu = document.querySelectorAll('.menu a');
const secoes = document.querySelectorAll('main section');

// Função auxiliar: valida formato de e-mail
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Função auxiliar: exibe mensagem de aviso no formulário (sucesso ou erro)
function exibirAviso(texto, tipo) {
    avisoFormulario.textContent = texto;
    avisoFormulario.className = 'aviso-formulario ' + tipo;
}

// Validação e envio simulado do formulário
// Quando o formulário for enviado, o JavaScript impede a atualização da página e faz a validação
formularioContato.addEventListener('submit', function (evento) {
    evento.preventDefault(); // impede o recarregamento da página

    const nome = document.querySelector('#nome').value.trim();
    const email = document.querySelector('#email').value.trim();
    const mensagem = document.querySelector('#mensagem').value.trim();

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !mensagem) {
        exibirAviso('Por favor, preencha todos os campos antes de enviar.', 'erro');
        return;
    }

    // Verifica se o e-mail tem formato válido
    if (!validarEmail(email)) {
        exibirAviso('Informe um e-mail válido no formato usuario@dominio.com.', 'erro');
        return;
    }

    // Limpa o formulário e exibe mensagem de sucesso
    formularioContato.reset();
    exibirAviso('Mensagem enviada com sucesso!', 'sucesso');
});

// Alternância entre tema claro e escuro
// Quando o botão de tema for clicado, a classe escuro é adicionada ou removida do body
botaoTema.addEventListener('click', function () {
    document.body.classList.toggle('escuro');

    const estaEscuro = document.body.classList.contains('escuro');
    botaoTema.textContent = estaEscuro ? 'Tema claro' : 'Tema escuro';
});

// Navegação entre seções: mostra apenas a seção correspondente ao link clicado

// Essa função esconde todas as seções antes de mostrar a escolhida
function esconderTodasSecoes() {
    secoes.forEach(function (secao) {
        secao.classList.remove('ativo');
    });
}

// Essa função tira o destaque do menu quando outra seção for escolhida
function limparMenuAtivo() {
    linkMenu.forEach(function (link) {
        link.classList.remove('link-ativo');
    });
}

// Essa função mostra a seção certa e marca o link do menu correspondente
function mostrarSecao(idSecao) {
    const secaoAlvo = document.querySelector(idSecao);
    if (!secaoAlvo) return;

    esconderTodasSecoes();
    secaoAlvo.classList.add('ativo');

    // Destaca o link do menu correspondente à seção ativa
    limparMenuAtivo();
    const linkAtivo = document.querySelector('.menu a[href="' + idSecao + '"]');
    if (linkAtivo) linkAtivo.classList.add('link-ativo');
}

// Ao clicar em um link do menu, a página mostra a seção desejada sem recarregar tudo
linkMenu.forEach(function (link) {
    link.addEventListener('click', function (evento) {
        evento.preventDefault();
        const destino = this.getAttribute('href');
        mostrarSecao(destino);
        // Atualiza o endereço da página para refletir a seção aberta
        history.replaceState(null, '', destino);
    });
});

// Ao carregar a página: mostra a seção correta com base na URL (ou "Sobre Mim" por padrão)
// Quando a página termina de carregar, ela verifica se existe uma seção escolhida na URL
window.addEventListener('DOMContentLoaded', function () {
    const hashAtual = window.location.hash;

    if (hashAtual && document.querySelector(hashAtual)) {
        mostrarSecao(hashAtual);
    } else {
        // Sem hash na URL, exibe "Sobre Mim" como padrão
        mostrarSecao('#sobre');
    }
});
