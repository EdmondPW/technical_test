import { Request, Response } from "express";
import { AttendanceListCheckInInput } from "./schema.zod";
import { checkin } from "./services";
import { StatusCodes } from "http-status-codes";
import { attendanceQueue } from "../../utils/queue";

export const checkInController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body;

  const input: AttendanceListCheckInInput = {
    ...body,
    checkInTime: body.checkInTime ? new Date(body.checkInTime) : null,
  };
  console.log(input.checkInTime);
  try {
    const result = await checkin({
      attendanceId: input.attendanceId,
      userId: input.userId,
      checkInTime: input.checkInTime,
    });
    if (result.ok) {
      const job = await attendanceQueue.add("event", {
        type: "checkin",
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
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
