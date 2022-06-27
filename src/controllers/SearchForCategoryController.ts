import { Response, Request } from "express";
import { SearchForCategoryService } from "../services/SearchForCategory";

class SearchForCategoryController{
    async handle(request: Request, response: Response){
        const { product_type } = request.body

        const searchForCategoryService = new SearchForCategoryService()

        const products = await searchForCategoryService.execute({
            product_type
        })

        return response.json(products)
    }
}

export { SearchForCategoryController }