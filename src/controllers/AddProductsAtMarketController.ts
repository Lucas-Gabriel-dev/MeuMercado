import { Request, Response } from "express";
import { AddProductsAtMarketService } from "../services/AddProductsAtMarketService";

class AddProductsAtMarketController {
    async handle(request: Request, response: Response){
        const { user_id } = request
        const { id_product, estoque, price } = request.body;

        const addProductsAtMarketService = new AddProductsAtMarketService();

        const ProductAdd = await addProductsAtMarketService.execute({
            user_id,
            id_product,
            estoque,
            price
        });

        return response.json(ProductAdd);
    }
}

export { AddProductsAtMarketController }