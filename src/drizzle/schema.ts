
import { relations } from "drizzle-orm";
import { pgTable, pgEnum, integer, uuid,varchar, uniqueIndex, boolean, real, timestamp, primaryKey } from "drizzle-orm/pg-core"

export const UserRole = pgEnum("userRole",["ADMIN", "BASIC"]);

export const UserTable = pgTable("user",{
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull().$default(()=> Math.random()),
    email: varchar("email", { length: 255} ).notNull(),
    role: UserRole("userRole").default("BASIC").notNull()
},
table=>[
    uniqueIndex("emailIndex").on(table.email),
    uniqueIndex("uniqueNameAndEge").on(table.name, table.age)
]);

export const UserPreferencesTable = pgTable("userpreferences",{
    id: uuid("id").primaryKey().defaultRandom(),
    emailUpdate: boolean("emailUpdate").notNull().default(false),
    userId: uuid("userId").references(()=> UserTable.id).notNull()
})

export const PostTable = pgTable("post", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length:255 }).notNull(),
    averageRating: real("averageRating").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    authorId: uuid("authorId")
      .references(()=> UserTable.id)
      .notNull(),
})

export const CategoryTable = pgTable(
    "category",
    {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar("name",{ length: 255 }).notNull(),
})

export const PostCategoryTable = pgTable("postCategory",{
    postId: uuid("postId").references(()=> PostTable.id).notNull(),
    categoryId: uuid("categoryId").references(()=> CategoryTable.id).notNull()
},
table=>[
    primaryKey({ columns: [table.postId, table.categoryId]}),
])

//Relations
export const UserTableRelations = relations(UserTable,({ one, many})=>{
    return{
        posts: many(PostTable),
        preference: one(UserPreferencesTable)
    }
})

export const UserPreferencesTableRelations = relations(UserPreferencesTable,
    ({ one })=>{
        return{
            user: one(UserTable, {
                fields: [UserPreferencesTable.userId],
                references: [UserTable.id]
            })
        }
    })
export const PostTableRelation = relations(PostTable,
    ({ one, many })=>{
    return{
        author: one(UserTable, {
            fields: [PostTable.authorId],
            references: [UserTable.id]
        }),
        PostCategories: many(PostCategoryTable)
    }
})

export const CategoryTableRelation = relations(CategoryTable,
    ({ many }) =>{
        return{
            postCategories: many(PostCategoryTable)
        }
    })

export const PostCategoryTableRelation = relations(PostCategoryTable,
    ({ one })=>{
        return{
            post: one(PostTable, {
                fields: [PostCategoryTable.postId],
                references: [PostTable.id]
            }),
            category: one(CategoryTable, {
                fields: [PostCategoryTable.categoryId],
                references: [CategoryTable.id]
            })
        }
    })

