import { connect } from "../database/db";

class ProductsInCartService{
    async execute( user_id: string ){
        const Connect = await connect()

        if(!user_id){
            throw new Error("User not logged")
        }

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name, image, description, market_name, 
            price, quantity_product, estoque, product_has_market_id
            FROM partner, product, product_has_partner, shopping_cart
            WHERE shopping_cart.cliente_id = '${user_id}' AND
            id_product =  shopping_cart.product_id_product AND
            id_partner =  shopping_cart.partner_id_partner AND
            product_has_partner.product_id_product = shopping_cart.product_id_product AND
            product_has_partner.partner_id_partner =  shopping_cart.partner_id_partner
            ORDER BY shopping_cart.updated_at DESC`
        )

        if(products[0] === undefined){
            throw new Error("Empty Shopping Cart")
        }

        // const [ allProductsInCart ] = await Connect.query(
        //     `SELECT product_name, image, description, market_name, price 
        //     FROM partner, product, product_has_partner
        //     WHERE id_product = `
        // )
        
        return (products)
    }
}

export { ProductsInCartService }