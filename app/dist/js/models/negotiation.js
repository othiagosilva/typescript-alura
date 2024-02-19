export default class Negotiation {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    get volume() {
        return this.quantity * this.value;
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    static create(dateString, quantityString, valueString) {
        const expr = /-/g;
        const date = new Date(dateString.replace(expr, ','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Negotiation(date, quantity, value);
    }
}
