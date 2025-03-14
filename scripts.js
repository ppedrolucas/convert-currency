// COTAÇÃO DAS MOEDAS
const USD = 5.8;
const EUR = 6.31;
const GBP = 7.51;

const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

//Observar o evento de entrada de dados do input "amount" para executar uma função
amount.addEventListener("input", () => {
  // Manipulando o input para receber somente números

  // Criando uma expressão regular que retorna apenas letras
  const hasCharactersRegex = /\D+/g;

  // O valor digitado no input vai atualizar o seu valor depois que o replace reconhecer as letras inseridas e trocá-las por "nada".

  // replace vai analizar nossa expressão regular e usar o valor reconhecido por ela para substituir as letras por "nada".
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

// Capiturando o evento de submit do formulário
form.onsubmit = function (evento) {
  evento.preventDefault();

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
};

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    // Atualizando a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // Calcular o total
    let total = amount * price;

    // Verifica se o resultado não é número
    if (isNaN(total)) {
      return alert("Valor inválido");
    }

    // Formatar o valor total
    result.textContent = formatCurrencyBRL(total);

    // Aplicar classe que exibe o footer
    footer.classList.add("show-result");
  } catch (error) {
    console.log(error);
    // Remove a classe que exibe o footer
    footer.classList.remove("show-result");
    alert(
      "Algo de errado não está certo, verifique os valores novamente e tente novamente."
    );
  }
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
  // Retorna o valor já convertido em Number para utilizar o "toLocaleString" e formatar ao padrão BRL
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
