import axios from 'axios';
import { config } from './config';

export class Worker
{
    public async sendMessage(to: string, from: string, subject: string, message: string): Promise<void>
    {
        await axios.post(`${config.serverAddress}/messages`,
        {
            to: to,
            from: from,
            subject: subject,
            text: message
        })
    }

}