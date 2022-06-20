import { connect } from "../database/db";

class AccountPartnerService{
    async execute(user_id: string){
        const Connect = await connect()

        const [ infoAccountPartner ] = await Connect.query(
            `SELECT id_partner, name_partner, email_partner, telephone_partner, cpf_partner, rg_partner,
            market_name, market_telephone, market_cep, market_city, market_estado, 
            market_address, market_number, market_complement
            FROM partner 
            WHERE id_partner = '${user_id}'`
        )
          
        console.log(infoAccountPartner[0])
        return infoAccountPartner[0]
    }
}

export { AccountPartnerService }