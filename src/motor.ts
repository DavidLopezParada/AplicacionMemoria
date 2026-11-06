import { Carta, Tablero} from "./model"; 
/*
En el motor nos va a hacer falta un método para barajar cartas
*/

const barajarCartas = (cartas : Carta[]): Carta[] => {
   const cartasCopia = [...cartas];  
  for (let i = cartasCopia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasCopia[i], cartasCopia[j]] = [cartasCopia[j], cartasCopia[i]];
  }
  return cartasCopia;
}

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
  if (tablero.cartas[indice].encontrada)return false;
  if (tablero.cartas[indice].estaVuelta)return false;
  if (tablero.estadoPartida === "PartidaNoIniciada") return false;
  if (tablero.estadoPartida === "DosCartasLevantadas") return false;
  if (tablero.estadoPartida === "PartidaCompleta") return false;

  return true;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
}

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.estadoPartida = esPartidaCompleta(tablero) ? "PartidaCompleta" : "CeroCartasLevantadas";
}

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.estadoPartida = "CeroCartasLevantadas";
}

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero) : boolean => {
  return tablero.cartas.every(carta => carta.encontrada);
};

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });
  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
};

