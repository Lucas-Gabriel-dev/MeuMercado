import { hash } from "bcryptjs";
import { connect } from "../database/db";

interface IUResetPassword{
    email: string,
    token: string,
    newPassword: string;
}

class ResetPasswordService{
    async execute({email, token, newPassword}: IUResetPassword){
        const Connect = await connect()

        const [ rows ]  = await Connect.query(`SELECT * FROM clientes WHERE email = '${email}'`);


        if(rows[0] === undefined){
            throw new Error("Email or password invalid"); 
        }

        if(token !== rows[0].passwordResetToken){
            throw new Error("Token Invalid")
        }

        const now = new Date();

        if(now > rows[0].passwordResetExpires){
            throw new Error("Token expired")
        }

        const passwordHash = await hash(newPassword, 8)

        const sql = 
        `UPDATE clientes
        SET password = '${passwordHash}'
        WHERE id = '${rows[0].id}'`

        await Connect.query(sql);
    }
}

export { ResetPasswordService }