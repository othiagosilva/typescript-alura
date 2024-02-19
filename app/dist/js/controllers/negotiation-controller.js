var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInject } from "../decorators/dom-injector.js";
import { executionTimeLog } from "../decorators/execution-time-log.js";
import { inspect } from "../decorators/inspect.js";
import { weekDays } from "../enums/weekDays.js";
import NegotiationList from "../models/negotiation-list.js";
import Negotiation from "../models/negotiation.js";
import NegotiationService from "../services/negotiation-service.js";
import MessageView from "../views/message-view.js";
import NegotiationsView from "../views/negotiations-view.js";
export default class NegotiationController {
    constructor() {
        this.negotiations = new NegotiationList();
        this.negotiationsView = new NegotiationsView('#negociacoesView', true);
        this.messageView = new MessageView('#mensagemView', false);
        this.negotiationService = new NegotiationService();
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        if (this.inputDate && this.inputQuantity && this.inputValue) {
            const negotiation = Negotiation.create(this.inputDate.value, this.inputQuantity.value, this.inputValue.value);
            if (!this.weekDay(negotiation.date)) {
                this.messageView.update('Negociações são realizadas apenas em dias úteis.');
                return;
            }
            this.negotiations.add(negotiation);
            this.clearForm();
            this.updateView();
        }
    }
    ;
    dataImport() {
        this.negotiationService.getNegotiations()
            .then(todayNegotiation => {
            for (let negotiation of todayNegotiation) {
                this.negotiations.add(negotiation);
            }
            this.negotiationsView.update(this.negotiations);
        });
    }
    weekDay(date) {
        return date.getDay() > weekDays.SUNDAY && date.getDay() < weekDays.SATURDAY;
    }
    clearForm() {
        if (this.inputDate && this.inputQuantity && this.inputValue) {
            this.inputDate.value = '';
            this.inputQuantity.value = '';
            this.inputValue.value = '';
            this.inputDate.focus();
        }
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negociação adicionada com sucesso');
    }
}
__decorate([
    domInject('#data')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInject('#quantidade')
], NegotiationController.prototype, "inputQuantity", void 0);
__decorate([
    domInject('#valor')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    inspect(),
    executionTimeLog()
], NegotiationController.prototype, "add", null);
