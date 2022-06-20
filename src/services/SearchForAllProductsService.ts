import { connect } from "../database/db";

class SearchForAllProductsService{
    async execute(){
        const Connect = await connect()

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name, image, description FROM product`
        )

        if(products[0] === undefined){
            throw new Error("Product not found") 
        }
        
        return (products)
    }
}

export { SearchForAllProductsService }