//List of image urls that could appear on the home page
let imageList = ["https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png"
    , "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-00040002.png"
    , "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00080000-00030002.png"
    , "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_05c00000-00060002.png"
    , "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_1f000000-000a0002.png"];

let image = document.querySelector("#randImage");

//Function for switching the image
function swapImage() {
    image.src = imageList[Math.floor(Math.random() * imageList.length)];
}

//Event for when the image is clicked
function init() {
    //Switching images when clicked
	image.onclick = swapImage;

    swapImage();
}
window.onload = init;
