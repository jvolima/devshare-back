import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body || 
    request.headers["x-access-token"] || 
    request.query.refresh_token;
    
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const data = await refreshTokenUseCase.execute(refresh_token);

    return response.json(data);
  }
}

export { RefreshTokenController }