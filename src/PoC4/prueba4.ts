const carta1 = document.querySelector<HTMLButtonElement>("#carta1");
const carta2 = document.querySelector<HTMLButtonElement>("#carta2");
const img1 = document.querySelector<HTMLImageElement>("#carta-img1");
const img2 = document.querySelector<HTMLImageElement>("#carta-img2");
const imagenCarta1 = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png"
const imagenCarta2 = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png"




function ensenarCarta1(url: string): void {
  if (img1 !== null && img1 !== undefined && img1 instanceof HTMLImageElement) {
    img1.src = url;
  }
}

function ensenarCarta2(url: string): void {
  if (img2 !== null && img2 !== undefined && img2 instanceof HTMLImageElement) {
    img2.src = url;
  }
}

function clickcarta1(): void {
  if (carta1 !== null && carta1 !== undefined && carta1 instanceof HTMLButtonElement) {
    carta1.addEventListener("click", () => {ensenarCarta1(imagenCarta1);});
  }
}

function clickcarta2(): void {
  if (carta2 !== null && carta2 !== undefined && carta2 instanceof HTMLButtonElement) {
    carta2.addEventListener("click", () => {ensenarCarta2(imagenCarta2);});
  }
}

clickcarta1()

clickcarta2()