//Loading in the other classes
import "./amiibo-item.js";
import "./header.js";
import "./footer.js";

const loadAmiibo = amiiboOBJ =>{
    //Creating the amiibo card
    const amiibo = document.createElement("amiibo-item");

    amiibo.dataset.name = amiiboOBJ.name ?? "N/A";
    amiibo.dataset.image = amiiboOBJ.image ?? "";
    amiibo.dataset.series = amiiboOBJ.series ?? "???";
    amiibo.dataset.type = amiiboOBJ.type ?? "???";

    document.querySelector("#content").appendChild(amiibo);
};

//Event for clearing favorites
function init(){
    document.querySelector("#clear").onclick = e => {
        //Clearing local storage
        localStorage.setItem("favorites", "");

        //Clearing favorites
        document.querySelector("#content").innerHTML = "<p>Wishlist cleared.</p>";
    };
}

//LOCAL STORAGE DATA
//Getting list of favorites onload
let favorites = localStorage.getItem("favorites").split(",");

//Removing the placeholder text
if(favorites.length - 1 > 0) {
    document.querySelector("#content").innerHTML = "";
}

//Loading favorites
for(let i = 0; i < favorites.length - 1; i += 4) {
    loadAmiibo({name: favorites[i], image: favorites[i+1], series: favorites[i+2], type: favorites[i+3]});
}

window.onload = init;