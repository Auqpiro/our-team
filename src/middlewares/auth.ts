import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
interface LocalRequest extends Request {
  local?: Record<string, unknown>;
}
const jwtAuthCookiesMiddleware = (
  req: LocalRequest,
  res: Response,
  next: NextFunction
) => {
  if (!("token" in req.cookies)) {
    res.status(401).send({ error: "You must be authorised" });
    return;
  }
  const { token }: Record<string, string> = req.cookies;
  const JWT_SECRET: Secret = process.env.JWT_SECRET || "";
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).send({ error: error.message });
      return;
    }
    req.local = { decoded };
    next();
  });
};
export { jwtAuthCookiesMiddleware };
