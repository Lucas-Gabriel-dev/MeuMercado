import { connect } from "../database/db";

interface IAuthenticateUserRequest{
    name: string;
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({name, email, password}: IAuthenticateUserRequest){
        const Connect = await connect()
        const values = [name, email, password]

        const [ user ] = await Connect.query(`SELECT email FROM clientes WHERE email = '${values[1]}'`);

        if(!email){
            throw new Error("Email incorrect"); 
        }

        if(user[0] === undefined){
            console.log(user[0])
            throw new Error("Email or password incorrect")
        }

        const [ passwordUser ] = await Connect.query(
            `SELECT password FROM clientes WHERE email = '${values[1]}' 
            AND password = '${values[2]}' `
        )

        if(passwordUser[0] === undefined){
            throw new Error("Email or password incorrect")
        } 

        return (values);

    }
}

export { AuthenticateUserService };