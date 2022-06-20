import { connect } from "../database/db";

class ProductsOfMarketService{
    async execute(user_id: string){
        const Connect = await connect()

        const [ products ] = await Connect.query(`SELECT pdt.id_product, pdt.product_name, pdt.type,
        pdt.image, pdt.weight, php.partner_id_partner, php.price, php.estoque, php.price
        FROM bd_forms.product pdt
        INNER JOIN bd_forms.product_has_partner php ON pdt.id_product = php.product_id_product
        WHERE php.partner_id_partner = '${user_id}'`);
       
        if(products[0] === undefined){
            throw new Error("Product not found") 
        }
        
        return (products)
    }
}

export { ProductsOfMarketService }
