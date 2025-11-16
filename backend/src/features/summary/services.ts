import { db } from "../../db/index";
import { summary } from "../../db/schema/summary.schema";

type summaryResult = {
  ok: boolean;
  data?: object;
  error?: any;
};

export const getAllSummary = async (): Promise<summaryResult> => {
  try {
    const summaryData = await db.select().from(summary);
    return {
      ok: true,
      data: summaryData,
    };
  } catch (error) {
    return {
      ok: false,
      error: error,
    };
  }
};
