import { Request, Response } from "express";
import { RegisterPartnerAndMarketService } from "../services/RegisterPartnerAndMarketService";


class RegisterPartnerUserController{
    async handle(request: Request, response: Response){
        const { 
            name, email, password, telephone, cpf, rg, orgaoEmissor,
            cnpj, market_name, market_telephone, market_cep, market_city, 
            market_estado, market_address, market_number, market_complement
        } = request.body;

        

        const registerPartnerAndMarketService = new RegisterPartnerAndMarketService();

        const user = await registerPartnerAndMarketService.execute({ 
            name,
            email,
            password,
            telephone,
            cpf,
            rg,
            orgaoEmissor,
            cnpj,
            market_name,
            market_telephone,
            market_cep,
            market_city,
            market_estado,
            market_address,
            market_number,
            market_complement
        });
        
        return response.json(user);
    }
}

export { RegisterPartnerUserController }