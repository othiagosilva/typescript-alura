import { Compare } from "../interfaces/compare-interface.js";
import { Printable } from "../utils/printable.js";
import Negotiation from "./negotiation-model.js";

export default class NegotiationList implements Printable, Compare<NegotiationList>{
    private negotiations: Array<Negotiation> = [];

    public add(negotiation: Negotiation): void{
        this.negotiations.push(negotiation);
    }

    public list(): ReadonlyArray<Negotiation> {
        return [...this.negotiations];
    }

    public toText(): string {
        return JSON.stringify(this.negotiations, null, 2);
    }

    public isEqual(negotiations: NegotiationList): boolean {
        return JSON.stringify(this.negotiations) === JSON.stringify(negotiations.list);
    }
}