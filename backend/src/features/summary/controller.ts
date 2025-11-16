import { Request, Response } from "express";
import { getAllSummary } from "./services";
import { StatusCodes } from "http-status-codes";

export const summaryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllSummary();
    if (result.ok) {
      res.status(StatusCodes.ACCEPTED).json(result);
    } else {
      res.status(StatusCodes.BAD_REQUEST).json(result);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
