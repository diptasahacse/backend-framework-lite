// src/base/base.service.ts
import { BaseRepository } from "./base.repository";

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export class BaseService<T, K extends keyof T> {
  constructor(protected repository: BaseRepository<T, K>) {}

  async findAll(paginationOptions?: PaginationOptions) {
    const page = paginationOptions?.page ?? 1;
    const limit = paginationOptions?.limit ?? 10;

    const { data, total } = await this.repository.findAll({ page, limit });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: T[K]) {
    return this.repository.findById(id);
  }

  async create(data: Partial<T>) {
    return this.repository.create(data);
  }

  async update(id: T[K], data: Partial<T>) {
    return this.repository.update(id, data);
  }

  async delete(id: T[K]) {
    return this.repository.delete(id);
  }
}
