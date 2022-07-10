import { getOptionForVote } from "@/utils/getRandomPokemon";
import { z } from "zod";

import { prisma } from "../db/client";
import { createRouter } from "./context";

export const pokemonRouter = createRouter()
  .query("get-2-pokemon", {
    async resolve() {
      const [firstId, secondId] = getOptionForVote();

      const bothPokemon = await prisma.pokemon.findMany({
        where: {
          id: {
            in: [firstId!, secondId!],
          },
        },
      });

      if (bothPokemon.length !== 2) {
        throw new Error("Failed to fetch two pokemons");
      }

      return { firstPokemon: bothPokemon[0], secondPokemon: bothPokemon[1] };
    },
  })
  .mutation("cast-vote", {
    input: z.object({ voteFor: z.number(), voteAgainst: z.number() }),
    async resolve({ input }) {
      const vote = await prisma.vote.create({
        data: {
          voteAgainstId: input.voteAgainst,
          voteForId: input.voteFor,
        },
      });

      return { success: true, vote };
    },
  })
  .query("get-result", {
    async resolve() {
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

      return {
        pokemon,
      };
    },
  });
