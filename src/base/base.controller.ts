import { errorResponse, successResponse } from "@/utils/response";
import { Request, Response } from "express";

export class BaseController<T, K extends keyof T> {
  protected service: {
    getAll: () => Promise<T[]>;
    getById: (id: T[K]) => Promise<T | undefined>;
    create: (data: Partial<T>) => Promise<T>;
    update: (id: T[K], data: Partial<T>) => Promise<T | undefined>;
    delete: (id: T[K]) => Promise<void>;
  };

  constructor(service: typeof this.service) {
    this.service = service;
  }

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.service.getAll();
      return successResponse(res, data);
    } catch (err) {
      return errorResponse(res, err);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as any;
      const data = await this.service.getById(id);
      if (!data) return errorResponse(res, "Not found", 404);
      return successResponse(res, data);
    } catch (err) {
      return errorResponse(res, err);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.service.create(req.body);
      return successResponse(res, data, 201);
    } catch (err) {
      return errorResponse(res, err);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as any;
      const data = await this.service.update(id, req.body);
      if (!data) return errorResponse(res, "Not found", 404);
      return successResponse(res, data);
    } catch (err) {
      return errorResponse(res, err);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as any;
      await this.service.delete(id);
      return successResponse(res, { message: "Deleted successfully" });
    } catch (err) {
      return errorResponse(res, err);
    }
  };
}
