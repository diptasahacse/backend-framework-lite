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
  S extends { findAll(params: { page: number; limit: number }): Promise<PaginationResult<T>> }
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
        message: "Data fetched successfully",
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
  
}
