import { markAbsenteesAndUpdateSummary } from "./services";

const start = async () => {
  await markAbsenteesAndUpdateSummary();
  console.log("Daily attendance summary done");
  process.exit(0);
};

setInterval(async () => start, 3600000);

start();

console.log("daily status check is start.");
