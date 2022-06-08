// import { router } from "../routes"
// import express, { Request, Response, NextFunction } from "express";

import path from "path"
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"

// router.get("/sendemail", async (req: Request, res: Response) => {
    const transporter = nodemailer.createTransport({
        service: 'Hotmail',
        auth: {
        user: 'lucas.silva_9090@hotmail.com',
        pass: 'gabriel5656'
        }
    })

    const options = {
        viewEngine: {
            extname: '.handlebars',
            layoutsDir: 'views/email/',
            defaultLayout : 'layout',
        },
        viewPath: path.resolve('./src/resources/mail/'),
        extName: '.html',
    }

    transporter.use('compile', hbs(options))

    export { transporter }

    // const email = {
    //     from: 'lucas.silva_9090@hotmail.com',
    //     to: 'lucas.silva_444@hotmail.com',
    //     subject: 'Site Meu Mercado',
    //     text: 'Recupere sua senha clicando no link abaixo.',
    //     html: '<p>Recupere sua senha clicando no link abaixo. <b>nodemailer</b> on <b>heroku</b></p>'
    // }

    

    // transporter.sendMail(email, (err, result)=>{
    //     if(err) return res.status(400).json({
    //         erro: true,
    //         mensagem: "Mensagem não enviada!!!! " + err
    //     })
        
    // })

    // return res.json({
    //     erro: false,
    //     Mensagem: "Mensagem  enviada!!!! "
    // })
// })