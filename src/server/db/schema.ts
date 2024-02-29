// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  decimal,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";


/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `debt-tracker_${name}`);

export const posts = createTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

export const company = createTable(
  "company",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    phone: varchar("phone", { length: 15 }),
    webAddress: varchar("webAddress", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const debt = createTable(
  "debt",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    debtType: mysqlEnum("debtType", ["credit", "debit"]).notNull(),
    companyId: bigint("companyId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => company.id),
    isMonthly: boolean("isMonthly").default(false).notNull(),
    amountOwed: decimal("amountOwed", { precision: 19, scale: 2 }).notNull(),
    amountDue: decimal("amountDue", { precision: 19, scale: 2 }).notNull(),
    dueDate: int("dueDate"),
    note: text("note"),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const transactions = createTable(
  "transactions",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement()
      .notNull(),
    name: varchar("debtName", { length: 256 }).notNull(),
    debtId: bigint("debtId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => debt.id),
    companyId: bigint("companyId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => company.id),
    
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);