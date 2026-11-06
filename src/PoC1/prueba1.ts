function shuffle<T>(cartas: T[]): T[] {
  const cartasCopia = [...cartas];  
  for (let i = cartasCopia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasCopia[i], cartasCopia[j]] = [cartasCopia[j], cartasCopia[i]];
  }
  return cartasCopia;
}

const cartas = [1, 2, 3, 4, 5];

const nuevoOrden = [shuffle(cartas)];


console.log(cartas);
console.log(nuevoOrden);