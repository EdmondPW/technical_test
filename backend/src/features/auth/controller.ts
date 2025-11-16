import { Request, Response } from "express";
import { UserInput } from "./schema.zod";
import { login, register } from "./services";
import { StatusCodes } from "http-status-codes";

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, password } = req.body as UserInput;
  try {
    const result = await login({ name, password });
    if (result.ok) {
      res.status(StatusCodes.OK).json(result);
      return;
    }

    res.status(StatusCodes.UNAUTHORIZED).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { password, name } = req.body as UserInput;

  try {
    const result = await register({ name, password });

    if (result.ok) {
      res.status(StatusCodes.CREATED).json(result);
      return;
    }

    res.status(StatusCodes.CONFLICT).json(result);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
  }
};
