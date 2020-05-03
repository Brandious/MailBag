import path from 'path';
import express, { Express, NextFunction, Request, Response } from 'express';

import { serverInfo } from './ServerInfo';
import * as IMAP from './IMAP';
import * as SMTP from './SMTP';
import * as Contacts from './contacts';
import {IContact} from './contacts';


const app: Express = express();
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../../Client/dist")));



app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get("/mailboxes", async (req: Request, res: Response) => {
    try
    {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
        res.json(mailboxes);
    }
    catch(err)
    {
        res.send("Error: " + err);
    }
});

app.get("/mailboxes/:mailbox", async (req: Request, res: Response) => {
    try
    {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const messages: IMAP.IMessage[] = await imapWorker.listMessages({
            mailbox: req.params.mailbox
        });
        res.json(messages);   
    }
    catch(err)
    {
        res.send("Error" + err);
    }

})

app.get("/mailboxes/:mailbox/:id", async (req: Request, res:Response) => {
    try
    {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const messageBody: string = await imapWorker.getMessageBody({
            mailbox: req.params.mailbox,
            id: parseInt(req.params.id, 10)
        });
        res.send(messageBody);
    }
    catch(err)
    {
        res.send("Error" + err);
    }
})

app.delete("/messages/:mailbox/:id", async (req: Request, res: Response) => {
    try
    {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        await imapWorker.deleteMessage({
            mailbox: req.params.mailbox,
            id: parseInt(req.params.id, 10)
        });
        res.send("Message has been deleted!");
    }
    catch(err)
    {
        res.send("Error" + err);
    }
});

app.post("/messages", async(req: Request, res: Response) => {
    try {
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
        //console.log(req.body);
        await smtpWorker.sendMessage(req.body);
        res.send("Message had been succesfully sent!!!");
    } catch (err) {
        res.send("Error: " + err);
    }
});

app.get("/contacts",async (req: Request, res: Response) => {
    try 
    {
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        const contacts: IContact[] = await contactsWorker.listContacts();
        res.json(contacts);

    } catch (err) {
        res.send("Error "+ err);
    }
    
});

app.post("/contacts", async (req: Request, res: Response) => {
    try 
    {    
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        const contact: IContact = await contactsWorker.addContact(req.body);
        res.json(contact);   

    } catch (err) {
        res.send("Error" + err);
    }
})

app.delete("/contacts/:id", async(req: Request, res: Response) => {
    try {
        const contactsWorker: Contacts.Worker = new Contacts.Worker();
        await contactsWorker.deleteContact(req.params.id);
        res.send("Contact deleted Succesfully");
    } catch (err) {
        res.send("Error" + err);
    }
})


app.listen("8000", () => {
    console.log("Server is running on port: 8000" )
})