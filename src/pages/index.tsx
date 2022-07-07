import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center mb-2">Which Pokemon is cuter?</div>
        <div className="border p-8 rounded flex justify-between items-center max-w-2xl">
          <div className="w-16 h-16 bg-red-200">Pokemon 1</div>
          <div className="p-8">VS</div>
          <div className="w-16 h-16 bg-red-200">Pokemon 2</div>
        </div>
      </div>
    </>
  );
};

export default Home;
