export class Orders {
    constructor(public _id?:string, public company?:string, public product?:{ name: string, amount: number }[], public price?:number, public status?:String) {}
}