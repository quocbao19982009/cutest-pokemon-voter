import React from "react";
import Image from "next/image";
import { pokemonResult } from "@/schema/pokemonResult.schema";

interface PokemonListingProps {
  pokemon: pokemonResult;
  rank: number;
  percent: number;
}

const PokemonListingItem = ({
  pokemon,
  rank,
  percent,
}: PokemonListingProps) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center pl-4">
          <Image
            alt={`${pokemon.name}-image`}
            src={pokemon.spriteUrl}
            width={64}
            height={64}
            layout="fixed"
          />
          <div className="pl-2 capitalize">{pokemon.name}</div>
        </div>
      </div>
      <div className="pr-4">{percent + "%"}</div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  );
};

export default PokemonListingItem;
