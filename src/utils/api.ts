import type { NextApiRequest, NextApiResponse } from "next";
import {
  BadRequestError,
  CustomError,
  InternalServerError,
  StatusCode,
} from "./errors";

export type HttpMethod = "GET" | "PATCH" | "PUT" | "POST" | "DELETE";
export type HttpMethods = readonly HttpMethod[];
export type AsyncNextHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;
export type CustomNextHandler = (handler: AsyncNextHandler) => AsyncNextHandler;

const DEFAULT_ALLOWED_METHODS: HttpMethods = ["GET"];

export const createNextHandler =
  (methods: HttpMethods = DEFAULT_ALLOWED_METHODS): CustomNextHandler =>
  (handler) =>
  async (req, res) => {
    if (!methods.includes((req.method ?? "") as HttpMethod)) {
      res.setHeader("Allow", methods);
      res.status(StatusCode.MethodNotAllowed).end();
      return;
    }

    try {
      await handler(req, res);
    } catch (e) {
      if (e instanceof BadRequestError) {
        const { status, reason, message } = e;
        if (reason) {
          res.status(status).json({ reason });
        } else {
          res.status(status).send(message);
        }

        return;
      }

      if (e instanceof CustomError) {
        res.status(e.status).send(e.message);
        return;
      }

      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(e);
      }

      const error = new InternalServerError();
      res.status(error.status).send(error.message);
    }
  };
