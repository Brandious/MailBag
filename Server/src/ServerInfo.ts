const path = require("path");
const fs = require("fs");

export interface IServerInfo
{
    smtp: {
        host: string, port: number,
        auth: {user: string, pass: string},
        secure: boolean
    },
    imap: {
        host: string, port: number,
        auth: {user: string, pass: string}
    }
}

export let serverInfo: IServerInfo;

const rawInfo: string = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
serverInfo = JSON.parse(rawInfo);