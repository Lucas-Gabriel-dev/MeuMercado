import { connect } from "../database/db";

class ListAllProductsService{
    async execute(){
        const Connect = await connect()

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name, image,
            description, type, weight FROM product
            ORDER BY product_name ASC`
        )

        if(products[0] === undefined){
            throw new Error("Product not found") 
        }
        
        return (products)
    }
}

export { ListAllProductsService }