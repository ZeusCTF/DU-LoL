const dragItems = document.querySelectorAll(".player-marker");

dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', () => {
        dragItem.classList.add('dragging');
        if(!dragItem.classList.contains('dragged'))
            dragItem.classList.add('dragged');
    })

    dragItem.addEventListener('dragend', e => {
        e.preventDefault();
        dragItem.style.left = (e.pageX) + "px";
        dragItem.style.top = (e.pageY) + "px";
        console.log("X: " + e.pageX + "px")
        console.log("Y: " + e.pageY + "px")
        dragItem.classList.remove('dragging');
        console.log("Drag item removed");
    })
})

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

function toggleChampMenu(btn) {
    console.log("Entered toggle champ select");
    document.querySelector(".container-riftplanner-champsmenu").classList.toggle("show-left-menu");
    btn.classList.toggle("champselect-active");
    removeSelectedMarkers();
}

function  toggleDrawMenu(btn) {
    console.log("Entered toggle draw menu");
    document.querySelector(".container-riftplanner-draw").classList.toggle("show-draw-menu");
    btn.classList.toggle("show-draw-menu-btn");
}

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

function displayAllChamps() {
    const imgs = document.querySelectorAll("img");
    imgs.forEach(img => {
        if(img.classList.contains("hide-champ")) {
            img.classList.remove("hide-champ");
        }
    })
}

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

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

const riftImg = document.getElementById("riftImg");
let riftmap2 = new Image();
riftmap2.onload = function () {
    const canvasContainer = document.querySelector(".container-sr");
    canvasContainer.style.width = "80vw";
    canvasContainer.style.height = riftmap2.height;
    canvas.height = riftmap2.height;
    ctx.drawImage(riftmap2, 0, 0, window.innerWidth, riftmap2.height);
};
riftmap2.src = riftImg.src;
riftmap2.classList.add("container-sr");

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

function clearRiftMap() {
    console.log("entered clear rift map");
    const canvasContainer = document.querySelector(".container-sr");
    canvasContainer.style.width = "80vw";
    canvasContainer.style.height = riftmap2.height;
    canvas.height = riftmap2.height;
    canvas.width = window.innerWidth;
    ctx.drawImage(riftmap2, 0, 0, canvas.width, canvas.height);
}