import pg from 'pg' 
export const client = new pg.Client({
    host :"localhost" ,
    user :"postgres" ,
    port :5432 ,
    password :"Himanshu@7024" ,
    database:"Himanshu_first_db"
})
