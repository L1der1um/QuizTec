//VARIAVEIS QUERY SELECTOR & ELEMENT BY ID
const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $playBtn = document.getElementById("playBtn")
const $audio = document.getElementById("myAudio")
const $quizInfo = document.querySelector(".quiz-info")
const $tutorialButton = document.querySelector(".tutorial-button");
const $tutorialBtn = document.getElementById("tutorialBtn");

//ABRIR TUTORIAL AO CLICAR NO BOTÃO
$tutorialBtn.addEventListener("click", function() {
  window.open("tutorial.html", "_self");
});

//INICIALIZAÇÃO DAS VARIÁVEIS
let currentQuestionIndex = 0
let totalCorrect = 0

//ADIÇÃO DO EVENT LISTENER AOS BOTÕES
$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)
$playBtn.addEventListener("click", togglePlay)

//FUNÇÃO PARA INICIAR O JOGO
function startGame() {
  //AO INICIAR O JOGO, ESCODER O BOTÃO INICIAR JOGO
  $startGameButton.classList.add("hide")
  //AO INICIAR O JOGO REMOVER "HIDE" DO BOTÃO DE TOCAR MÚSICA
  $playBtn.classList.remove("hide");
  //AO INICIAR O JOGO, ESCONDER O BOTÃO DE TUTORIAL
  $tutorialButton.classList.add("hide");
  //AO INICIAR O JOGO, REMOVER "HIDE" DOS BOTÕES DE RESPOSTAS DO QUIZ
  $questionsContainer.classList.remove("hide")
  //AO INICIAR O JOGO, ESCONDER A INFORMAÇÃO SOBRE O GRUPO
  $quizInfo.classList.add("hide")
  //RANDOMIZA AS PERUNTAS ANTES DE COMEÇAR
  shuffleQuestions();
  //MOSTRAR A PRÓXIMA PERGUNTA
  displayNextQuestion()
}

//FUNÇÃO PARA EXIBIR A PRÓXIMA PERGUNTA
function displayNextQuestion() {
  resetState();

  //CONDIÇÃO DE TERMINO DE JOGO
  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  //VARIAVEIS DE QUESTÕES
  const currentQuestionNumber = currentQuestionIndex + 1;
  const totalQuestions = questions.length;

  //DISPLAY DE NÚMERO DE QUESTÃO
  $questionText.textContent = `Questão ${currentQuestionNumber}/${totalQuestions}: ${questions[currentQuestionIndex].question}`;

  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

//FUNÇÃO QUE REDEFINE O ESTADO
function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

//FUNÇÃO PARA SELECIONAR A RESPOSTA
function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

//FUNÇÃO PARA FINALIZAR O QUIZ
function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  //DEPENDENDO DA PONTUAÇÃO, ELE MOSTRA AS MENSAGENS
  switch (true) {
    case (performance >= 30):
      message = "Excelente Gafanhoto!"
      break
    case (performance >= 20):
      message = "Muito bom!"
      break
    case (performance >= 15):
      message = "Estude mais!"
      break
    default:
      message = "Pode melhorar :/"
  }

  //INSERINDO O HTML NA DIV "questionsContainer" COM A MENSAGEM FINAL DO JOGO
  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}

//FUNÇÃO PARA RANDOMINAR AS PERGUNTAS
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

