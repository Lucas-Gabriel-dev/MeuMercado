import { connect } from "../database/db";

interface ISearchProductsRequest{
    name: string;
}

class SearchProductsService{
    async execute({ name }: ISearchProductsRequest){
        const Connect = await connect()

        const [ products ] = await Connect.query(
            `SELECT * FROM product WHERE name LIKE '%${name.split(" ")[0]}%' || type LIKE '%${name}%'`
        )

        if(products[0] === undefined){
            throw new Error("Product not found") 
        }

        console.log(name.split(" "))

        
        return (products)
    }
}

export { SearchProductsService }