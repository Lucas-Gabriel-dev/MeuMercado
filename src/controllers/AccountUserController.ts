import { Request, Response } from "express";
import { AccountUserService } from "../services/AccountUserService";

class AccountUserController {
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const accountUserService = new AccountUserService();

        const infoAccount = await accountUserService.execute(user_id);

        return response.json(infoAccount);
    }
}

export { AccountUserController }