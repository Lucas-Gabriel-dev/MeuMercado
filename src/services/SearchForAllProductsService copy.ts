import { connect } from "../database/db";

class SearchForAllProductsService{
    async execute(){
        const Connect = await connect()

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name, image, price,
            description FROM product, product_has_partner
            WHERE product_has_partner.product_id_product = id_product
            ORDER BY price ASC`
        )

        if(products[0] === undefined){
            throw new Error("Product not found") 
        }
        
        return (products)
    }
}

export { SearchForAllProductsService }