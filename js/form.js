// Recebe elementos do formulário e dos inputs
const form = document.getElementById("lead-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const leadFormSection = document.getElementById("lead-form-section");
const productSection = document.getElementById("product-section");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita o envio padrão do formulário

  resetValidationMessages(); // Reseta mensagens de erro de validação

  // Recebe valores dos inputs do formulário
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  // Valida campo de nome (ao menos 3 caracteres)
  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/;
  if (!nameRegex.test(name)) {
    showInvalidFeedback(nameInput, "name");
    return;
  }

  // Valida campo de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showInvalidFeedback(emailInput, "email");
    return;
  }

  // Valida formatação de telefone no formato brasileiro
  const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  if (!phoneRegex.test(phone)) {
    showInvalidFeedback(phoneInput, "phone");
    return;
  }

  // Exibe mensagem de boas-vindas com o nome informado no formulário
  document.getElementById("welcomeMessage").textContent = `Welcome, ${name}`;

  // Oculta a seção do formulário e exibe a seção do produto
  leadFormSection.style.display = "none";
  productSection.style.display = "block";
});

// Aplica máscara ao campo de telefone
phoneInput.addEventListener("input", () => {
  // Remove caracteres não numéricos
  let phone = phoneInput.value.replace(/\D/g, "");
  if (phone.length > 2) {
    phone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
  }
  phoneInput.value = phone;
});

// Função para limpar todas as mensagens de erro
function resetValidationMessages() {
  const invalidFeedbacks = document.querySelectorAll(".invalid-feedback");
  invalidFeedbacks.forEach((feedback) => {
    feedback.style.display = "none";
  });

  // Remove a classe de invalidez de todos os campos
  const formControls = document.querySelectorAll(".form-control");
  formControls.forEach((input) => {
    input.classList.remove("is-invalid");
  });
}

// Função para exibir a mensagem de erro no campo correspondente
function showInvalidFeedback(input, field) {
  const invalidFeedback =
    input.parentElement.querySelector(".invalid-feedback");
  if (invalidFeedback) {
    invalidFeedback.style.display = "block";
    input.classList.add("is-invalid"); // Adiciona a classe 'is-invalid' para o estilo visual do Bootstrap
  }
}

// Adiciona validação ao campo após o usuário corrigir os dados
const inputs = [nameInput, emailInput, phoneInput];
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    resetValidationMessages(); // Limpa as mensagens de erro enquanto o usuário digita
  });
});
