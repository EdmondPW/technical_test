import { Request, Response } from "express";
import { AttendanceListCheckOutInput } from "./schema.zod";
import { checkout } from "./services";
import { StatusCodes } from "http-status-codes";
import { attendanceQueue } from "../../utils/queue";

export const checkOutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body;

  const input: AttendanceListCheckOutInput = {
    ...body,
    checkOutTime: body.checkOutTime ? new Date(body.checkOutTime) : null,
  };
  console.log(`checkout: ${input.checkOutTime}`);
  try {
    const result = await checkout({
      attendanceId: input.attendanceId,
      userId: input.userId,
      checkOutTime: input.checkOutTime,
    });
    console.log(`checkout: ${result.ok}`);
    if (result.ok) {
      const job = await attendanceQueue.add("event", {
        type: "checkout",
        userId: input.userId,
        attendanceId: input.attendanceId,
      });
      console.log(job);
      await attendanceQueue.close();
      res.status(StatusCodes.ACCEPTED).json(result);
    } else {
      res.status(StatusCodes.CONFLICT).json(result);
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
