import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator/check";
import { CreateRecords } from "./service/createRecords.service";

const app = express();
const port = 8080;

app.get(
  "/cname",
  check("target").isString(),
  check("destination").isURL(),
  check("usePath").isBoolean(),
  (req: Request, res: Response, next: NextFunction) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      res.status(400).json({
        error: validation.array(),
      });
      return;
    }

    next();
  },
  (req: Request, res: Response) => {
    const { target, destination, usePath } = req.query;

    const result =
      new CreateRecords({
        target,
        destination,
        usePath: usePath === "true" || usePath === "1",
      });

    res.status(200).json({
      result,
    });
  }
);

app.all("*", (req: Request, res: Response) => {
  res.status(404).send(`Cannot ${req.method} ${req.path}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));