import * as path from 'path';
import { isContext } from 'vm';
const Datastore = require('nedb');

export interface IContact
{
    _id?: number,
    name: string,
    email: string
}

export class Worker
{
    private _db: Nedb;
    constructor()
    {
        this._db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        })
    }

    public listContacts(): Promise<IContact[]> 
    {
        return new Promise((res, rej) => {
            this._db.find({}, (err: Error, docs: IContact[]) => {
                if(err)
                    rej(err);
                else
                    res(docs);
            })
        })
    }

    public addContact(contact: IContact): Promise<IContact>
    {
        return new Promise((res, rej) => {
            this._db.insert(contact, (err: Error, newDoc: IContact) => {
                if(err)
                    rej(err);
                else 
                    res(newDoc);
            })
        })
    }

    public deleteContact(id: string): Promise<string>
    {
        return new Promise((res, rej) => {
            this._db.remove({_id: id}, {}, (err: Error, numRemoved: number) => {
                if(err)
                    rej(err);
                else    
                    res();
            })
        })
    }


}