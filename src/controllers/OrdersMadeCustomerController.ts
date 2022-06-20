import { Request, Response } from "express";
import { OrdersMadeCustomerService } from "../services/OrdersMadeCustomerService";

class OrdersMadeCustomerController{
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const ordersMadeCustomerService = new OrdersMadeCustomerService();

        const clientRequests = await ordersMadeCustomerService.execute(user_id)

        return response.json(clientRequests)
    }
}

export { OrdersMadeCustomerController }