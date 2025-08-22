const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="styles/amiibocard.css">

<div id="card">
    <h2 class="is-size-4"></h2>
    <p id="amiiboSeries">Series: </p>
    <p id="amiiboType">Type: </p>
    <img alt="amiibo pic">

    <section id="favorite">
        <button class="button is-danger">Wishlist!</button>
    </section>
</div>
`;

class AmiiboItem extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //Attributes
        this.h2 = this.shadowRoot.querySelector("h2");
        this.img = this.shadowRoot.querySelector("img");
        this.p1 = this.shadowRoot.querySelector("#amiiboSeries");
        this.p2 = this.shadowRoot.querySelector("#amiiboType");

        //ID for favorites
        this.favButton = this.shadowRoot.querySelector("button");
    }

    connectedCallback() {
        //Adding to favorites
        this.favButton.onclick = e => {
            //Writing down card data
            let cardData = this.getAttribute('data-name') + "," +
                this.getAttribute('data-image') + "," +
                this.getAttribute('data-series') + "," +
                this.getAttribute('data-type') + ",";

            localStorage.setItem("favorites", localStorage.getItem("favorites") + cardData);

            //Changing the button appearance
            this.favButton.className="button is-success";
            this.favButton.innerText="Added to wishlist!"

            //Disabling the button
            this.favButton.onclick = null;
        };

        this.render();
    }

    disconnectedCallback() {
        this.favButton.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal) {
        this.render();
    }

    static get observedAttributes() {
        return ["data-name", "data-image", "data-series", "data-type"];
    }

    render() {
        //Creating values with defaults
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...";
        const imageURl = this.getAttribute('data-image') ? this.getAttribute('data-image') : "images/catimage-no-image.png";
        const series = this.getAttribute('data-series') ? this.getAttribute('data-series') : "<i>...";
        const type = this.getAttribute('data-type') ? this.getAttribute('data-type') : "<i>...";

        //Inserting the data into the display
        this.h2.innerHTML = `${name}`;
        this.img.src = imageURl;
        this.p1.innerHTML = `Series: ${series}`;
        this.p2.innerHTML = `Type: ${type}`;
    }
}


customElements.define('amiibo-item', AmiiboItem);
