import "dotenv/config";
import logger from "./utils/logger";
import sequelize from "./data-access/db";
import createServer from "./utils/server";

const PORT = process.env.PORT;

const app = createServer();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app
      .listen(PORT, () => {
        logger.info("app is running on the port ", PORT);
      })
      .on("error", (error) => {
        logger.error(error);
        process.exit(1);
      });
  }
 catch (error) {
    console.log(error);
  }
};

start();

export default app;
