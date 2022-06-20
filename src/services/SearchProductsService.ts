import { connect } from "../database/db";

interface ISearchProductsRequest{
    name: string;
}

class SearchProductsService{
    async execute({ name }: ISearchProductsRequest){
        const Connect = await connect()

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name, type, image, MIN(price) as price
            FROM product, product_has_partner
            WHERE 
            product_has_partner.product_id_product = id_product AND
            product_name LIKE '%${name.split(" ")[0]}%' AND
            estoque > 0
            GROUP BY product_has_partner.product_id_product`
        )

        if(products[0] === undefined){
            throw new Error("Product not found") 
        }
        
        
        return (products)
    }
}

export { SearchProductsService }