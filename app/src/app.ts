import NegotiationController from "./controllers/negotiation-controller.js";

const negotiationController = new NegotiationController();
const form  = <HTMLInputElement> document.querySelector('.form');

if(form){
    form.addEventListener('submit', event => {
        event.preventDefault();
        negotiationController.add(); 
    });
} else {
    throw Error('Não foi possível inicializar a aplicação')
}

const importButton = document.querySelector('#botao-importa');
if (importButton) {
    importButton.addEventListener('click', () => {
        negotiationController.dataImport();
    });
} else {
    throw Error('Botão importa não foi encontrado.')
}