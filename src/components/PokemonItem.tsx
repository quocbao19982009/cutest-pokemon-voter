import React from "react";
import { Pokemon } from "pokenode-ts";

interface PokemonItemProps {
  name: string;
  sprites: string;
  voteHandler: () => void;
}

const PokemonItem = ({ name, sprites, voteHandler }: PokemonItemProps) => {
  return (
    <div className="text-center  w-64">
      <div className="capitalize mt-3">{name}</div>
      <img className=" w-64 h-64" src={sprites} />

      <button
        onClick={voteHandler}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center"
      >
        Vote
      </button>
    </div>
  );
};

export default PokemonItem;
