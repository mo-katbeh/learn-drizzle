import { bigint, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users" ,{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    role: text("role").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const WarehouseTable = pgTable("warehouse",{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    keeperId: bigint("keeper_id", { mode: "bigint" }).references(() => UserTable.id),
    name: text('name').notNull(),
    location: text('location').notNull(),
    capacity: integer('capacity').notNull(),
    
})
export const SectionTable = pgTable("sections",{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    warehouseId: bigint('warehouseId', {mode: 'bigint'}).references(()=> WarehouseTable.id),
    name: text('name').notNull(),
    capacity: integer("capacity"),
})
export const TypeTable = pgTable('types',{
    id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
    sectionId: bigint("section_id", { mode: "bigint" }).references(() => SectionTable.id).notNull(),
    name: text("name").notNull(),
    manufacturer: text("manufacturer").notNull(),
    unit: text("unit").default("unit").notNull(), 
    expiryDate: timestamp("expiry_date"),
    additionalInfo: text("additional_info"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const BatchTable = pgTable('batch',{
    id: bigint('id', {mode: 'bigint'}).primaryKey().generatedAlwaysAsIdentity(),
    typeId: bigint('typeId', {mode: "bigint"}).references(()=> TypeTable.id),
    userId: bigint('userId', {mode: 'bigint'}).references(()=> UserTable.id),
    origin: text("origin").notNull(),
    destination: text("destination").notNull(),
    quantity: integer("quantity").notNull(),
    movementType: text("movement_type").notNull(), 
    status: text("status").default('pending').notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()

})
export const StockTable = pgTable("stocks", {
  id: bigint('id', { mode: 'bigint' }).primaryKey().generatedAlwaysAsIdentity(),
  typeId: bigint("type_id", { mode: "bigint" }).references(() => TypeTable.id).notNull(),
  sectionId: bigint("section_id", { mode: "bigint" }).references(() => SectionTable.id).notNull(),
  warehouseId: bigint("warehouse_id", { mode: "bigint" }).references(() => WarehouseTable.id).notNull(),
  currentQuantity: integer("current_quantity").notNull().default(0),
  lastUpdated: timestamp("last_updated").defaultNow().notNull()
});

