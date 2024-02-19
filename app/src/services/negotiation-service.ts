import { TodayNegotiation } from "../interfaces/today-negotiation-interface";
import Negotiation from "../models/negotiation-model.js";

export default class NegotiationService{
    public getNegotiations(): Promise<Negotiation[]>{
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((data: TodayNegotiation[])=> {
                return data.map(d => {
                    return new Negotiation(new Date(), d.vezes, d.montante)
                }) 
            });
    }
}