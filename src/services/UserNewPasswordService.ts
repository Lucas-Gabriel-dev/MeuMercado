import { connect } from "../database/db";

interface IUserNewPasswordRequest{
    email: string;
    password: string;
}

class UserNewPasswordService{
    async execute({email}: IUserNewPasswordRequest){
        const Connect = await connect()

        const [ user ]  = await Connect.query(`SELECT email FROM clientes WHERE email = '${email}'`);

        if(user[0] === undefined){
            throw new Error("Email invalid"); 
        }

        

    }
}