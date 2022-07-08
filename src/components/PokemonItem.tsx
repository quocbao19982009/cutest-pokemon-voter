import React from "react";
import { Pokemon } from "pokenode-ts";

interface PokemonItemProps {
  pokemon: Pokemon;
}

const PokemonItem = ({ pokemon }: PokemonItemProps) => {
  return (
    <div className="w-64 h-64 ">
      <div className="text-center capitalize mt-4">{pokemon.name}</div>
      <img className="w-full" src={pokemon?.sprites.front_default!} />
    </div>
  );
};

export default PokemonItem;
