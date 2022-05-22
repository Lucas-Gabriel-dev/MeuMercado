import { connect } from "../database/db";

class AccountUserService{
    async execute(user_id: string){
        const Connect = await connect()

        const [ infoAccount ] = await Connect.query(
            `SELECT id, name, email FROM clientes where id = '${user_id}'`
        )

        console.log(infoAccount[0])
        return infoAccount[0]
    }
}

export { AccountUserService }