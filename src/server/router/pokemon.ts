import { z } from "zod";
import { PokemonClient } from "pokenode-ts";

import { createRouter } from "./context";

export const pokemonRouter = createRouter().query("get-by-id", {
  input: z.object({ id: z.number() }),
  async resolve({ input }) {
    const api = new PokemonClient();
    try {
      const pokemon = await api.getPokemonById(input.id);
      return pokemon;
    } catch (error) {}
  },
});
