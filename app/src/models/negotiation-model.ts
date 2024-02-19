import { Compare } from "../interfaces/compare-interface.js";
import { Printable } from "../utils/printable.js";

export default class Negotiation implements Printable, Compare<Negotiation>{
    constructor(
        private _date: Date, 
        public readonly quantity: number, 
        public readonly value: number
    ) {}

    get volume(): number {
        return this.quantity * this.value;
    }
    
    get date(): Date {
        const date = new Date(this._date.getTime());
        return date;
    }    

    public toText(): string {
        return(`
            Data: ${this.date},
            Quantidade: ${this.quantity},
            Valor: ${this.value}
        `);
    }

    public isEqual(negotiation: Negotiation): boolean {
        return this.date.getDate() === negotiation.date.getDate() &&
               this.date.getMonth() === negotiation.date.getMonth() &&
               this.date.getFullYear() === negotiation.date.getFullYear();
    }

    public static create(dateString: string, quantityString: string, valueString: string): Negotiation {
        const expr = /-/g;
        const date = new Date(dateString.replace(expr,','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Negotiation(date, quantity, value);
    }
}