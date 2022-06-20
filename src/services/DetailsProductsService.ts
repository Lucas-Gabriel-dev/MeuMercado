import { connect } from "../database/db";

interface IDetailsProductRequest{
    productId: string;
}

class DetailsProductService{
    async execute({ productId}: IDetailsProductRequest){
        const Connect = await connect()

        // const [ products2 ] = await Connect.query(
        //     `SELECT id_product, product_name, type, image, description, partner_id_partner, MIN(price) as price
        //     FROM product, product_has_partner, partner
        //     WHERE 
        //     id_product = ${productId} AND
        //     product_has_partner.product_id_product = id_product AND
        //     id_partner = product_has_partner.partner_id_partner AND
        //     estoque > 0`
        // )

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name, type, image, partner_id_partner, market_name, market_cep, price, description
            FROM product, product_has_partner, partner
            WHERE product.id_product = ${productId} AND
            product_has_partner.product_id_product = ${productId} AND
            partner.id_partner = product_has_partner.partner_id_partner AND
            estoque > 0
            ORDER BY price ASC`
        )

        if(products[0] === undefined){
            throw new Error("Product not found") 
        }
        
        return (products)
    }
}

export { DetailsProductService }