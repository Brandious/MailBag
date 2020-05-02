import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import { SendMailOptions, SentMessageInfo } from "nodemailer";

import { IServerInfo } from './ServerInfo'
// const nodemailer = require("nodemailer");

export class Worker 
{
    private static _serverInfo: IServerInfo;
    constructor(serverInfo: IServerInfo) 
    {
        Worker._serverInfo = serverInfo;
    }

    public sendMessage(options: SendMailOptions)
    {
        return new Promise((res, rej) => {
            const transport: Mail = nodemailer.createTransport(Worker._serverInfo.smtp);
            transport.sendMail(options, (Error: Error | null, Info: SentMessageInfo) => {
                if(Error)
                    rej(Error);
                else
                    res();
            })
        })
    }
}