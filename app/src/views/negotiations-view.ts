import { escape } from "../decorators/escape.js";
import NegotiationList from "../models/negotiation-list-model.js";
import View from "./view.js";

export default class NegotiationsView extends View<NegotiationList>{
    
    @escape()
    protected template(model: NegotiationList): string {
        return `
        <table class="table table-hover tabler-bordered">
            <thead>
                <tr>
                    <th>DATE</th>
                    <th>QUANTITY</th>
                    <th>VALUE</th>
                </tr>
            </thead>
            <tbody>
                ${model.list().map(negotiation => {
                    return `
                    <tr>
                        <td>${this.formater(negotiation.date)}</td>
                        <td>${negotiation.quantity}</td>
                        <td>${negotiation.value}</td>
                    </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
        `; 
    }

    private formater(date: Date): string{
        return new Intl.DateTimeFormat().format(date)
    }
}