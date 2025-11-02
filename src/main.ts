import "dotenv/config"
import { db } from "./drizzle/db"
import { PostCategoryTable, UserPreferencesTable, UserTable } from "./drizzle/schema"
import { asc, Column, count, desc, eq, gt, sql } from "drizzle-orm"
import { table } from "console"

async function main() {
    // await db.delete(UserTable)
    // const user = await db.insert(UserTable).values([{
    //     name: "mohammd",
    //     age: 23,
    //     email: "testemail1.com"
    // },
    // {
    //     name: "modar",
    //     age: 28,
    //     email: "testemail2.com"
    // }]).returning({
    //     id: UserTable.id,
    //     userName: UserTable.name,
    //     type: UserTable.role
    // }).onConflictDoUpdate({
    //     target: UserTable.email,
    //     set: {name: "updated name"}
    // })
    // console.log(user)
    // db.insert(UserPreferencesTable).values({
    //     emailUpdate: true,
    //     userId: "807eabdd-1cbc-4f88-8aa3-dbe6e362b4af"
    // })

    // const user = await db.query.UserTable.findMany({
        // columns:{name: true,age:true},
        // extras:{
        //     UpperCaseName: sql<string>`upper(${UserTable.name})`.as("UpperCaseName"),
        // },
        // limit: 2,
        // offset:2,
        // with: {posts: { with:{ PostCategories: true }}}
        // orderBy: asc(UserTable.age)
        // orderBy: (table, funcs)=> funcs.desc(UserTable.age)
        // orderBy: (table, {asc, desc})=> desc(UserTable.age),
        // where: (table, funcs) => funcs.eq(table.age, 23)
        // where: (table, funcs) => funcs.between(table.age, 25, 30)
    // })
    // const user = await db.select({
        // 1
    //     id: UserTable.id,
    //     age: UserTable.age,
    //     emailUpdate: UserPreferencesTable.emailUpdate
    // }).from(UserTable)
    // .leftJoin(
    //     UserPreferencesTable,
    //     eq(UserPreferencesTable.id, UserTable.id)
        // 2    
//     name: UserTable.name,
//         count: count(UserTable.name)
// })
// .from(UserTable)
// .groupBy(UserTable.name)
// .having(columns => gt( columns.count, 1))



const users = await db

.select().from(UserTable)
//update
// .update(UserTable)
// .set({
//     age:40
// })
// .where(eq(UserTable.age, 42))

console.log(users)
}

main()