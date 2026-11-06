interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const arrayCartas: InfoCarta[] = [
    { idFoto: 1, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png"},
    { idFoto: 2, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png"},
    { idFoto: 3, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png"},
    { idFoto: 1, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png"},
    { idFoto: 2, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png"},
    { idFoto: 3, imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png"},
];

const todascartas = document.querySelectorAll<HTMLDivElement>("div[data-indice-id]");

function alPincharCarta(div: HTMLDivElement): void {
  div.addEventListener("click", () => {
    const indiceTexto = div.dataset.indiceId;

    if (indiceTexto !== undefined) {
      const indice = Number(indiceTexto);
      const carta = arrayCartas[indice];
      const imagen = div.querySelector<HTMLImageElement>("img");

      if (imagen !== null) {
        imagen.src = carta.imagen;
      }
    }
  });
}
todascartas.forEach(div => {
  alPincharCarta(div);
});
