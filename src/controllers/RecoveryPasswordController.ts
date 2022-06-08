import { Request, Response } from "express";
import { RecoveryPasswordService } from "../services/RecoveryPasswordService";


class RecoveryPasswordController{
    async handle(request: Request, response: Response){
        const { email } = request.body;

        const recoveryPasswordService = new RecoveryPasswordService();

        const user = await recoveryPasswordService.execute({
            email
        })

        return response.json(user)
    }
}

export { RecoveryPasswordController }

