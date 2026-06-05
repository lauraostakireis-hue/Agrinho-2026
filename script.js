document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ACESSIBILIDADE (Contraste e Fonte)
    // ==========================================
    const body = document.body;
    let tamanhoFontePorcentagem = 100;

    document.getElementById('btn-contraste').addEventListener('click', () => {
        body.classList.toggle('alto-contraste');
    });

    document.getElementById('btn-aumentar').addEventListener('click', () => {
        if (tamanhoFontePorcentagem < 130) {
            tamanhoFontePorcentagem += 10;
            body.style.fontSize = `${tamanhoFontePorcentagem}%`;
        }
    });

    document.getElementById('btn-reduzir').addEventListener('click', () => {
        if (tamanhoFontePorcentagem > 90) {
            tamanhoFontePorcentagem -= 10;
            body.style.fontSize = `${tamanhoFontePorcentagem}%`;
        }
    });

    // ==========================================
    // 2. MENU MOBILE RESPONSIVO
    // ==========================================
    const btnMenuMobile = document.getElementById('btn-menu-mobile');
    const menuPrincipal = document.getElementById('menu-principal');

    btnMenuMobile.addEventListener('click', () => {
        const estaAberto = menuPrincipal.classList.toggle('aberto');
        btnMenuMobile.setAttribute('aria-expanded', estaAberto);
    });

    // Fechar menu ao pressionar a tecla Escape
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape' && menuPrincipal.classList.contains('aberto')) {
            menuPrincipal.classList.remove('aberto');
            btnMenuMobile.setAttribute('aria-expanded', 'false');
            btnMenuMobile.focus();
        }
    });

    // ==========================================
    // 3. CARROSSEL DE IMAGENS AUTOMÁTICO/MANUAL
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    let slideAtual = 0;
    let intervaloCarrossel = setInterval(proximoSlide, 5000);

    function mostrarSlide(indice) {
        slides[slideAtual].classList.remove('ativo');
        slideAtual = (indice + slides.length) % slides.length;
        slides[slideAtual].classList.add('ativo');
    }

    function proximoSlide() { mostrarSlide(slideAtual + 1); }
    function slideAnterior() { mostrarSlide(slideAtual - 1); }

    document.querySelector('.proximo').addEventListener('click', () => {
        proximoSlide();
        reiniciarTemporizador();
    });

    document.querySelector('.anterior').addEventListener('click', () => {
        slideAnterior();
        reiniciarTemporizador();
    });

    function reiniciarTemporizador() {
        clearInterval(intervaloCarrossel);
        intervaloCarrossel = setInterval(proximoSlide, 5000);
    }

    // ==========================================
    // 4. CARTÕES EXPANSÍVEIS (Sustentabilidade)
    // ==========================================
    const cartoes = document.querySelectorAll('.cartao-expansivel');

    cartoes.forEach(cartao => {
        const botao = cartao.querySelector('.topo-cartao');
        const conteudo = cartao.querySelector('.conteudo-cartao');
        const icone = cartao.querySelector('.icone-status');

        botao.addEventListener('click', () => {
            const visivel = conteudo.classList.toggle('aberto');
            botao.setAttribute('aria-expanded', visivel);
            conteudo.setAttribute('aria-hidden', !visivel);
            icone.textContent = visivel ? '−' : '+';
        });
    });

    // ==========================================
    // 5. QUIZ INTERATIVO
    // ==========================================
    const dadosQuiz = [
        {
            pergunta: "Qual é o grão principal utilizado para produzir malte em Guarapuava?",
            opcoes: ["Trigo", "Arroz", "Cevada", "Milho"],
            correta: 2
        },
        {
            pergunta: "Qual dessas práticas foca no equilíbrio ambiental do agro?",
            opcoes: ["Queimada controlada", "Manejo responsável do solo", "Desmatamento", "Uso excessivo de água"],
            correta: 1
        }
    ];

    let perguntaAtualIndice = 0;
    let pontuacao = 0;

    const elPergunta = document.getElementById('quiz-pergunta');
    const elOpcoes = document.getElementById('quiz-opcoes');
    const btnProxima = document.getElementById('btn-proxima-pergunta');
    const elResultado = document.getElementById('quiz-resultado');

    function carregarPergunta() {
        btnProxima.classList.add('escondido');
        elOpcoes.innerHTML = '';
        
        let q = dadosQuiz[perguntaAtualIndice];
        elPergunta.textContent = q.pergunta;

        q.opcoes.forEach((opcao, indice) => {
            const botaoOpcao = document.createElement('button');
            botaoOpcao.textContent = opcao;
            botaoOpcao.classList.add('opcao-btn');
            botaoOpcao.addEventListener('click', () => selecionarResposta(indice, botaoOpcao));
            elOpcoes.appendChild(botaoOpcao);
        });
    }

    function selecionarResposta(indiceSelecionado, botaoClicado) {
        const corretaIndice = dadosQuiz[perguntaAtualIndice].correta;
        const botoes = elOpcoes.querySelectorAll('.opcao-btn');

        botoes.forEach(btn => btn.disabled = true); // Desabilita todos após escolher

        if (indiceSelecionado === corretaIndice) {
            botaoClicado.classList.add('correta');
            pontuacao++;
        } else {
            botaoClicado.classList.add('errada');
            botoes[corretaIndice].classList.add('correta'); // Mostra a certa
        }

        btnProxima.classList.remove('escondido');
    }

    btnProxima.addEventListener('click', () => {
        perguntaAtualIndice++;
        if (perguntaAtualIndice < dadosQuiz.length) {
            carregarPergunta();
        } else {
            document.getElementById('pergunta-bloco').classList.add('escondido');
            btnProxima.classList.add('escondido');
            elResultado.classList.remove('escondido');
            elResultado.innerHTML = `<h3>Quiz Finalizado!</h3><p>Sua pontuação foi de <strong>${pontuacao} de ${dadosQuiz.length}</strong> pontos.</p>`;
        }
    });

    // Inicializa o Quiz
    carregarPergunta();
});
