import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"; 
import cors from "cors";
import nodemailer from "nodemailer"

import { router } from "./routes";

import "./database";


const app = express();

app.use(cors())
app.use(express.json());
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof Error){
            return response.status(400).json({
                error: err.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    } 
)

// router.get("/sendemail", async (req: Request, res: Response) => {
//     const transporter = nodemailer.createTransport({
//         service: 'Hotmail',
//         auth: {
//         user: 'lucas.silva_9090@hotmail.com',
//         pass: 'gabriel5656'
//         }
//     })

//     const email = {
//         from: 'lucas.silva_9090@hotmail.com',
//         to: 'lucas.silva_444@hotmail.com',
//         subject: 'Site Meu Mercado',
//         text: 'Recupere sua senha clicando no link abaixo.',
//         html: '<p>Recupere sua senha clicando no link abaixo. <b>nodemailer</b> on <b>heroku</b></p>'
    
//     }

//     transporter.sendMail(email, (err, result)=>{
//         if(err) return res.status(400).json({
//             erro: true,
//             mensagem: "Mensagem não enviada!!!! " + err
//         })
        
//     })

//     return res.json({
//         erro: false,
//         Mensagem: "Mensagem  enviada!!!! "
//     })


        // html: {
        //     path: 'src/resources/mail/auth/forgot_password.html',
        // },
// })

app.listen(3000, () => console.log("Server is running"));