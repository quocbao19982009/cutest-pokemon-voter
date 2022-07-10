import PokemonItem from "@/components/PokemonItem";
import { getOptionForVote } from "@/utils/getRandomPokemon";
import type { GetServerSideProps, NextPage } from "next";

import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const HomePage = () => {
  const router = useRouter();
  const {
    data: pokemonPair,
    refetch,
    isLoading,
  } = trpc.useQuery(["pokemon.get-2-pokemon"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const voteMuation = trpc.useMutation(["pokemon.cast-vote"]);
  // const isLoading = firstPokemon.isLoading && secondPokemon.isLoading;

  const voteHandler = (id: number) => {
    // Todo Vote pokemon
    voteMuation.mutate({
      voteFor:
        id === pokemonPair?.firstPokemon?.id!
          ? pokemonPair?.firstPokemon?.id!
          : pokemonPair?.secondPokemon?.id!,

      voteAgainst:
        id !== pokemonPair?.firstPokemon?.id!
          ? pokemonPair?.firstPokemon?.id!
          : pokemonPair?.secondPokemon?.id!,
    });

    refetch();
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center mb-2">Which Pokemon is cuter?</div>
        <div className="border p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in  ">
          {isLoading && <p>Loading...</p>}
          {!isLoading && pokemonPair?.firstPokemon && (
            <PokemonItem
              name={pokemonPair?.firstPokemon.name}
              sprites={pokemonPair?.firstPokemon.spriteUrl}
              voteHandler={voteHandler.bind(null, pokemonPair?.firstPokemon.id)}
            />
          )}
          <div className="p-8">VS</div>
          {isLoading && <p>Loading...</p>}
          {!isLoading && pokemonPair?.secondPokemon && (
            <PokemonItem
              name={pokemonPair?.secondPokemon.name}
              sprites={pokemonPair?.secondPokemon.spriteUrl}
              voteHandler={voteHandler.bind(
                null,
                pokemonPair?.secondPokemon.id
              )}
            />
          )}
        </div>
        {/* <button onClick={refreshData}>Click to Refresh</button> */}
      </div>
    </>
  );
};

export default HomePage;
