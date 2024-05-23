import { Request, Response, Next } from "./types"

const {NODE_ENV} = process.env
import winston from "winston";

const level = NODE_ENV === "test" ? "debug" : "info";

export const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp({ format: "ddd, DD MMM YYYY HH:mm:ss" }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()} ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "info.log",
      level,
    }),
  ],
});

export const responseInterceptor = (
  req: Request,
  res: Response,
  next: Next
) => {
  const startTime = new Date().getMilliseconds();
  res.on("finish", () => {
    const endTime = new Date().getMilliseconds();
    const time = endTime - startTime;
    const message = `${req.method} ${req.originalUrl} - ${time}ms`
    if (res.statusCode < 400) {
      logger.info(message);
    } else {
      logger.error(message);
    }
  });
  next();
};