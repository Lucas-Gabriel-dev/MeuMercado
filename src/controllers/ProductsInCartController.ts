import { Request, Response } from "express";
import { ProductsInCartService } from "../services/ProductsInCartService";

class ProductsInCartController{
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const productsInCartService = new ProductsInCartService();

        const ProductsInCart = await productsInCartService.execute(user_id);

        return response.json(ProductsInCart);
    }
}

export { ProductsInCartController }