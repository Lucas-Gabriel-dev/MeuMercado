import { Request, Response } from "express";
import { ProductsOfMarketService } from "../services/ProductsOfMarketService";

class ProductsOfMarketController{
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const productsOfMarketService = new ProductsOfMarketService();

        const infoAccount = await productsOfMarketService.execute(user_id);

        return response.json(infoAccount);
    }
}

export { ProductsOfMarketController }