import { Response, Request } from "express";
import { DetailsProductService } from "../services/DetailsProductsService";

class DetailsProductController{
    async handle(request: Request, response: Response){
        const { productId } = request.body

        const detailsProductService = new DetailsProductService()

        const products = await detailsProductService.execute({
            productId
        })

        

        return response.json(products)
    }
}

export { DetailsProductController }