import { connect } from "../database/db";

class OrdersMadeCustomerService{
    id: string;
    async execute( user_id: string){
        const Connect = await connect()

        const [ clientRequests ] = await Connect.query(
        `SELECT product.product_name, partner.market_name, customer_orders.created_at, 
        customer_orders.id_customer_orders, customer_orders_was_product.price, quantity
        FROM product, partner, customer_orders, customer_orders_was_product
        WHERE customer_orders.clientes_id = '${user_id}' AND
        product.id_product =  customer_orders_was_product.id_product AND
        partner.id_partner = customer_orders.partner_id_partner AND
        customer_orders_was_product.id_customer_orders = customer_orders.id_customer_orders`
        )

        if(!clientRequests[0]){
            throw new Error("No orders placed")
        }

        return clientRequests
    }
}

export { OrdersMadeCustomerService }