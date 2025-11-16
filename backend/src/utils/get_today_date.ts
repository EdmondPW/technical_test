export const getTodayDateString = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};
