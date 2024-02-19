export default abstract class View<T> {
    protected element: HTMLElement;
    private escape: boolean;
    
    constructor(selector: string, escape?: boolean){
        this.element = <HTMLElement> document.querySelector(selector);
        if(escape){
            this.escape = escape;
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        if(this.escape) {
            template = template.replace(/<script>[\s\S]*?<script>/, '');
        }
        this.element.innerHTML = template;
    }

    protected abstract template(model: T): string;
}