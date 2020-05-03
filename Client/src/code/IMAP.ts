import axios, { AxiosResponse } from "axios";
import { config } from "./config";

export interface IMailbox 
{
    name: string,
    path: string
}

export interface IMessage
{
    id: string,
    date: string,
    from: string,
    subject: string,
    body?: string
}

export class Worker
{
    public async listMailboxes(): Promise<IMailbox[]>
    {
        const res: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes`);
        return res.data;
    }

    public async listMessages(mailbox: string): Promise<IMessage[]>
    {
        const res: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes/${mailbox}`);
        return res.data;
    }

    public async getMessageBody(id: string, mailbox: string): Promise<string>
    {
        const res: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes/${mailbox}/${id}`);

        return res.data;
    }

    public async deleteMessage(id: string, mailbox: string): Promise<void>
    {
        await axios.delete(`${config.serverAddress}/messages/${mailbox}/${id}`);        
    }

    
}