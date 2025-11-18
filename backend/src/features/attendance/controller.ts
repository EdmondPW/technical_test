import { Request, Response } from "express";
import {
  getAllAttendance,
  getTodayAttendance,
  getAttendanceById,
} from "./services";

export async function getAllAttendanceController(req: Request, res: Response) {
  try {
    const data = await getAllAttendance();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Error fetching attendance:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getTodayAttendanceController(
  req: Request,
  res: Response
) {
  try {
    // const today = new Date().toISOString().split("T")[0];

    const data = await getTodayAttendance();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Error fetching today's attendance:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getAttendanceByIdController(req: Request, res: Response) {
  try {
    const attendanceId = Number(req.params.id);

    if (isNaN(attendanceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance ID",
      });
    }

    const data = await getAttendanceById(attendanceId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("Error fetching attendance by ID:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
