import { connect } from "../database/db";

class AccountUserService{
    async execute(user_id: string){
        const Connect = await connect()

        const [ infoAccount ] = await Connect.query(
            `SELECT id, name, email FROM clientes where id = '${user_id}'`
        )

        if(!infoAccount[0]){
            const [ infoAccountPartner ] = await Connect.query(
                `SELECT id_partner, name_partner, email_partner FROM partner where id_partner = '${user_id}'`
            )
            
            console.log(infoAccountPartner[0])
            return infoAccountPartner[0]
        }

        console.log(infoAccount[0])
        return infoAccount[0]
    }
}

export { AccountUserService }