import { Request, Response } from "express";
import { CreateUser } from "../services/CreateUserService";

class CreateUserController {
    async handle(request: Request, response: Response){
        const { 
            id, name, email, admin, password, telephone, birthdate, city, address, district, number, complement, cep, market_logo
        } = request.body;

        const createUser = new CreateUser();

        const user = await createUser.execute({ 
            name, 
            email, 
            admin, 
            password,
            telephone,
            birthdate,
            city,
            address,
            district,
            number,
            complement,
            cep,
            market_logo
        });
        
        return response.json(user);
    }
}

export { CreateUserController }