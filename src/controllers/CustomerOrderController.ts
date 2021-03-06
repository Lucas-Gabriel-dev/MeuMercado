import { Request, Response } from "express";
import { CustomerOrderService } from "../services/CustomerOrdersService";

class CustomerOrderController{
    async handle(request: Request, response: Response){
        const { user_id } = request
        const { partner_id, id_product, quantity, value_total } = request.body;

        const customerOrderService = new CustomerOrderService();

        const purchasedProducts = await customerOrderService.execute({
            user_id,
            partner_id,
            id_product,
            quantity,
            value_total
        });

        return response.json(purchasedProducts);
    }
}

export { CustomerOrderController }