import { describe, it, expect } from "vitest";
import * as model from "./model";
import { sePuedeVoltearLaCarta, voltearLaCarta, sonPareja, parejaEncontrada, parejaNoEncontrada, esPartidaCompleta, iniciaPartida, } from "./motor";

describe("sePuedeVoltearLaCarta", () => {
  it("devuelve false si la carta ya está encontrada", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: false, encontrada: true },
        { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      ],
      estadoPartida: "CeroCartasLevantadas",
    };
    const indice = 0;

    // Act
    const resultado = sePuedeVoltearLaCarta(tablero, indice);

    // Assert
    expect(resultado).toBe(false);
  });

  it("devuelve false si la carta ya está dada la vuelta", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      ],
      estadoPartida: "UnaCartaLevantada",
    };
    const indice = 0;

    // Act
    const resultado = sePuedeVoltearLaCarta(tablero, indice);

    // Assert
    expect(resultado).toBe(false);
  });

  it("devuelve false si el estado de la partida es DosCartasLevantadas", () => {
  // Arrange
  const tablero: model.Tablero = {
    cartas: [
      { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
      { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: false },
      { idFoto: 3, imagen: "url3", estaVuelta: false, encontrada: false },
    ],
    estadoPartida: "DosCartasLevantadas",
  };
  const indice = 2;

  // Act
  const resultado = sePuedeVoltearLaCarta(tablero, indice);

  // Assert
  expect(resultado).toBe(false);
});

it("devuelve false si el estado de la partida es PartidaNoIniciada", () => {
  // Arrange
  const tablero: model.Tablero = {
    cartas: [
      { idFoto: 1, imagen: "url1", estaVuelta: false, encontrada: false },
      { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
    ],
    estadoPartida: "PartidaNoIniciada",
  };
  const indice = 0;

  // Act
  const resultado = sePuedeVoltearLaCarta(tablero, indice);

  // Assert
  expect(resultado).toBe(false);
});

it("devuelve true si la carta está boca abajo y el estado lo permite", () => {
  // Arrange
  const tablero: model.Tablero = {
    cartas: [
      { idFoto: 1, imagen: "url1", estaVuelta: false, encontrada: false },
      { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
    ],
    estadoPartida: "CeroCartasLevantadas",
  };
  const indice = 0;

  // Act
  const resultado = sePuedeVoltearLaCarta(tablero, indice);

  // Assert
  expect(resultado).toBe(true);
});
});




describe("voltearCarta", () => {
    it("desde CeroCartasLevantadas voltea la carta y pasa a UnaCartaLevantada", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: false, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      ],
      estadoPartida: "CeroCartasLevantadas",
    };

    // Act
    voltearLaCarta(tablero, 1);

    // Assert
    expect(tablero.cartas[1].estaVuelta).toBe(true);
    expect(tablero.indiceCartaVolteadaA).toBe(1);
    expect(tablero.estadoPartida).toBe("UnaCartaLevantada");
  });

   it("desde UnaCartaLevantada voltea la carta y pasa a DosCartasLevantadas", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      ],
      estadoPartida: "UnaCartaLevantada",
      indiceCartaVolteadaA: 0,
    };

    // Act
    voltearLaCarta(tablero, 1);

    // Assert
    expect(tablero.cartas[1].estaVuelta).toBe(true);
    expect(tablero.indiceCartaVolteadaB).toBe(1);
    expect(tablero.estadoPartida).toBe("DosCartasLevantadas");
  });
});


describe("sonPareja", () => {
  it("devuelve true si las dos cartas tienen el mismo idFoto", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
    };

    // Act
    const resultado = sonPareja(0, 1, tablero);

    // Assert
    expect(resultado).toBe(true);
  });

  it("devuelve false si tienen distinto idFoto", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
    };

    // Act
    const resultado = sonPareja(0, 1, tablero);

    // Assert
    expect(resultado).toBe(false);
  });
});

describe("parejaEncontrada", () => {
  it("marca las dos cartas como encontradas y vuelve a CeroCartasLevantadas si quedan parejas", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
    };

    // Act
    parejaEncontrada(tablero, 0, 1);

    // Assert
    expect(tablero.cartas[0].encontrada).toBe(true);
    expect(tablero.cartas[1].encontrada).toBe(true);
    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");
  });

  it("pasa a PartidaCompleta si era la última pareja", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: true },
        { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: true },
      ],
      estadoPartida: "DosCartasLevantadas",
    };

    // Act
    parejaEncontrada(tablero, 0, 1);

    // Assert
    expect(tablero.estadoPartida).toBe("PartidaCompleta");
  });
});

describe("parejaNoEncontrada", () => {
  it("vuelve a poner boca abajo las dos cartas y pasa a CeroCartasLevantadas", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
    };

    // Act
    parejaNoEncontrada(tablero, 0, 1);

    // Assert
    expect(tablero.cartas[0].estaVuelta).toBe(false);
    expect(tablero.cartas[1].estaVuelta).toBe(false);
    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");
  });
});

describe("esPartidaCompleta", () => {
  it("devuelve true si todas las cartas están encontradas", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: true },
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: true },
      ],
      estadoPartida: "DosCartasLevantadas",
    };

    // Act
    const resultado = esPartidaCompleta(tablero);

    // Assert
    expect(resultado).toBe(true);
  });

  it("devuelve false si alguna carta no está encontrada", () => {
    // Arrange
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: true },
        { idFoto: 2, imagen: "url2", estaVuelta: false, encontrada: false },
      ],
      estadoPartida: "CeroCartasLevantadas",
    };

    // Act
    const resultado = esPartidaCompleta(tablero);

    // Assert
    expect(resultado).toBe(false);
  });
});

describe("iniciaPartida", () => {
  it("deja el tablero listo: estado CeroCartasLevantadas y cartas boca abajo y sin encontrar", () => {
    // Arrange: simulamos una partida anterior terminada
    const tablero: model.Tablero = {
      cartas: [
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: true },
        { idFoto: 1, imagen: "url1", estaVuelta: true, encontrada: true },
        { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: true },
        { idFoto: 2, imagen: "url2", estaVuelta: true, encontrada: true },
      ],
      estadoPartida: "PartidaCompleta",
    };

    // Act
    iniciaPartida(tablero);

    // Assert
    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");
    expect(tablero.cartas).toHaveLength(4);
    expect(tablero.cartas.every((carta) => carta.estaVuelta === false)).toBe(true);
    expect(tablero.cartas.every((carta) => carta.encontrada === false)).toBe(true);
  });
});
    // Arrange
