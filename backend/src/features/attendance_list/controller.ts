import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAttendanceListByAttendanceId } from "./services";

export async function getAttendanceListByAttendanceIdController(
  req: Request,
  res: Response
): Promise<void> {
  const rawId = req.params.attendanceId;
  const attendanceId = Number(rawId);

  if (!rawId || Number.isNaN(attendanceId)) {
    res.status(StatusCodes.BAD_REQUEST).json({
      ok: false,
      message: "Invalid attendance Id parameter",
    });
    return;
  }

  try {
    const list = await getAttendanceListByAttendanceId(attendanceId);

    if (!list || list.length === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        ok: false,
        message: "No attendance list found for the given attendance Id",
        data: [],
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      ok: true,
      data: list,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      message: "Internal server error",
      error: (err as any)?.message ?? String(err),
    });
  }
}
