import { Request, Response } from "express";

type PaginationQuery = {
  page?: string;
  limit?: string;
};

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}

interface PaginationResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export class BaseController<
  T,
   S extends {
    findAll(params: { page: number; limit: number }): Promise<PaginationResult<T>>;
    findById(id: any): Promise<T | undefined>;
    create(data: Partial<T>): Promise<T>;
    update(id: any, data: Partial<T>): Promise<T | undefined>;
    delete(id: any): Promise<void>;
  }
> {
  constructor(protected service: S) {}

  findAll = async (req: Request, res: Response) => {
    try {
      const { page = "1", limit = "10" } = req.query as PaginationQuery;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const { data, meta } = await this.service.findAll({
        page: pageNum,
        limit: limitNum,
      });

      const { total, lastPage } = meta;
      const from = total === 0 ? 0 : (pageNum - 1) * limitNum + 1;
      const to = Math.min(pageNum * limitNum, total);

      res.status(200).json({
        success: true,
        // message: "Data fetched successfully",
        data,
        pagination: {
          current_page: pageNum,
          from,
          last_page: lastPage,
          per_page: limitNum,
          to,
          total,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: (error as Error).message,
      });
    }
  };
  findById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const item = await this.service.findById(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `Item with id ${id} not found`,
        });
      }

      res.status(200).json({
        success: true,
        // message: "Item found",
        data: item,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: (error as Error).message,
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data: Partial<T> = req.body;
      const createdItem = await this.service.create(data);

      res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: createdItem,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create item",
        error: (error as Error).message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data: Partial<T> = req.body;

      const updatedItem = await this.service.update(id, data);

      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: `Item with id ${id} not found`,
        });
      }

      res.status(200).json({
        success: true,
        message: "Item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update item",
        error: (error as Error).message,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await this.service.delete(id);

      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete item",
        error: (error as Error).message,
      });
    }
  };
}
