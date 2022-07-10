export type pokemonResult = {
  id: number;
  _count: {
    VoteFor: number;
    VoteAgainst: number;
  };
  name: string;
  spriteUrl: string;
};
