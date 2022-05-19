import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticatorUserService";

class AuthenticateUserController{
    async handle(request: Request, response: Response){
        const { name, email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({ 
            name,
            email, 
            password 
        })

        return response.json(token)
    }
}

export { AuthenticateUserController }