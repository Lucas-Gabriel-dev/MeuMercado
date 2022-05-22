import { connect } from "../database/db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateUserRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({ email, password }: IAuthenticateUserRequest){
        const Connect = await connect()

        const [ user ]  = await Connect.query(`SELECT * FROM clientes WHERE email = '${email}'`);

        if(user[0] === undefined){
            throw new Error("Email or password incorrect"); 
        }

        const passwordMatch = await compare(password, user[0].password)

        if(!passwordMatch){
            throw new Error("Email or password incorrect")
        } 

        const token = sign(
            {
                email: user[0].email
            },
            "d52ad414321b29c436c538ecf1766225",
            {
                subject: user[0].id,
                expiresIn: "1d"
            }
        )

        return (token);

    }
}

export { AuthenticateUserService };