// import pg from 'pg' 
// export const client = new pg.Client({
//     host :"localhost" ,
//     user :"postgres" ,
//     port :5432 ,
//     password :"Himanshu@7024" ,
//     database:"Himanshu_first_db"
// })
// const Pool = require("pg").Pool;
import pg from 'pg'
const Pool = pg.Pool 
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
export const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
});
