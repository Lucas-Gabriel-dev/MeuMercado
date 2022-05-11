import { Request, Response } from "express";
import { CreateUser } from "../services/CreateUserService";

class CreateUserController {
    async handle(request: Request, response: Response){
        const { name, email, admin, password } = request.body;

        const createUser = new CreateUser();

        const user = await createUser.execute({ name, email, admin, password });
        
        return response.json(user);
    }
}

export { CreateUserController }