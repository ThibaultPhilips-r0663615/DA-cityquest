export default class AbstractCQElement extends HTMLElement {
        
    connectedCallback() {
        this.initShadowDom();
    }

    initShadowDom(){
        if(this.shadowRoot){
            return;
        }
        let shadowRoot = this.attachShadow({ mode : "open" });
        shadowRoot.innerHTML = this.template;
    }

    get template(){
        throw "Template is not defined!";
    }

    get app() {
        return document.querySelector('cq-app');
    }
}