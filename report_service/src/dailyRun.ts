import { markAbsenteesAndUpdateSummary } from "./services";

const start = async () => {
  await markAbsenteesAndUpdateSummary();
  console.log("Daily attendance summary done");
  process.exit(0);
};
start();