//FUNÇÃO PARA ALTERNAR ENTRE REPRODUZIR E PAUSAR A MÚSICA
function togglePlay() {
  if ($audio.paused) {
    $audio.play();
    $playBtn.textContent = "Parar Música";
  } else {
    $audio.pause();
    $playBtn.textContent = "Tocar Música";
  }
}
//ARRAY DAS PERGUNTAS
//Kauan
//Pergunta 1
const questions = [
  {
    question: "O que é um ERP?",
    answers: [
      { text: "A) Um protocolo de internet", correct: false },
      { text: "B) Um tipo de malware", correct: false },
      { text: "C) Um software de gestão empresarial integrado", correct: true },
      { text: "D) Um componente de hardware", correct: false }
    ]
  },
  //Pergunta 2
  {
    question: "Em redes de computadores, o que representa a notação /24?",
    answers: [
      { text: "A) Representa uma máscara de sub-rede 255.255.255.192.", correct: false },
      { text: "B) Representa uma máscara de sub-rede 255.255.255.0.", correct: true },
      { text: "C) Representa uma máscara de sub-rede 255.255.252.252.", correct: false },
      { text: "D) Representa uma máscara de sub-rede 255.255.248.0.", correct: false }
    ]
  },
  //Pergunta 3
  {
    question: "O que significa a sigla SQL?",
    answers: [
      { text: "A) Standard Query Language", correct: false },
      { text: "B) Structured Query Language", correct: true },
      { text: "C) Simple Query Language", correct: false },
      { text: "D) Secure Query Language", correct: false }
    ]
  },
  //Pergunta 4
  {
    question: "Qual destas linguagens é mais usada para desenvolver páginas web interativas?",
    answers: [
      { text: "A) C++", correct: false },
      { text: "B) Java", correct: false },
      { text: "C) Python", correct: false },
      { text: "D) JavaScript", correct: true }
    ]
  },
  //Pergunta 5
  {
    question: "O que é um ataque de negação de serviço (DoS)?",
    answers: [
      { text: "A) Infecção por vírus que rouba dados", correct: false },
      { text: "B) Acesso não autorizado a dados sensíveis", correct: false },
      { text: "C) Interrupção do serviço por sobrecarga de rede", correct: true },
      { text: "D) Cópia ilegal de software", correct: false }
    ]
  },
  //Pergunta 6
  {
    question: "O que linguagem de baixo nível?",
    answers: [
      { text: "A) Uma linguagem de programação de fácil compreensão para iniciantes.", correct: false },
      { text: "B) Uma linguagem de programação que é utilizado em aparelhos que ficam no subsolo.", correct: false },
      { text: "C) Uma linguagem de programação que permite a criação de interfaces gráficas.", correct: false },
      { text: "D) Uma linguagem de programação próxima da linguagem de máquina, com pouca abstração.", correct: true }
    ]
  },
  //Pergunta 7
  {
    question:	"Qual dispositivo é essencial para criar uma rede LAN?",
    answers: [
      { text: "A) Modem", correct: false },
      { text: "B) Switch", correct: true },
      { text: "C) Firewall", correct: false },
      { text: "D) Monitor", correct: false },
    ]
  },
  //Pergunta 8
  {
    question:	"O que é o GitHub?",
    answers: [
      { text: "A) Um sistema operacional", correct: false },
      { text: "B) Uma plataforma de hospedagem de código-fonte", correct: true },
      { text: "C) Um tipo de vírus de computador", correct: false },
      { text: "D) Um jogo de computador", correct: false },
    ]
  },
  //Pergunta 9
  {
    question:	"Qual é o principal uso de cookies em sites web?",
    answers: [
      { text: "A) Melhorar a segurança do site", correct: false },
      { text: "B) Armazenar dados do usuário para personalizar a experiência", correct: true },
      { text: "C) Aumentar a velocidade de carregamento do site", correct: false },
      { text: "D) Monitorar a performance do servidor", correct: false },
    ]
  },
  //Pergunta 10
  {
    question:	"O que é Big Data?",
    answers: [
      { text: "A) Um grande centro de dados", correct: false },
      { text: "B) Uma nova tecnologia de disco rígido", correct: false },
      { text: "C) Análise de grandes volumes de dados para descobrir padrões", correct: true },
      { text: "D) Um tipo de cabo de dados", correct: false },
    ]
  },
//Giulia
//Pergunta 11
  {
    question:	"O que é computação em nuvem?",
    answers: [
      { text: "A) Meteorologistas para prever o tempo.", correct: false },
      { text: "B) Computação em nuvem é uma técnica para criar imagens de nuvens.", correct: false },
      { text: "C) É um modelo de fornecimento de serviços de TI pela internet", correct: true },
      { text: "D) Google fotos", correct: false },
    ]
  },
  //Pergunta 12
  {
    question:	"Quais são os principais protocolos de rede utilizados na TI?",
    answers: [
      { text: "A) SSL, TLS, IPSec, VPN, SSH", correct: false },
      { text: "B) TCP/IP, HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS e SNMP", correct: true },
      { text: "C) VPN, RDP, SSH, IPsec", correct: false },
      { text: "D) XML, JSON, YAML, HTML", correct: false }
    ]
  },
  //Pergunta 13
  {
    question:	"Qual é a tecla usada para refazer uma ação?",
    answers: [
      { text: "A) CTRL + Z", correct: false },
      { text: "B) ALT + F4", correct: false },
      { text: "C) CTRL + Y", correct: true },
      { text: "D) CTRL + X", correct: false },
    ]
  },
  //Pergunta 14
  {
    question:	"O que significa VLAN?",
    answers: [
      { text: "A) Very Large Area Network", correct: false },
      { text: "B) Visual Local Area Network", correct: false },
      { text: "C) Virtual Longitudinal Array Node", correct: false },
      { text: "D) Virtual Local Area Network", correct: true },
    ]
  },
  //Pergunta 15
  {
    question:	"Quais são os protocolos de E-mail?",
    answers: [
      { text: "A) SMTP, POP, IMAP, SMTPS, POP3S", correct: true },
      { text: "B) IPsec, TLS, SSH, SNMP", correct: false },
      { text: "C) SPF, DKIM, DMARC, S/MIME", correct: false },
      { text: "D) VLAN, NAT, VPN, IDS", correct: false }
    ]
  },
  //Pergunta 16
  {
    question:	"O endereço de IP 192, pertence a qual classe de IP?",
    answers: [
      { text: "A) Classe A", correct: false },
      { text: "B) Classe C", correct: true },
      { text: "C) Classe B", correct: false },
      { text: "D) Classe E", correct: false },
    ]
  },
  //Pergunta 17
  {
    question:	"Qual comando é utilizado para desfazer uma alteração feita?",
    answers: [
      { text: "A) CTRL + X", correct: false },
      { text: "B) CTRL + Y", correct: false },
      { text: "C) ALT + F4", correct: false },
      { text: "D) CTRL + Z", correct: true },
    ]
  },
  //Pergunta 18
  {
    question:	"Cite um software usado para desenvolvimento front-end e back-end de páginas web:",
    answers: [
      { text: "A) Photoshop", correct: false },
      { text: "B) Microsofot Word", correct: false },
      { text: "C) Adobe Flash ", correct: false },
      { text: "D) Visual Studio Code", correct: true },
    ]
  },
  //Pergunta 19
  {
    question: "Qual é a porta que o SSH utiliza?",
    answers: [
      { text: "A) 20", correct: false },
      { text: "B) 22", correct: true },
      { text: "C) 80", correct: false },
      { text: "D) 443", correct: false }
    ]
  },
  //Pergunta 20
  {
    question:	"O que faz um switch?",
    answers: [
      { text: "A) Um disposito que facilita a comunicação de dados dentro de uma rede.", correct: true },
      { text: "B) Um dispositivo usado para rotear pacotes de dados em uma rede.", correct: false },
      { text: "C) Um equipamento que cria segmentos de rede separados.", correct: false },
      { text: "D) Um dispositivo que configura os modens da rede.", correct: false }
    ]
  },
  //Brian
  //Pergunta 21
  {
    question:	"As siglas 'QWERTY' ou 'AZERTY' e 'DVORAK' são referente a que?",
    answers: [
      { text: "A) Marcas de Memória RAM.", correct: false },
      { text: "B) Senhas Padrão do Linux.", correct: false },
      { text: "C) Modelos Padrão de Teclado.", correct: true },
      { text: "D) Protocolo de Roteamento.", correct: false },
    ]
  },
  //Pergunta 22
  {
    question:	"O que é uma linguagem de programação de alto nível?",
    answers: [
      { text: "A) Uma linguagem que é executada diretamente pelo hardware.", correct: false },
      { text: "B)  Uma linguagem que é fácil de entender para humanos.", correct: true },
      { text: "C) Uma linguagem usada apenas para programação web.", correct: false },
      { text: "D) Uma linguagem usada exclusivamente para cálculos matemáticos.", correct: false },
    ]
  },
  //Pergunta 23
  {
    question:	"Qual é a função de um firewall em segurança de rede?",
    answers: [
      { text: "A) Armazenar senhas.", correct: false },
      { text: "B) Bloquear tráfego não autorizado.", correct: true },
      { text: "C) Criptografar dados.", correct: false },
      { text: "D) Gerenciar dispositivos de rede.", correct: false },
    ]
  },
  //Pergunta 24
  {
    question:	"O que é um banco de dados relacional?",
    answers: [
      { text: "A) Um software para criptografar dados.", correct: false },
      { text: "B) Um sistema operacional.", correct: false },
      { text: "C) Um conjunto de tabelas interconectadas que armazenam dados.", correct: true },
      { text: "D) Um dispositivo de armazenamento.", correct: false },
    ]
  },
  //Pergunta 25
  {
    question: "Para que serve um protocolo de rede?",
    answers: [
      { text: "A) Para proteger uma rede contra ataques cibernéticos.", correct: false },
      { text: "B) Para controlar o tráfego de rede e garantir sua integridade e segurança.", correct: true },
      { text: "C) Para padronizar a interface de hardware dos dispositivos de rede.", correct: false },
      { text: "D) Para armazenar dados em servidores de rede.", correct: false }
    ]
  },
  //Pergunta 26
  {
    question:	"Qual é a unidade básica de armazenamento em um disco rígido?",
    answers: [
      { text: "A) Byte.", correct: true },
      { text: "B) Bit.", correct: false },
      { text: "C) Kilobyte.", correct: false },
      { text: "D) Megabyte.", correct: false },
    ]
  },
  //Pergunta 27
  {
    question:	"Qual é a função de um compilador em programação?",
    answers: [
      { text: "A) Executar programas.", correct: false },
      { text: "B) Depurar erros.", correct: false },
      { text: "C) Traduzir código-fonte para código de máquina.", correct: true },
      { text: "D) Gerenciar arquivos.", correct: false },
    ]
  },
  //Pergunta 28
  {
    question:	"O que significa a sigla “RAM” em computação?",
    answers: [
      { text: "A) Random Access Memory.", correct: true },
      { text: "B) Read-Only Memory.", correct: false },
      { text: "C) Real-time Application Management.", correct: false },
      { text: "D) Remote Access Module.", correct: false },
    ]
  },
  //Pergunta 29
  {
    question:	"Qual é a função de um sistema operacional?",
    answers: [
      { text: "A) Executar programas de escrita.", correct: false },
      { text: "B) Gerenciar recursos do computador.", correct: true },
      { text: "C) Criar documentos.", correct: false },
      { text: "D) Controlar dispositivos de entrada.", correct: false },
    ]
  },
  //Pergunta 30
  {
    question: "O que é um servidor DNS?",
    answers: [
      { text: "A) Um servidor que armazena senhas de usuários em uma rede.", correct: false },
      { text: "B) Um servidor responsável por gerenciar endereços IP e nomes de domínio na internet.", correct: true },
      { text: "C) Um servidor usado para fazer backup de dados de um banco de dados.", correct: false },
      { text: "D) Um servidor que autentica dispositivos de rede em uma LAN.", correct: false }
    ]
  },

]

//Função pra mudar a imagem de background usando a API da Unsplash (Limite de 50 imagens por hora)
function changeBackground() {
  //API UTILIZA IMAGENS RANDOMICAMENTE REFERENTE A COMPUTADORES
  fetch('https://api.unsplash.com/photos/random?query=computers&client_id=kKc_pjLL4ZF84tZncaCihYKVYLuhY1No7moLt5R7xKI')
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.urls.regular;
      document.body.style.backgroundImage = `url('${imageUrl}')`;
    })
    .catch(error => console.error('Error fetching background image:', error));
}

//CHAMAR FUNÇÃO PARA MUDAR BACKGROUND INICIALMENTE
changeBackground();

//MUDANDO AUTOMATICAMENTE O BACKGROUND A CADA 2.5 MINUTOS
setInterval(changeBackground, 150000); //150000 ms = 2.5 minutos
