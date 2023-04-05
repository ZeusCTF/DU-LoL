const dragItems = document.querySelectorAll(".player-marker");

//find mid point of window, -25px marker, -25px marker, -12.5px (center middle button), -50px gap, -50px gap
var fromLeftRedMobile = ((window.innerWidth/2) - 62.5 - 100);
var fromLeftBlueMobile = ((window.innerWidth/2) - 62.5 - 100);

//find mid point of window, -50px marker, -50px marker, -25px (center middle button), -75px gap, -75px gap
var fromLeftRedDeskTab = ((window.innerWidth/2) - 125 - 150);
var fromLeftBlueDeskTab = ((window.innerWidth/2) - 125 - 150);


//align markers on screen load
dragItems.forEach(dragItem => {
    if(window.innerWidth < 768) {
        if(dragItem.classList.contains("player-marker-red")){
            //place on mobile
            dragItem.style.top = "2rem";
            dragItem.style.left = fromLeftRedMobile + "px";
            fromLeftRedMobile += 50;
        }
        else if(dragItem.classList.contains("player-marker-blue")) {
            //place on mobile
            dragItem.style.bottom = "2rem";
            dragItem.style.left = fromLeftBlueMobile + "px";
            fromLeftBlueMobile += 50;
        }
    } else {
        if(dragItem.classList.contains("player-marker-red")){
            //place on desktop/tablet
            dragItem.style.top = "20vh";
            dragItem.style.left = fromLeftRedDeskTab + "px";
            fromLeftRedDeskTab += 75;
        }
        else if(dragItem.classList.contains("player-marker-blue")) {
            //place on desktop/tablet
            dragItem.style.bottom = "2rem";
            dragItem.style.left = fromLeftBlueDeskTab + "px";
            fromLeftBlueDeskTab += 75;
    }
}  
})


//GLOBAL DRAG VARS
let mouseDown = false; //needs to be true for mousemove activation

dragItems.forEach(dragItem => {
    //drag player markers
    dragItem.addEventListener('dragstart', e => {
        mouseDown = true;
        dragItem.classList.add('dragging');
    });

    //dragging player markers
    dragItem.addEventListener('mousemove', e => {
        if(mouseDown == true) {
            e.preventDefault();
            dragItem.style.left = (e.clientX) + "px";
            dragItem.style.top = (e.clientY) + "px";
            console.log("X: " + e.clientX + "px");
            console.log("Y: " + e.clientY + "px");
        }
    });

    //drop player markers
    dragItem.addEventListener('dragend', e => {
        e.preventDefault();
        dragItem.style.left = e.clientX + "px";
        dragItem.style.top = e.clientY + document.documentElement.scrollTop + "px";
        console.log("X: " + e.clientX + "px");
        console.log("Y: " + e.clientY + "px");
        dragItem.classList.remove('dragging');
        console.log("Drag item removed");
        mouseDown = false;
    });
});

function selectMarker(btn) {
    if(btn.classList.contains("selected-marker")) {
        console.log("entered removing markers");
        const selectedMarkers = document.querySelectorAll(".selected-marker");
        selectedMarkers.forEach(selectedMarker => {
            console.log("removing markers");
            selectedMarker.classList.remove("selected-marker");
        })
        
    } else {
        //fetch Id of current button clicked
        const selectId = btn.id;
        //split Id to create marker ID
        const markerId = selectId.split("select")[0];
        console.log(selectId);
        console.log(markerId);
        removeSelectedMarkers();
        //select the targeted button
        btn.classList.add('selected-marker');
        //find the equivalent marker token
        const targetMarker = document.getElementById(markerId);
        //select equivalent marker token
        targetMarker.classList.add('selected-marker');
    }
}

function removeSelectedMarkers() {
     //query for currently selected markers
     var curMarkers = document.querySelectorAll('.selected-marker');
     if(curMarkers) {
         curMarkers.forEach(curMarker => {
             //remove currently selected markers
             curMarker.classList.remove('selected-marker');
         })
     }
}

//Open champ icon select menu
function toggleChampMenu(btn) {
    console.log("Entered toggle champ select");
    document.querySelector(".container-riftplanner-champsmenu").classList.toggle("show-left-menu");
    btn.classList.toggle("champselect-active");
    removeSelectedMarkers();
}

//Open draw menu
function  toggleDrawMenu(btn) {
    console.log("Entered toggle draw menu");
    document.querySelector(".container-riftplanner-draw").classList.toggle("show-draw-menu");
    btn.classList.toggle("show-draw-menu-btn");
}

