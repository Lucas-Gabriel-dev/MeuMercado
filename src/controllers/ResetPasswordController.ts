import { Request, Response } from "express";
import { ResetPasswordService } from "../services/ResetPasswordService";

class ResetPassowordController{
    async handle(request: Request, response: Response){
        const { email, token, newPassword } = request.body;

        const resetPasswordService = new ResetPasswordService();

        const user = await resetPasswordService.execute({
            email,
            token,
            newPassword
        })

        return response.json(user)
    }   
}

export { ResetPassowordController }