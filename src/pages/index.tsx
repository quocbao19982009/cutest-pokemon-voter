import PokemonItem from "@/components/PokemonItem";
import { getOptionForVote } from "@/utils/getRandomPokemon";
import type { GetServerSideProps, NextPage } from "next";

import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

interface HomePageProps {
  firstId: number;
  secondId: number;
}

const HomePage = ({ firstId, secondId }: HomePageProps) => {
  const router = useRouter();
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
  const refreshData = () => router.replace(router.asPath);
  const voteHandler = (id: number) => {
    // Todo Vote pokemon
    console.log("Vote pokemon: ", id);
    refreshData();
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center mb-2">Which Pokemon is cuter?</div>
        <div className="border p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in  ">
          {isLoading && <p>Loading...</p>}
          {!isLoading && firstPokemon.data && (
            <PokemonItem
              name={firstPokemon.data.name}
              sprites={firstPokemon.data.sprites.front_default!}
              voteHandler={voteHandler.bind(null, firstId)}
            />
          )}
          <div className="p-8">VS</div>
          {isLoading && <p>Loading...</p>}
          {!isLoading && secondPokemon.data && (
            <PokemonItem
              name={secondPokemon.data.name}
              sprites={secondPokemon.data.sprites.front_default!}
              voteHandler={voteHandler.bind(null, secondId)}
            />
          )}
        </div>
        {/* <button onClick={refreshData}>Click to Refresh</button> */}
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
