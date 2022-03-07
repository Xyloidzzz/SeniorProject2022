# GradeFlex

_work in progress title_

## Information

This GitHub repo is a SeniorProject for the University of Texas Rio Grande Valley College of Engineering and Computer Science.

Jesus Mendez, Jaehun Kim, and Alfredo Pena working along Dr.Chen on a Gradebook application made in ReactJS and NextJS.

You'll find the full site here: _when done link here_

## Dev Instructions

### Database Setup

You'll need to setup a local Postgres Database.

Download PostgreSQL [here](https://www.postgresql.org/).

After downloading and setting up an account you should link your database in a `.env` file using this template.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Here are some handy commands to get the ball rolling in developing with a PostgreSQL DB.

To migrate a change in schema:

```bash
npx prisma migrate dev
```

(You should only need to run this once then remove the `npx` on subsequent migrations.)

Also, migrate should never be used once the app is in production.

To get down and dirty with the DB:

```bash
npx prisma studio
```

You can use prisma studio to add test data when needed.

Use this command to generate sample data
```bash
npx prisma db seed  
```

### Start Coding

First, make sure you have all the dependencies installed:

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to the active page.

Root is `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
