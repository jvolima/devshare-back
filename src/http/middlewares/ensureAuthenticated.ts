import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../config/auth";
import { AppError } from "../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id_user } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: id_user
    };

    next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }
}