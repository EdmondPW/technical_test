import app from "./app";
import config from "./config/config";

app.listen(config.PORT, () => {
  console.log(`Server running in ${config.NODE_ENV} on port ${config.PORT}`);
});
