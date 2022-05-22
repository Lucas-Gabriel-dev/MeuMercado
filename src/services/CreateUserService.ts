import { connect } from "../database/db";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUser {
    id: string;
    async execute({ name, email, admin = false, password }: IUserRequest){
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
            admin
        ];
        
        const sql = `INSERT INTO clientes(id, name, email, password, admin) VALUES ('${this.id}',?,?,?,?);`;
        
        await Connect.query(sql, user);
        
        return  user
    }
}

export { CreateUser };