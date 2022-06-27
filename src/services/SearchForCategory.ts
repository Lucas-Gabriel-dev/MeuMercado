import { connect } from "../database/db";

interface ISearchForCategoryRequest{
    product_type: string;
}

class SearchForCategoryService{
    async execute({ product_type }: ISearchForCategoryRequest){
        const Connect = await connect()

        const [ products ] = await Connect.query(
            `SELECT id_product, product_name, type, image, MIN(price) as price
            FROM product, partner, product_has_partner
            WHERE 
            product_has_partner.product_id_product = id_product AND
            product.type = '${product_type}' AND
            estoque > 0
            GROUP BY product_has_partner.product_id_product`
        )

        if(products[0] === undefined){
            throw new Error("Product not found") 
        }
        
        
        return (products)
    }
}

export { SearchForCategoryService }