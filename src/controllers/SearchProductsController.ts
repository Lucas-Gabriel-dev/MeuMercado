import { Response, Request } from "express";
import { SearchProductsService } from "../services/SearchProductsService";

class SearchProductsController{
    async handle(request: Request, response: Response){
        const { name } = request.body

        const searchProductsService = new SearchProductsService()

        const products = await searchProductsService.execute({
            name
        })

        

        return response.json(products)
    }
}

export { SearchProductsController }