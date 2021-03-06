import { connect } from "../database/db";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
    telephone: string;
    birthdate: Date;
    city: string;
    address: string;
    district: string;
    number: string;
    complement: string;
    cep: string;
    market_logo: Blob
}

class CreateUser {
    id: string;
    async execute({ 
        name, email, admin = false, password, telephone, birthdate, city, 
        address, district, number, complement, cep, market_logo
    }: IUserRequest){
        const Connect = await connect();
        
        if(!email){
            throw new Error("Email incorrect"); 
        }

        const [ rows ] = await Connect.query(`SELECT email FROM clientes WHERE email = '${email}'`);
        
        if(rows[0] !== undefined){
            console.log(rows[0])
            throw new Error("Email exists")
        }
        
        if(!this.id){
            this.id = uuid()
        }
        
        const passwordHash = await hash(password, 8)

        const user = [
            name, 
            email, 
            password = passwordHash, 
            admin,
            telephone,
            birthdate,
            city,
            address,
            district,
            number,
            complement,
            cep,
            market_logo
        ];
        
        const sql = `INSERT INTO clientes(id, name, email, password, admin, telephone, birthdate, city, address, district, number, complement, cep, market_logo) 
        VALUES ('${this.id}',?,?,?,?,?,?,?,?,?,?,?,?,?);`;
        
        await Connect.query(sql, user);

        const [ newUser ]  = await Connect.query(`SELECT id, email, password
        FROM clientes
        WHERE email = '${email}'`);

        const token = sign(
            {
                email: newUser[0].email
            },
            "d52ad414321b29c436c538ecf1766225",
            {
                subject: newUser[0].id,
                expiresIn: "1d"
            }
        )

        return (token);
    }
}

export { CreateUser };