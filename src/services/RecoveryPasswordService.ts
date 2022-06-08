import { connect } from "../database/db";
import crypto from "crypto"
import { transporter } from "../modules/mailer";
import fs from "fs"
import handlebars from "handlebars"
import path from "path";


interface IUserNewPasswordRequest{
    email: string;
}

class RecoveryPasswordService{
    async execute({email}: IUserNewPasswordRequest){
        const Connect = await connect()

        const [ rows ]  = await Connect.query(`SELECT name, email, id FROM clientes WHERE email = '${email}'`);

        if(rows[0] === undefined){
            throw new Error("Email invalid"); 
        }

        const token = crypto.randomBytes(20).toString('hex')
        
        const now = new Date();
        now.setHours(now.getHours() + 1)

        console.log(token, now)

        const user = [ 
            token,
            now
        ];

        console.log(rows)
        
        const sql = 
        `UPDATE clientes
        SET passwordResetToken = (?),
        passwordResetExpires = (?)
        WHERE clientes.id = '${rows[0].id}';`;
        
        await Connect.query(sql, user);

        /* Send of email */
        const filePath = path.join(__dirname, '../resources/mail/auth/forgot_password.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            name: rows[0].name,
            token: token
        };
        const htmlToSend = template(replacements);
            
        transporter.sendMail({
            from: 'lucas.silva_9090@hotmail.com',
            to: email,
            subject: "Troca de senha MeuMercado",
            html: htmlToSend
        })
    

        return console.log("Email enviado")
    }
}

export { RecoveryPasswordService }