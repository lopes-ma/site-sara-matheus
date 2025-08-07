// Configuração das imagens para os carrosséis
const carouselImages = {
    carousel1: [
        'images/fotos-bonitas/imagem1.jpeg',
        'images/fotos-bonitas/imagem2.jpeg',
        'images/fotos-bonitas/imagem3.jpeg',
        'images/fotos-bonitas/imagem4.jpeg',
        'images/fotos-bonitas/imagem5.jpeg',
        'images/fotos-bonitas/imagem6.jpeg',
        'images/fotos-bonitas/imagem7.jpeg',
        'images/fotos-bonitas/imagem8.jpeg',
        'images/fotos-bonitas/imagem9.jpeg',
        'images/fotos-bonitas/imagem10.jpeg',
        'images/fotos-bonitas/imagem11.jpeg',
        'images/fotos-bonitas/imagem12.jpeg'
    ],
    carousel2: [
        'images/fotos-zoadas/imagempv1.jpeg',
        'images/fotos-zoadas/imagempv2.jpeg',
        'images/fotos-zoadas/imagempv3.jpeg',
        'images/fotos-zoadas/imagempv4.jpeg',
        'images/fotos-zoadas/imagempv5.jpeg',
        'images/fotos-zoadas/imagempv6.jpeg',
        'images/fotos-zoadas/imagempv7.jpeg',
        'images/fotos-zoadas/imagempv8.jpeg',
        'images/fotos-zoadas/imagempv9.jpeg',
        'images/fotos-zoadas/imagempv10.jpeg'
    ],
    carousel3: [
        'images/fotos-historia/saracomendo1.jpeg',
        'images/fotos-historia/saracomendo2.jpeg',
        'images/fotos-historia/sarafreira.jpeg',
        'images/fotos-historia/cracuda.png',
        'images/fotos-historia/cracuda2.png',
        'images/fotos-historia/cracuda3.png',
        'images/fotos-historia/mendiga.png',
        'images/fotos-historia/hospital.png',
        'images/fotos-historia/renovada.png',
        'images/fotos-historia/vascaina.png',
    ]
};

// Citações românticas
const romanticQuotes = [
    "Se beleza fosse merda, você estaria toda cagada.",
    "Cada momento contigo é um momento que vale a pena viver.", 
    "Se você fosse um pum, eu não te soltava.",
    "Contigo, aprendi o verdadeiro significado do amor."
];

// Função para inicializar os carrosséis
function initCarousels() {
    // Para cada carrossel, inicializar as imagens e os controles
    Object.keys(carouselImages).forEach(carouselId => {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return; // Pula se não existir
        const carouselSlide = carousel.querySelector('.carousel-slide');
        const images = carouselImages[carouselId];
        
        // Adicionar imagens ao carrossel
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Foto do casal';
            img.className = 'carousel-image';
            carouselSlide.appendChild(img);
        });
        
        // Configurar os botões de navegação
        const prevButton = carousel.querySelector('.carousel-button-prev');
        const nextButton = carousel.querySelector('.carousel-button-next');
        
        let currentIndex = 0;
        
        // Função para atualizar a posição do slide
        function updateSlidePosition() {
            carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Evento para o botão anterior
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlidePosition();
        });
        
        // Evento para o botão próximo
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlidePosition();
        });
        
        // Configurar rotação automática
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlidePosition();
        }, 5000);
    });
}

// Função para inicializar o contador de tempo
function initTimeCounter() {
    const counterContainer = document.getElementById('counter-container');
    const startDate = new Date('2021-08-07T00:00:00');
    
    // Criar elementos do contador
    const counterItems = [
        { id: 'years', label: 'Anos' },
        { id: 'months', label: 'Meses' },
        { id: 'days', label: 'Dias' },
        { id: 'hours', label: 'Horas' },
        { id: 'minutes', label: 'Minutos' },
        { id: 'seconds', label: 'Segundos' }
    ];
    
    // Criar elementos HTML para cada item do contador
    counterItems.forEach(item => {
        const counterItem = document.createElement('div');
        counterItem.className = 'counter-item';
        
        const counterValue = document.createElement('div');
        counterValue.className = 'counter-value';
        counterValue.id = item.id;
        counterValue.textContent = '0';
        
        const counterLabel = document.createElement('div');
        counterLabel.className = 'counter-label';
        counterLabel.textContent = item.label;
        
        counterItem.appendChild(counterValue);
        counterItem.appendChild(counterLabel);
        counterContainer.appendChild(counterItem);
    });
    
    // Função para atualizar o contador
    function updateCounter() {
        const now = new Date();

        // --- Calcular anos, meses, dias ---
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        
        if (months < 0) {
            years--;
            months += 12;
        }
        if (days < 0) {
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
            // último dia do mês anterior
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        // --- Calcular horas, minutos e segundos ---
        const diffMs = now - startDate;
        const diffToday = now - new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );

        const hours = Math.floor(diffToday / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor(diffToday / (1000 * 60)) % 60;
        const seconds = Math.floor(diffToday / 1000) % 60;

        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

// Função para inicializar as citações românticas
function initRomanticQuotes() {
    const quoteText = document.getElementById('quote-text');
    let currentQuoteIndex = 0;
    
    // Função para atualizar a citação
    function updateQuote() {
        quoteText.textContent = `"${romanticQuotes[currentQuoteIndex]}"`;
        currentQuoteIndex = (currentQuoteIndex + 1) % romanticQuotes.length;
    }
    
    // Atualizar a citação a cada 8 segundos
    setInterval(updateQuote, 8000);
}

// Função para inicializar o reprodutor de música
function initMusicPlayer() {
    const musicButton = document.getElementById('music-button');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;
    
    musicButton.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicButton.innerHTML = 'Tocar Nossa Música <span class="music-icon">🔈</span>';
        } else {
            backgroundMusic.play();
            musicButton.innerHTML = 'Pausar Música <span class="music-icon">🔊</span>';
        }
        isPlaying = !isPlaying;
    });
}

// Função para criar corações flutuantes
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floating-hearts');
    const numberOfHearts = 20;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        
        // Posicionamento e animação aleatórios
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 5;
        const animationDelay = Math.random() * 5;
        const fontSize = Math.random() * 20 + 10;
        
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.animationDelay = `${animationDelay}s`;
        heart.style.fontSize = `${fontSize}px`;
        
        heartsContainer.appendChild(heart);
    }
}

// Proteção por senha nos botões da section carousel-links
function protectCarouselLinks() {
  const password = 'sassasissi';
  const links = document.querySelectorAll('.carousel-links button.link');
  links.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const userInput = prompt('Digite a senha. Dica: seu apelido');
      if (userInput === password) {
        // Acha o <a> dentro do botão e redireciona
        const a = btn.querySelector('a');
        if (a && a.href) {
          window.open(a.href, '_blank');
        }
      } else if (userInput !== null) {
        alert('Senha incorreta!');
      }
    });
  });
}

// Inicializar todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    initCarousels();
    initTimeCounter();
    initRomanticQuotes();
    initMusicPlayer();
    protectCarouselLinks(); // Adiciona proteção por senha
});
