import express from "express";
import bp from "body-parser";
import morgan from "morgan";

import urlRouter from "./url/router.js";

const app = express();

app.use(morgan("dev"));

app.use(bp.urlencoded({ extended: true }));

app.use("/api", urlRouter);

app.use((req, res) => {
  res.status(404).send("Oops... The page you are looking for is elsewhere");
});

const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
};

app.use(clientErrorHandler);

export default app;
