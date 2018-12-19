function htmlToElement (html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

ShadowRoot.prototype.loadScript = function(src) {
    return new Promise(function(resolve){
        let script = document.createElement('script');
        script.onload = resolve;
        script.src = src;
        this.appendChild(script);
    }.bind(this));
};

Promise.prototype.thenFetch = function(src) {
    return new Promise(function(resolve){
        return this.then(function(){
           fetch(src).then(response => resolve(response));
        });
    }.bind(this));
};
