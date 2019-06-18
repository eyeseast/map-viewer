import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";

const {
  PORT,
  NODE_ENV,
  MAPBOX_PUBLIC_TOKEN,
  MAPBOX_SECRET_TOKEN,
  DEFAULT_USERNAME
} = process.env;

const dev = NODE_ENV === "development";

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => ({
        MAPBOX_PUBLIC_TOKEN,
        MAPBOX_SECRET_TOKEN,
        DEFAULT_USERNAME
      })
    })
  )
  .listen(PORT, err => {
    if (err) console.log("error", err);
  });
