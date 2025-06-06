const mobileMenu = document.querySelector(".mobile-menu");
mobileMenu.addEventListener("click", mobileNavbar);

function mobileNavbar() {
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(
    ".nav-list li:not(.theme-option-mobile)"
  );
  const activeClass = "active";

  navList.classList.toggle(activeClass);
  mobileMenu.classList.toggle(activeClass);

  navLinks.forEach((link, index) => {
    link.style.animation
      ? (link.style.animation = "")
      : (link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`);
  });

  const themeOptionMobile = document.querySelector(
    ".nav-list .theme-option-mobile"
  );
  if (themeOptionMobile) {
    if (navList.classList.contains(activeClass)) {
      themeOptionMobile.style.animation = `navLinkFade 0.5s ease forwards ${
        navLinks.length / 7 + 0.3
      }s`;
    } else {
      themeOptionMobile.style.animation = "";
    }
  }
}

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
  nextImage();
}, 3000);

function nextImage() {
  count++;
  if (count > 3) {
    count = 1;
  }
  document.getElementById("radio" + count).checked = true;
}

const themeIconsMobile = document.querySelectorAll(
  "#theme-icons-mobile .theme-icon"
);
const themeIconsDesktop = document.querySelectorAll(
  "#theme-icons-desktop .theme-icon"
);
const body = document.body;

const themeNames = {
  light: "Claro",
  dark: "Escuro",
  accessibility: "Acessibilidade",
};

function applyTheme(theme) {
  body.classList.remove("dark-theme", "accessibility-theme");

  if (theme === "dark") {
    body.classList.add("dark-theme");
  } else if (theme === "accessibility") {
    body.classList.add("accessibility-theme");
  }

  function updateActiveIcons(icons) {
    icons.forEach((icon) => {
      if (icon.dataset.theme === theme) {
        icon.classList.add("active");
      } else {
        icon.classList.remove("active");
      }
    });
  }
  updateActiveIcons(themeIconsMobile);
  updateActiveIcons(themeIconsDesktop);

  localStorage.setItem("theme", theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  let initialTheme = "light";

  if (savedTheme && ["light", "dark", "accessibility"].includes(savedTheme)) {
    initialTheme = savedTheme;
  } else {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      initialTheme = "dark";
    }
  }

  applyTheme(initialTheme);
}

function addThemeIconListeners(icons) {
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const selectedTheme = icon.dataset.theme;
      applyTheme(selectedTheme);
    });
  });
}

addThemeIconListeners(themeIconsMobile);
addThemeIconListeners(themeIconsDesktop);

document.addEventListener("DOMContentLoaded", loadTheme);

let form = document.getElementById("form");
let nome = document.getElementById("nome");
let numero = document.getElementById("numero");
let sugestao = document.getElementById("sugestao");

let erroNome = document.getElementById("erroNome");
let erroNumero = document.getElementById("erroNumero");
let erroSugestao = document.getElementById("erroSugestao");
let mensagemFinal = document.getElementById("mensagemFinal");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  erroNome.textContent = "";
  erroNumero.textContent = "";
  erroSugestao.textContent = "";
  mensagemFinal.textContent = "";

  let nomeValue = nome.value.trim();
  let numeroValue = numero.value.trim();
  let sugestaoValue = sugestao.value.trim();

  let valido = true;

  if (nomeValue === "") {
    erroNome.textContent = "Por favor, preencha o nome.";
    valido = false;
  } else {
    let nomeValido = true;
    for (let i = 0; i < nomeValue.length; i++) {
      let charCode = nomeValue.charCodeAt(i);
      let char = nomeValue[i];
      let isLetra =
        (charCode >= 65 && charCode <= 90) ||
        (charCode >= 97 && charCode <= 122);
      let isEspaco = char === " ";
      if (!isLetra && !isEspaco) {
        nomeValido = false;
        break;
      }
    }
    if (!nomeValido) {
      erroNome.textContent = "Nome inválido. Use apenas letras e espaços.";
      valido = false;
    }
  }

  if (numeroValue === "") {
    erroNumero.textContent = "Por favor, preencha o número.";
    valido = false;
  } else if (
    numeroValue.length < 10 ||
    numeroValue.length > 11 ||
    !numeroValue.split("").every((digito) => digito >= "0" && digito <= "9")
    /*
    Para cada digito (caractere da string), 
    ele verifica se está entre '0' e '9'.
     */
  ) {
    erroNumero.textContent =
      "Número inválido. Use apenas números e inclua o DDD.";
    valido = false;
  } else {
    erroNumero.textContent = "";
    valido = true;
  }

  if (sugestaoValue === "") {
    erroSugestao.textContent = "Por favor, preencha a sugestão.";
    valido = false;
  }

  if (valido) {
    mensagemFinal.style.color = "green";
    mensagemFinal.textContent = "✅ Formulário enviado com sucesso!";
    form.reset();
  } else {
    mensagemFinal.style.color = "red";
    mensagemFinal.textContent =
      "⚠️ Corrija os erros acima para enviar o formulário.";
  }
});

const quizQuestions = [
  {
    question: "Qual o principal objetivo do sistema HYDRO ALERT?",
    options: [
      "Monitorar o trânsito",
      "Prevenir enchentes e desastres naturais",
      "Gerenciar redes sociais",
      "Controlar a temperatura ambiente",
    ],
    answer: "Prevenir enchentes e desastres naturais",
  },
  {
    question:
      "Que tipo de tecnologia é usada para prever riscos de enchentes no sistema?",
    options: [
      "Sensores e Inteligência Artificial",
      "Câmeras de segurança",
      "GPS e mapas online",
      "Bússolas e barômetros",
    ],
    answer: "Sensores e Inteligência Artificial",
  },
  {
    question: "Como os alertas automáticos são enviados aos usuários?",
    options: [
      "Por e-mail e SMS",
      "Por Telegram e WhatsApp",
      "Por rádio e televisão",
      "Por chamadas telefônicas",
    ],
    answer: "Por Telegram e WhatsApp",
  },
  {
    question:
      "Quais sensores físicos são mencionados para monitorar o ambiente?",
    options: [
      "Sensores de movimento e luz",
      "Sensores ultrassônicos (nível da água) e DHT22 (temperatura/umidade)",
      "Sensores de som e vibração",
      "Sensores de pressão e velocidade do vento",
    ],
    answer:
      "Sensores ultrassônicos (nível da água) e DHT22 (temperatura/umidade)",
  },
  {
    question: "Qual a função da Inteligência Artificial no Hydro Alert?",
    options: [
      "Gerar relatórios financeiros",
      "Prever enchentes analisando dados históricos e em tempo real",
      "Automatizar a entrega de produtos",
      "Controlar sistemas de iluminação",
    ],
    answer: "Prever enchentes analisando dados históricos e em tempo real",
  },
  {
    question:
      "Um dos objetivos da solução é o 'Monitoramento Contínuo'. O que ele envolve?",
    options: [
      "Apenas o monitoramento manual de dados",
      "Coleta automática de dados ambientais para prever enchentes",
      "Monitoramento de redes sociais",
      "Monitoramento de mercados financeiros",
    ],
    answer: "Coleta automática de dados ambientais para prever enchentes",
  },
  {
    question: "Para quem é direcionado o público-alvo principal do sistema?",
    options: [
      "Cientistas e pesquisadores",
      "Famílias em áreas de risco de enchentes com pouco conhecimento tecnológico",
      "Grandes empresas e indústrias",
      "Turistas e viajantes",
    ],
    answer:
      "Famílias em áreas de risco de enchentes com pouco conhecimento tecnológico",
  },
  {
    question:
      "Qual o benefício de 'Rotas de Fuga Seguras' oferecido pelo sistema?",
    options: [
      "Sugere caminhos para trilhas na floresta",
      "Acesso a mapas com rotas otimizadas para evacuação",
      "Orientações para viagens rodoviárias",
      "Mapas de locais turísticos",
    ],
    answer: "Acesso a mapas com rotas otimizadas para evacuação",
  },
  {
    question:
      "O que a 'Facilidade de Uso' do sistema proporciona aos usuários?",
    options: [
      "Necessidade de conhecimentos técnicos avançados",
      "Interface simples e acessível sem necessidade de conhecimentos técnicos",
      "Requer equipamentos especiais para instalação",
      "Apenas para usuários com experiência em programação",
    ],
    answer:
      "Interface simples e acessível sem necessidade de conhecimentos técnicos",
  },
  {
    question:
      "Como o sistema Hydro Alert transforma a resposta a enchentes no dia a dia?",
    options: [
      "Deixa a resposta mais improvisada e desorganizada",
      "Transforma de improvisada para coordenada e preventiva",
      "Aumenta o pânico entre as comunidades",
      "Torna a comunicação entre autoridades e comunidade menos eficiente",
    ],
    answer: "Transforma de improvisada para coordenada e preventiva",
  },
];

const quizQuestionsContainer = document.getElementById("quiz-questions");
const submitQuizButton = document.getElementById("submit-quiz");
const quizResultsDiv = document.getElementById("quiz-results");

function renderQuiz() {
  quizQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("quiz-question");
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("quiz-options");

    q.options.forEach((option, optionIndex) => {
      const radioId = `question${index}-option${optionIndex}`;
      const label = document.createElement("label");
      label.innerHTML = `
                <input type="radio" name="question${index}" value="${option}" id="${radioId}">
                ${option}
            `;
      optionsDiv.appendChild(label);
    });
    questionDiv.appendChild(optionsDiv);
    quizQuestionsContainer.appendChild(questionDiv);
  });
}

function submitQuiz() {
  let score = 0;
  const totalQuestions = quizQuestions.length;

  quizQuestions.forEach((q, index) => {
    const selectedOption = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selectedOption) {
      if (selectedOption.value === q.answer) {
        score++;
      }
    }
  });
  displayQuizResults(score, totalQuestions);
}

function displayQuizResults(score, totalQuestions) {
  quizResultsDiv.innerHTML = `<h2>Seu Resultado: ${score} de ${totalQuestions}</h2>`;
}

submitQuizButton.addEventListener("click", submitQuiz);

document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  renderQuiz();
});
