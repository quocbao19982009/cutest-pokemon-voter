# Pokemon Voter

Demo: https://cutest-pokemon-voter.vercel.app

This is a pokemon app that users can vote on and see their result.

## Technologies

This is where it get interesting. Recently, there is a stack call [T3-Stack](https://init.tips) which include

- Language: TypeScript
- Frontend: Next JS, tailwind
- Backend: tRPC --> This is the most interesting tech in the Stack
- Database: Postgres with Prisma

So this app is a way to test out this new stack. It is definitely worth a try!

### Why tRPC?

Usually, you don't have a way to communicate from Backend to Frontend consistently. For example, if you want to implement a new API, you would have to go through all the human interactions with the Frontend Team to make sure it will work. With tRPC, you could just implement the API and tRPC will automatically import the types of your API (Input, Output,...) to the Frontend which makes your app more Type Secure and faster development. For a solo full-stack developer, this is the dream stack!

## How to install

- `npm install`

- Create a `.env` file and add your Postgres database_url into env. You can use Docker Postgres Image by running `docker-compose up` or your local Postgres.

```sh
DATABASE_URL="postgresql://postgres:PASSWORD@HOST:PORT/pokemon?schema=public"
```

If you want to use Docker:

```sh
DATABASE_URL="postgresql://postgres:changeme@localhost:5430/pokemon?schema=public"
```

- Migrate your database: `npx prisma migrate dev`

- Import Pokemons into your database: `npm run ts-node ./scripts/fill-db.ts`

- Run the app: `npm run dev`
