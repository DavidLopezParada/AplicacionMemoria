import { tablero } from "./model";
import {
  iniciaPartida,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  parejaNoEncontrada,
} from "./motor";

const imagenes = document.querySelectorAll<HTMLImageElement>("div[data-indice-id] img");
const textoIntentos = document.querySelector<HTMLSpanElement>("#intentos");
const textoMensaje = document.querySelector<HTMLParagraphElement>("#mensaje");
const botonEmpezarPartida = document.querySelector<HTMLButtonElement>("#botonInicio");

let intentos = 0;

const pintarIntentos = (): void => {
  if (textoIntentos !== null) {
    textoIntentos.textContent = String(intentos);
  }
};

const mostrarMensaje = (texto: string): void => {
  if (textoMensaje !== null) {
    textoMensaje.textContent = texto;
  }
};

const pintarCarta = (indice: number): void => {
  const carta = tablero.cartas[indice];
  const imagen = imagenes[indice];
  if (imagen !== null && imagen !== undefined && imagen instanceof HTMLImageElement) {
    if (carta.estaVuelta) {
      imagen.src = carta.imagen;
    } else {
      imagen.src = "";
    }
  }
};

const pintarTableroBocaAbajo = (): void => {
  tablero.cartas.forEach((_, indice) => {
    pintarCarta(indice);
  });
};

const alPincharCarta = (indice: number): void => {
  if (!sePuedeVoltearLaCarta(tablero, indice)) {
    mostrarMensaje("Esa carta ya está volteada.");
  } else {
    mostrarMensaje("");
    voltearLaCarta(tablero, indice);
    pintarCarta(indice);

    const indiceA = tablero.indiceCartaVolteadaA;
    const indiceB = tablero.indiceCartaVolteadaB;
    
    if (tablero.estadoPartida === "DosCartasLevantadas" && indiceA !== undefined && indiceB !== undefined) {
      intentos = intentos + 1;
      pintarIntentos();

      if (sonPareja(indiceA, indiceB, tablero)) {
        parejaEncontrada(tablero, indiceA, indiceB);
      } else {
        setTimeout(() => {
          parejaNoEncontrada(tablero, indiceA, indiceB);
          pintarCarta(indiceA);
          pintarCarta(indiceB);
        }, 1000);
      }
    }
  }
};

export const prepararUI = (): void => {
  if (botonEmpezarPartida !== null && botonEmpezarPartida !== undefined && botonEmpezarPartida instanceof HTMLButtonElement) {
    botonEmpezarPartida.addEventListener("click", () => {
      iniciaPartida(tablero);
      intentos = 0;
      pintarIntentos();
      mostrarMensaje("");
      pintarTableroBocaAbajo();
    });
  }

  const todascartas = document.querySelectorAll<HTMLDivElement>("div[data-indice-id]");
  todascartas.forEach((div) => {
    div.addEventListener("click", () => {
      const indiceTexto = div.dataset.indiceId;
      if (indiceTexto !== undefined) {
        alPincharCarta(Number(indiceTexto));
      }
    });
  });
};