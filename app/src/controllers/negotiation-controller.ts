import { domInject } from "../decorators/dom-injector.js";
import { executionTimeLog } from "../decorators/execution-time-log.js";
import { inspect } from "../decorators/inspect.js";
import { weekDays } from "../enums/weekDays.js";
import NegotiationList from "../models/negotiation-list-model.js";
import Negotiation from "../models/negotiation-model.js";
import NegotiationService from "../services/negotiation-service.js";
import { print } from "../utils/print.js";
import MessageView from "../views/message-view.js";
import NegotiationsView from "../views/negotiations-view.js";

export default class NegotiationController {
    @domInject('#data')
    private inputDate: HTMLInputElement | null;
    @domInject('#quantidade')
    private inputQuantity: HTMLInputElement | null;
    @domInject('#valor')
    private inputValue: HTMLInputElement | null;

    private negotiations = new NegotiationList(); 
    private negotiationsView = new NegotiationsView('#negociacoesView', true);
    private messageView = new MessageView('#mensagemView', false);
    private negotiationService = new NegotiationService();

    constructor(){
        this.negotiationsView.update(this.negotiations);
    }

    @inspect()
    @executionTimeLog()
    public add(): void{
        if(this.inputDate && this.inputQuantity && this.inputValue){
            const negotiation = Negotiation.create(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);

            if(!this.weekDay(negotiation.date)) {
                this.messageView.update('Negociações são realizadas apenas em dias úteis.');
                return ;
            }

            this.negotiations.add(negotiation);
            print(negotiation);
            this.clearForm();
            this.updateView();
        }
    };

    dataImport(): void{
        this.negotiationService
               .getNegotiations()
               .then(todayNegotiation => {
                    return todayNegotiation.filter(todayNegotiation => {
                        return !this.negotiations
                            .list()
                            .some(negotiation => negotiation.
                                isEqual(todayNegotiation)
                            );
                    });
               })
               .then(todayNegotiation => {
                for(let negotiation of todayNegotiation){
                    this.negotiations.add(negotiation);
                }
                this.negotiationsView.update(this.negotiations);
            });
    }

    private weekDay(date: Date): boolean{
        return date.getDay() > weekDays.SUNDAY && date.getDay() < weekDays.SATURDAY;
    }

    private clearForm(): void{
        if(this.inputDate && this.inputQuantity && this.inputValue) {
            this.inputDate.value = '';
            this.inputQuantity.value = '';
            this.inputValue.value = '';
            this.inputDate.focus();
        }
    }

    private updateView(): void {
        this.negotiationsView.update(this.negotiations)
        this.messageView.update('Negociação adicionada com sucesso');
    }
    
}