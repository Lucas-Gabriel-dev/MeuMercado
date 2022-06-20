import { connect } from "../database/db";

interface IAddProductsAtMarketRequest{
    user_id: string;
    id_product: string;
    estoque: number;
    price: number;
}

class AddProductsAtMarketService{
    async execute({ id_product, estoque, price, user_id}: IAddProductsAtMarketRequest){
        const Connect = await connect()

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name
            FROM product
            WHERE id_product = '${id_product}'`
        )

        if(products[0] === undefined){
            console.log(id_product) 
            throw new Error("Product not found")
        }

        const [ alterInfoProducts ] = await Connect.query(
            `SELECT product_id_product, partner_id_partner, price, estoque
            FROM product_has_partner
            WHERE product_id_product = '${products[0].id_product}' AND
            partner_id_partner = '${user_id}'`
        )

        if(alterInfoProducts[0]){
            const newvalues = [
                products[0].product_name,
                products[0].id_product,
                price,
                estoque
            ]

            await Connect.query(`UPDATE product_has_partner
            SET estoque = '${estoque}', price = '${price}'
            WHERE partner_id_partner = '${user_id}' AND
            product_id_product = '${products[0].id_product}'`);

            console.log("Lucas")

            return (newvalues)
        }

        const user = [
            products[0].id_product,
            user_id,
            estoque,
            price
        ];

        
        const sql = `INSERT INTO product_has_partner(product_id_product, partner_id_partner, estoque, price) VALUES (?,?,?,?);`;
        
        await Connect.query(sql, user);
        
        return (user)
    }
}

export { AddProductsAtMarketService }