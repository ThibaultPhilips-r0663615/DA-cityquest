export default class AbstractCQElement extends HTMLElement {
    connectedCallback() {
        this.initShadowDom();
    }

    initShadowDom() {
        if(this.shadowRoot) return;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.template;
        shadowRoot.appendChild(this.style);
    }

    get template() {
        throw "Template is not defined!"
    }
    
    get style() {
        return htmlToElement(`
            <link rel="stylesheet" href="./css/defaultStyling.css"/>
            <link rel="stylesheet" href="./css/style.css"/>
            <link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css"/>
        `);
    }

    byId(id) {
        return this.shadowRoot.getElementById(id);
    }

    byCss(css) {
        return this.shadowRoot.querySelector(css);
    }
}