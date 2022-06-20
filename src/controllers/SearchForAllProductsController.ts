import { Response, Request } from "express";
import { SearchForAllProductsService } from "../services/SearchForAllProductsService";

class SearchForAllProductsController{
    async handle(request: Request, response: Response){
        const searchForAllProductsService = new SearchForAllProductsService()

        const products = await searchForAllProductsService.execute()

        return response.json(products)
    }
}

export { SearchForAllProductsController }