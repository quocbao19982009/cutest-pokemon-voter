import { getOptionForVote } from "@/utils/getRandomPokemon";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [firstId, secondId] = getOptionForVote();
  const [firstPokemonId, setFirstPokemonId] = useState<null | number>(null);
  const [secondPokemonId, setSecondPokemonId] = useState<null | number>(null);
  // I have to use useEffect, because without useEffect, getOptionForVote will result different result on Server and on React Client -> which give error
  useEffect(() => {
    setFirstPokemonId(firstId!);
    setSecondPokemonId(secondId!);
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center mb-2">Which Pokemon is cuter?</div>
        <div className="border p-8 rounded flex justify-between items-center max-w-2xl">
          <div className="w-16 h-16 bg-red-200">{firstPokemonId}</div>
          <div className="p-8">VS</div>
          <div className="w-16 h-16 bg-red-200">{secondPokemonId}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
