const carta = document.querySelector<HTMLImageElement>("#carta-img");
const botoncarta = document.querySelector<HTMLButtonElement>("#boton-carta")
const imagenCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png";


function ensenarCarta(url: string): void {
  if (carta !== null && carta !== undefined && carta instanceof HTMLImageElement) {
    carta.src = url;
  }
}


function darlevueltaCarta(): void {
  if (botoncarta !== null && botoncarta !== undefined && botoncarta instanceof HTMLButtonElement) {
    botoncarta.addEventListener("click", () => {ensenarCarta(imagenCarta);});
  }
}

darlevueltaCarta();