import { connect } from "../database/db";
import { v4 as uuid } from "uuid";


interface ICustomerOrderRequest{
    user_id: string;
    partner_id: string;
    id_product: string;
    quantity: number;
    value_total: number;
}


class CustomerOrderService{
    id: string;
    async execute({ user_id, partner_id, id_product, quantity, value_total}: ICustomerOrderRequest){
        const Connect = await connect()

        if(user_id === undefined){
            throw new Error("User not logged")
        }

        if(id_product === undefined){
            console.log(id_product) 
            throw new Error("Product not found")
        }

        if(quantity === undefined){
            console.log(id_product) 
            throw new Error("Quantity is null")
        }

        for(let i = 0; i < id_product.length; i++){
            const [ selectEstoque ] = await Connect.query(
                `SELECT estoque FROM product_has_partner
                WHERE partner_id_partner = '${partner_id}' AND
                product_id_product = '${id_product[i]}'`
            )

            if(selectEstoque[0].estoque <= 0 || selectEstoque[0].estoque < quantity[i]){
                throw new Error(`Product id: ${id_product[i]} not available`)
            }
        }

        if(!this.id){
            this.id = uuid()
        }

        const now = new Date();

        const newRequest = `INSERT INTO customer_orders(id_customer_orders, 
            clientes_id, partner_id_partner, value_total, created_at)
            VALUES ('${this.id}','${user_id}','${partner_id}','${value_total}',?)`
        await Connect.query(newRequest, now);
        
        for(let i = 0; i < id_product.length; i++){
            console.log(id_product.length)

            const [ selectInfoProducts ] = await Connect.query(
            `SELECT price, estoque FROM product_has_partner
            WHERE partner_id_partner = '${partner_id}' AND
            product_id_product = '${id_product[i]}'`
            )
            
            const newEstoque =  parseInt(selectInfoProducts[0].estoque) - quantity[i] 

            const purchasedProducts = `INSERT INTO customer_orders_was_product(id_customer_orders,
            id_product, price_product, quantity)
            VALUES ('${this.id}','${id_product[i]}','${selectInfoProducts[0].price}','${quantity[i]}')`

            console.log("Lucas")

            await Connect.query(purchasedProducts);    

            await Connect.query(
            `UPDATE product_has_partner
            SET estoque = '${newEstoque}'
            WHERE partner_id_partner = '${partner_id}' AND
            product_id_product = '${id_product[i]}'`
            );
            
        }
        return (console.log("Oi"))
    }
}

export { CustomerOrderService }