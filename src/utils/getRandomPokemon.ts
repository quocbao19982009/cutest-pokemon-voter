const MAX_DEX_ID = 459;

export const getRandomPokemon: (skipPoekemon?: number) => number = (
  skipPoekemon?: number
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID + 1);

  if (pokedexNumber !== skipPoekemon) {
    //if not the same number
    return pokedexNumber;
  } else {
    // If the same number than call itsself again so it will skip that number
    return getRandomPokemon(skipPoekemon);
  }
};

export const getOptionForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);
  return [firstId, secondId];
};
