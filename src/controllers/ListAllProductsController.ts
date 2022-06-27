import { Response, Request } from "express";
import { ListAllProductsService } from "../services/ListAllProductsService";

class ListAllProductsController{
    async handle(request: Request, response: Response){
        const listAllProductsService = new ListAllProductsService()

        const products = await listAllProductsService.execute()

        return response.json(products)
    }
}

export { ListAllProductsController }