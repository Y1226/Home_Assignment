import { Mdse } from "./Mdse";

export class Supplier {
    constructor(public _id?:string, public company?:string, public phone?:string, public repName?:string, public pswd?:string, public mdse?:Array<Mdse>) {}
}