import PokemonItem from "@/components/PokemonItem";
import { getOptionForVote } from "@/utils/getRandomPokemon";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "../utils/trpc";

interface HomePageProps {
  firstId: number;
  secondId: number;
}

const HomePage = ({ firstId, secondId }: HomePageProps) => {
  const firstPokemon = trpc.useQuery([
    "pokemon.get-by-id",
    {
      id: firstId,
    },
  ]);
  const secondPokemon = trpc.useQuery([
    "pokemon.get-by-id",
    {
      id: secondId,
    },
  ]);

  const isLoading = firstPokemon.isLoading && secondPokemon.isLoading;

  console.log(isLoading);

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center mb-2">Which Pokemon is cuter?</div>
        <div className="border  rounded flex justify-between items-center max-w-2xl">
          {isLoading && <p>Loading...</p>}
          {!isLoading && firstPokemon.data && (
            <PokemonItem pokemon={firstPokemon.data} />
          )}
          <div className="p-8">VS</div>
          {isLoading && <p>Loading...</p>}
          {!isLoading && secondPokemon.data && (
            <PokemonItem pokemon={secondPokemon.data} />
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [firstId, secondId] = getOptionForVote();
  return {
    props: { firstId, secondId },
  };
};

export default HomePage;
