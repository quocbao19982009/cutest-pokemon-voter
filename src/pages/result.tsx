import { GetStaticProps } from "next";
import React from "react";
import Head from "next/head";

import { pokemonResult } from "@/schema/pokemonResult.schema";
import { prisma } from "@/server/db/client";
import PokemonListingItem from "@/components/PokemonListing";
import Header from "@/components/Header";

interface ResultPage {
  pokemon: pokemonResult[];
}

const ResultPage = ({ pokemon }: ResultPage) => {
  const generateCountPercent = (pokemon: pokemonResult) => {
    const { VoteFor, VoteAgainst } = pokemon._count;
    if (VoteFor + VoteAgainst === 0) {
      return 0;
    }
    return (VoteFor / (VoteFor + VoteAgainst)) * 100;
  };

  const sortPokemon = pokemon.sort((a, b) => {
    const dif = generateCountPercent(b) - generateCountPercent(a);

    if (dif === 0) {
      return b._count.VoteFor - a._count.VoteFor;
    }

    return dif;
  });
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <Head>
          <title>Cutes Pokemon Results</title>
        </Head>
        <h2 className="text-2xl p-4">Results</h2>
        <div className="flex flex-col w-full max-w-2xl border">
          {sortPokemon.map((currentPokemon, index) => (
            <PokemonListingItem
              pokemon={currentPokemon}
              rank={index + 1}
              key={index}
              percent={generateCountPercent(currentPokemon)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ResultPage;

export const getStaticProps: GetStaticProps = async () => {
  const getPokemonInOrder = async () => {
    return await prisma.pokemon.findMany({
      orderBy: {
        VoteFor: { _count: "desc" },
      },
      select: {
        id: true,
        name: true,
        spriteUrl: true,
        _count: {
          select: {
            VoteFor: true,
            VoteAgainst: true,
          },
        },
      },
    });
  };

  const pokemon = await getPokemonInOrder();

  const DAY_IN_SECONDS = 60 * 60 * 24;

  return {
    props: { pokemon: pokemon },
    revalidate: DAY_IN_SECONDS,
  };
};
