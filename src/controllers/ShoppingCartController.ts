import { Request, Response } from "express";
import { ShoppingCartService } from "../services/ShoppingCartService";

class ShoppingCartController{
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const { productId, partnerId, quantityProduct } = request.body

        const shoppingCartService = new ShoppingCartService();

        const newProductsInCart = await shoppingCartService.execute({
            user_id,
            productId,
            partnerId,
            quantityProduct
        });

        return response.json(newProductsInCart);
    }
}

export { ShoppingCartController }