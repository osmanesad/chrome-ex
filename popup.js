document.addEventListener('DOMContentLoaded', () => {
  const quotes = [
    "Başlamak için mükemmel olmak zorunda değilsin, ama mükemmel olmak için başlamak zorundasın.",
    "Her gün bir adım daha ileri git.",
    "Hayallerin peşinden gitmekten korkma.",
    "İmkansız sadece bir kelimedir.",
    "Bugün, geriye kalan hayatının ilk günü."
  ];

  const quoteElement = document.getElementById("quote");
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  function newQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = quote;
  }

  newQuote(); // ilk yüklemede göster
  newQuoteBtn.addEventListener("click", newQuote); // butona tıklanınca değiştir
});
