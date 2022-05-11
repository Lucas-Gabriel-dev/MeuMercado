import { connect } from "../database/db";

interface IUserRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUser {
    async execute({ name, email, admin = false, password }: IUserRequest){
        const Connect = await connect();
        const values = [name, email, password, admin];
        
        const [ rows ] = await Connect.query(`SELECT email FROM clientes WHERE email = '${values[1]}'`);

        if(!email){
            throw new Error("Email incorrect"); 
        }

        if(rows[0] !== undefined){
            console.log(rows[0])
            throw new Error("Email exists")
        }
        
        const sql = 'INSERT INTO clientes(name, email, password, admin) VALUES (?,?,?,?);';
        
        return await Connect.query(sql, values);
    }
}

export { CreateUser };