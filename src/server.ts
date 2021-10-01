import app from "./app";
import {
  errorHandler,
  notFoundErrorHandler,
} from "./middlewars/apiErrorHandler";
import { config } from "dotenv";
config();

(() => {
  app.use(errorHandler);
  app.use(notFoundErrorHandler);
  const PORT: number | string = process.env.PORT;
  app
    .listen(PORT, () => {
      console.log("##########################################################");
      console.log("#####               STARTING SERVER                  #####");
      console.log(
        "##########################################################\n"
      );
      console.log(`Server running → PORT ${PORT}`);
    })
    .on("error", (e) => {
      console.error(e);
    });
})();
