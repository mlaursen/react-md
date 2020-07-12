/* eslint-disable no-console */
import path from "path";
import { parse } from "url";
import next from "next";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds
const PUBLIC = path.join(process.cwd(), "public");

nextApp.prepare().then(() => {
  const app = express();
  app.use(helmet());
  app.use(hpp());
  if (!dev) {
    app.use(morgan("combined"));
  }
  app.use(express.static(PUBLIC, { maxAge: CACHE_DURATION }));

  app.get("*", cookieParser(), (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
