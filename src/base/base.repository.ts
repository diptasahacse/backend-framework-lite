// src/base/base.repository.ts
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export class BaseRepository<T, K extends keyof T> {
  constructor(protected table: any, protected primaryKey: K) {}

  async findAll(): Promise<T[]> {
    return db.select().from(this.table);
  }

  async findById(id: T[K]): Promise<T | undefined> {
    const [item] = await db
      .select()
      .from(this.table)
      .where(eq(this.table[this.primaryKey], id));
    return item;
  }

  async create(data: Partial<T>): Promise<T> {
    const result = await db.insert(this.table).values(data).returning();
    return (result as T[])[0];
  }

  async update(id: T[K], data: Partial<T>): Promise<T | undefined> {
    const [item] = await db
      .update(this.table)
      .set(data)
      .where(eq(this.table[this.primaryKey], id))
      .returning();
    return item;
  }

  async delete(id: T[K]): Promise<void> {
    await db.delete(this.table).where(eq(this.table[this.primaryKey], id));
  }
}
