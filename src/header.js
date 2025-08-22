const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<style>

#header {
    background-color:rgb(222, 247, 236);
}

img {
    width: 50%;
}

</style>

<div id="header">

    <img src="amiibo.png"></img>

    <div class="navbar is-success">
        <a class="navbar-item is-hoverable" href="index.html">
            Home
        </a>

        <a class="navbar-item is-hoverable" href="app.html">
            App
        </a>

        <a class="navbar-item is-hoverable" href="favorites.html">
            Wishlist
        </a>

        <a class="navbar-item is-hoverable" href="documentation.html">
            Documentation
        </a>
    </div>
</div>

`;

class AmiiboHeader extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //Attributes
        this.banner = this.shadowRoot.querySelector("img");
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attributeName, oldVal, newVal) {
        this.render();
    }

    static get observedAttributes() {
        return ["data-image"];
    }

    render() {
        //Creating values with defaults
        const imageURl = this.getAttribute('data-image') ? this.getAttribute('data-image') : "images/banner.png";

        //Inserting the data into the display
        this.banner.src = imageURl;
    }
}

customElements.define('amiibo-banner', AmiiboHeader);