//set icon of selected marker as selected champion icon
function setMarkerIcon(champIcon) {
    console.log("entered setmarkericon")
    var curMarkers = document.querySelectorAll('.selected-marker');
    console.log(champIcon.src);
    let curChampion = champIcon.src.split("champions/")[1];
    //ensure apostraphe's are correctly backspaced for javascript syntax
    if(curChampion.indexOf("\'") >= 0) {
        console.log("Champ contains apostraphe");
        const curChampionSplit = curChampion.split("\'");
        const newChampName = curChampionSplit.join("\\\'");
        console.log("Rejoined champ name: " + newChampName);
        curChampion = newChampName;
    }
    console.log(curChampion);
    newImgUrl = "url('../static/images/riftplanner/champions/" + curChampion + "')";
    
    curMarkers.forEach(curMarker => {
        curMarker.style.backgroundImage = newImgUrl;
        curMarker.innerText = "";
    })
}

//search for champion
const search = document.getElementById("champSearch");

search.onkeyup = function() {
    displayAllChamps();
    queryChamps(search.value);
}

//loads all champ images onto the page
function displayAllChamps() {
    const imgs = document.querySelectorAll("img");
    imgs.forEach(img => {
        if(img.classList.contains("hide-champ")) {
            img.classList.remove("hide-champ");
        }
    })
}

//hide champs whose substring does not match the current search input
function queryChamps(input) {
    let imgs = document.querySelectorAll(".champ-icon-img");
    imgs.forEach(curImg => {
        var champName = curImg.src;
        console.log(champName);
        champName = champName.split("/champions/")[1];
        console.log(champName);
        champName = champName.split("Square")[0];
        console.log(champName);
        if(!(champName.substring(0,input.length).toLowerCase() == input.toLowerCase()))
            curImg.classList.add("hide-champ");
    });
}



const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

const riftImg = document.getElementById("riftImg");
let riftmap2 = new Image();
riftmap2.onload = function () {
    const containerSR = document.querySelector(".container-sr");

    canvas.width = containerSR.offsetWidth;
    canvas.height = containerSR.offsetHeight;

    ctx.imageSmoothingEnabled = false;
    riftmap2.width = canvas.width;
    riftmap2.height = canvas.height;
    ctx.drawImage(riftmap2, 0, 0, canvas.width, canvas.height);
};
riftmap2.src = riftImg.src;

let color = "#000000";
let lineWidth = 5;
let drawing = false;
let startX;
let startY;

canvas.addEventListener('mousedown', e => {
    drawing = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    drawing = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', e => {
    if(!drawing) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    const {x, y} = getMousePos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
})

//gets cursor position relative to the location of the canvas
//otherwise, canvas resizing breaks mouse location due to aspect ratios
function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

//Toolbar methods
function changeStroke(stroke) {
    lineWidth = parseInt(stroke.id);
    console.log("Toggled linewidth to: " + lineWidth);
    const strokeBtns = document.querySelectorAll(".linewidth-selection");
    strokeBtns.forEach(strokeBtn => {
        if(strokeBtn.classList.contains("selected-linewidth"))
            strokeBtn.classList.remove("selected-linewidth");
        strokeBtn.style.borderColor = color;
        strokeBtn.style.backgroundColor = "transparent";
    })
    stroke.classList.add("selected-linewidth");
}

function toggleColor(btn) {
    color = btn.id;
    console.log("color set to: " + color);
    const colorBtns = document.querySelector(".color-grid").querySelectorAll("button");
    colorBtns.forEach(colorBtn => {
        if(colorBtn.classList.contains("selected-color"))
            colorBtn.classList.remove("selected-color")
    })
    btn.classList.add("selected-color");
    const strokeBtns = document.querySelectorAll(".linewidth-selection");
    strokeBtns.forEach(strokeBtn => {
        strokeBtn.style.borderColor = color;
        strokeBtn.style.backgroundColor = "transparent";
    })
}

//paints a new riftmap image onto the canvas
function clearRiftMap() {
    const containerSR = document.querySelector(".container-sr");

    canvas.width = containerSR.offsetWidth;
    canvas.height = containerSR.offsetHeight;

    ctx.imageSmoothingEnabled = false;
    riftmap2.width = canvas.width;
    riftmap2.height = canvas.height;
    ctx.drawImage(riftmap2, 0, 0, canvas.width, canvas.height);
}