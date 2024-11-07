// ######## Carousel
// Adiciona o evento de clique para as thumbnails
document.querySelectorAll(".thumbnail").forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    const index = this.getAttribute("data-index");
    $("#carouselHero").carousel(parseInt(index));
  });
});

// ######## Gallery
// Array com as imagens
const images = [
  "./assets/product1.jpg",
  "./assets/product2.jpg",
  "./assets/product3.jpg",
  "./assets/product4.jpg",
  "./assets/product5.jpg",
  "./assets/product6.jpg",
  "./assets/product7.jpg",
  "./assets/product8.jpg",
];

let currentIndex = 0;

// Seleciona todos os elementos com a classe 'gallery-img'
document.querySelectorAll(".gallery-img").forEach((img, index) => {
  // Adiciona um evento de clique para cada imagem da galeria
  img.addEventListener("click", () => {
    currentIndex = index;
    // Atualiza a imagem do modal com a fonte da imagem correspondente ao índice atual
    document.getElementById("modalImage").src = images[currentIndex];
    // Exibe o modal com a imagem selecionada
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    modal.show();
  });
});

// Função para mostrar a imagem anterior
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  document.getElementById("modalImage").src = images[currentIndex];
});

// Função para mostrar a próxima imagem
document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  document.getElementById("modalImage").src = images[currentIndex];
});

// ######## Countdown
// Configuração inicial da contagem regressiva (10 minutos)
let countdownMinutes = 10;
let countdownSeconds = 0;

// Função de contagem regressiva
function startCountdown() {
  const minutesDisplay = document.getElementById("minutes");
  const secondsDisplay = document.getElementById("seconds");

  const interval = setInterval(() => {
    // Atualizar os minutos e segundos no HTML
    minutesDisplay.innerText = String(countdownMinutes).padStart(2, "0");
    secondsDisplay.innerText = String(countdownSeconds).padStart(2, "0");

    if (countdownMinutes === 0 && countdownSeconds === 0) {
      clearInterval(interval);
      document.getElementById("timer").innerText = "";
    } else if (countdownSeconds === 0) {
      countdownMinutes--;
      countdownSeconds = 59;
    } else {
      countdownSeconds--;
    }
  }, 1000);
}

// Iniciar o contador quando a página carregar
document.addEventListener("DOMContentLoaded", startCountdown);
