import { connect } from "../database/db";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";


interface IPartnerMarketRequest{
    name: string;
    email: string;
    password: string;
    telephone: string;
    cpf: string;
    rg: string;
    orgaoEmissor: string;
    cnpj: string;
    market_name: string;
    market_telephone: string;
    market_cep: string;
    market_city: string;
    market_estado: string;
    market_address: string;
    market_number: string;
    market_complement: string;
}

class RegisterPartnerAndMarketService{
    id: string;
    async execute({ 
        name, email, password, telephone, cpf, rg, orgaoEmissor, 
        cnpj, market_name, market_telephone, market_cep, market_city, 
        market_estado, market_address, market_number, market_complement
    }: IPartnerMarketRequest){
        const Connect = await connect();
        
        if(!email){
            throw new Error("Email incorrect"); 
        }

        const [ rows ] = await Connect.query(`SELECT email, email_partner FROM clientes, partner WHERE email = '${email}' OR email_partner = '${email}'`);
        
        if(rows[0] !== undefined){
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
            telephone,
            cpf, 
            rg, 
            orgaoEmissor,
            cnpj,
            market_name,
            market_telephone,
            market_cep,
            market_city,
            market_estado,
            market_address,
            market_number,
            market_complement
        ];
        
        const sql = `INSERT INTO partner(id_partner, name_partner, email_partner, password_partner, telephone_partner, cpf_partner, rg_partner, 
            orgao_emissor, cnpj, market_name, market_telephone, market_cep, 
            market_city, market_estado, market_address, market_number, market_complement) VALUES ('${this.id}',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;
        
        await Connect.query(sql, user);

        const [ newUser ]  = await Connect.query(`SELECT id_partner, email_partner, 
        password_partner
        FROM partner 
        WHERE email_partner = '${email}'`);

        const token = sign(
            {
                email: newUser[0].email_partner
            },
            "d52ad414321b29c436c538ecf1766225",
            {
                subject: newUser[0].id_partner,
                expiresIn: "1d"
            }
        )

        

        return (token);
    }
}

export { RegisterPartnerAndMarketService };