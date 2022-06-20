import { Request, Response } from "express";
import { AccountPartnerService } from "../services/AccountPartnerService";

class AccountPartnerController {
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const accountPartnerService = new AccountPartnerService();

        const infoAccount = await accountPartnerService.execute(user_id);

        return response.json(infoAccount);
    }
}

export { AccountPartnerController }