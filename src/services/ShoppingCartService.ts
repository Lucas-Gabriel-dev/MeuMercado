import { createTypePredicateNodeWithModifier } from "typescript";
import { connect } from "../database/db";

interface IShoppingCartRequest{
    user_id: string;
    productId: string;
    partnerId: string;
    quantityProduct: number;
}

class ShoppingCartService{
    async execute({ user_id, productId, partnerId, quantityProduct }: IShoppingCartRequest){
        const Connect = await connect()

        console.log(quantityProduct)
        if(!quantityProduct){
            throw new Error("Quantity products is null")
        }

        if(!user_id){
            throw new Error("User not logged")
        }

        const [ products ] = await Connect.query(
            `SELECT id_shopping_cart, quantity_product FROM shopping_cart
            WHERE cliente_id = '${user_id}' AND
            product_id_product = '${productId}' AND
            partner_id_partner = '${partnerId}'`
        )

        const now = new Date();


        if(products[0] != undefined){
            const addMoreProducts = parseInt(products[0].quantity_product) + quantityProduct
            console.log(now)

            const sql = `UPDATE shopping_cart
            SET quantity_product =' ${addMoreProducts}',
            updated_at = (?)
            WHERE cliente_id = '${user_id}' AND
            partner_id_partner = '${partnerId}' AND
            product_id_product = '${productId}'`;

            await Connect.query(sql, now);

            return [
                user_id,
                productId,
                partnerId,
                addMoreProducts,
                now
            ]
        }

        const user = [
            user_id,
            partnerId,
            productId,
            quantityProduct,
            now
        ];
        
        const sql = `INSERT INTO shopping_cart(cliente_id, partner_id_partner, product_id_product, quantity_product, updated_at) VALUES (?,?,?,?,?);`;
        
        await Connect.query(sql, user);
        
        return (user)
    }
}

export { ShoppingCartService }