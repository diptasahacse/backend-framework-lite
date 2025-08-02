export class BaseService<T, K extends keyof T> {
  protected repository: {
    findAll: () => Promise<T[]>;
    findById: (id: T[K]) => Promise<T | undefined>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: T[K], data: Partial<T>) => Promise<T | undefined>;
    delete: (id: T[K]) => Promise<void>;
  };

  constructor(repository: typeof this.repository) {
    this.repository = repository;
  }

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }

  async getById(id: T[K]): Promise<T | undefined> {
    return this.repository.findById(id);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: T[K], data: Partial<T>): Promise<T | undefined> {
    return this.repository.update(id, data);
  }

  async delete(id: T[K]): Promise<void> {
    return this.repository.delete(id);
  }
}
