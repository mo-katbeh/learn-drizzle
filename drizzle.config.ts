import { defineConfig } from "drizzle-kit"

// export default defineConfig({
//     dialect: "postgresql",
//     schema: "./src/drizzle/schema.ts",
//     out: "./src/dizzle/migrations",

//     dbCredentials:{
//         connectionString: process.env.DATABASE_URL as string
//     },
//     verbose: true, //tell us about changing 
//     strict: true//ask you if sure about make changing

// })
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations", // make sure this path exists
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
  verbose: true,
  strict: true,
});


// import { drizzle } from 'drizzle-orm/node-postgres'

// export default drizzle({
//     dialect: "postgresql",
//     schema: "./src/drizzle/schema.ts",
//     connection:{
//         connectionString: process.env.DATABASE_URL as string
//     },
//     verbose: true, //tell us about changing 
//     strict: true //ask you if sure about make changing

// })