let listaDeSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

}

function exibirMensagem(){
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um numero entre 1 e 10: ');
}

exibirMensagem();

// exibirTexto('h1', 'Jogo do número secreto');
// exibirTexto('p', 'Escolha um numero entre 1 e 10: ');

function verificarChute() {
    let chute = document.querySelector('input').value;
    // console.log('O botão foi clicado!');
    // console.log(numeroSecreto);
    // console.log(chute==numeroSecreto);

    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        exibirTexto('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('p', 'O numero secreto é menor');
        } else {
            exibirTexto('p', 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    let quantidadeDeElementosNaLista = listaDeSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeSorteados = [];
    }

    if (listaDeSorteados.includes(numeroEscolhido)){
        return gerarNumero();
    } else {
        listaDeSorteados.push(numeroEscolhido);
        console.log(listaDeSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagem();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}