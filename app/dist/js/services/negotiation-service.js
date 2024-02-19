import Negotiation from "../models/negotiation.js";
export default class NegotiationService {
    getNegotiations() {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((data) => {
            return data.map(d => {
                return new Negotiation(new Date(), d.vezes, d.montante);
            });
        });
    }
}
