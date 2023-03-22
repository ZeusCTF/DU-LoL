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
        //query for currently selected markers
        var curMarkers = document.querySelectorAll('.selected-marker');
        if(curMarkers) {
            curMarkers.forEach(curMarker => {
                //remove currently selected markers
                curMarker.classList.remove('selected-marker');
            })
        }
        //select the targeted button
        btn.classList.add('selected-marker');
        //find the equivalent marker token
        const targetMarker = document.getElementById(markerId);
        //select equivalent marker token
        targetMarker.classList.add('selected-marker');
    }
}

function toggleChampMenu() {
    console.log("Entered toggle champ select");
    const containerCS = document.querySelector(".container-riftplanner-champsmenu");
    containerCS.classList.toggle("show-right-menu");
}

function  toggleDrawMenu() {
    console.log("Entered toggle draw menu");
    const containerDraw = document.querySelector(".container-riftplanner-draw");
    containerDraw.classList.toggle("show-draw-menu");
}

function setMarkerIcon(champIcon) {
    console.log("entered setmarkericon")
    var curMarkers = document.querySelectorAll('.selected-marker');
    console.log(champIcon.src);
    const curChampion = champIcon.src.split("champions/")[1];
    console.log(curChampion);
    newImgUrl = "url('../static/images/riftplanner/champions/" + curChampion + "')";
    curMarkers.forEach(curMarker => {
        curMarker.style.backgroundImage = newImgUrl;
        curMarker.innerText = "";
    })
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
    canvas.height = riftmap2.height;
    canvas.width = window.innerWidth;
    ctx.drawImage(riftmap2, 0, 0, canvas.width, canvas.height);
}