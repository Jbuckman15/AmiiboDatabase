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

//Event for when the search button is pressed
function init() {
	document.querySelector("#search").onclick = getData;
}

//Reading the amiibo data JSON
function getData() {
	//Buffering gif to let the user know it is searching
	document.querySelector("#content").innerHTML = `<img src="images/buffering.gif" width="100px" height="100px"></img>`;


	//Base url that goes to the API
	const SERVICE_URL = "https://www.amiiboapi.com/api/amiibo/?";
	let queryURL = "";

	//Name search input
	let term = document.querySelector("#searchterm").value.trim();
	if(term.length > 0) {
		term = encodeURIComponent(term);
		queryURL += "&character=" + term;
	}
	
	//Series search input
	term = document.querySelector("#seriesSearch").value.trim();
	if(term.length > 0) {
		term = encodeURIComponent(term);
		queryURL += "&amiiboSeries=" + term;
	}

	//Type of amiibo search input
	term = document.querySelector("#type").value;
	if(term.length > 0) {
		term = encodeURIComponent(term);
		queryURL+="&type=" + term;
	}

	//Type search input

	//Fetching with the updated url
	fetch(SERVICE_URL + queryURL)
		.then(response => {
			if(response.ok) {
				return response.json();
			}

			return response.text().then(text => {
				throw text;
			})
		})
		.then(json => {
			//Removing the buffer gif
			document.querySelector("#content").innerHTML = "";

    		//Going through all the amiibo and turning them into amiibo-item components
    		for(let i = 0; i < json.amiibo.length; i++) {
    		let currentResult = json.amiibo[i];
        	loadAmiibo({name: currentResult.name, image: currentResult.image, series: currentResult.amiiboSeries, type: currentResult.type});
    	}
		}).catch(error => {
			//Letting the user know nothing was found
			document.querySelector("#content").innerHTML = "No results found!";
		});
}

window.onload = init;


//Generating the list of series
$.ajax({
	dataType: "json",
	url: "https://www.amiiboapi.com/api/amiiboseries/",
	data: null,
	success: seriesList
});

function seriesList(obj) {
	let bigString = "";
	let results = obj.amiibo;

	bigString += `<select id="seriesSearch">`;
	bigString += `<option value="">Any</option>`;
	for(let i = 0; i < results.length; i++) {
		bigString += `<option value="${results[i].name}">${results[i].name}</option>`;
	}
	bigString += `</select>`;

	document.querySelector("#seriesSearchDIV").innerHTML = bigString;
}
