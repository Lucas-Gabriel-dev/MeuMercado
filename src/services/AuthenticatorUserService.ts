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

        const [ user ]  = await Connect.query(`SELECT id, id_partner, email, email_partner, 
        password, password_partner
        FROM clientes, partner 
        WHERE email = '${email}' OR email_partner = '${email}'`);

        if(user[0] === undefined){
            throw new Error("Email or password incorrect"); 
        }

        const passwordMatchClient = await compare(password, user[0].password)
       
        if(passwordMatchClient){
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

        const passwordMatchPartner = await compare(password, user[0].password_partner)

        if(passwordMatchPartner){
            const token = sign(
                {
                    email: user[0].email_partner
                },
                "d52ad414321b29c436c538ecf1766225",
                {
                    subject: user[0].id_partner,
                    expiresIn: "1d"
                }
            )

            return (token);
        } 
    
        throw new Error("Email or password incorrect")
    }
}

export { AuthenticateUserService };