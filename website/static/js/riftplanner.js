const dragItems = document.querySelectorAll(".player-marker");
const riftmap = document.querySelector("canvas");

dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', () => {
        dragItem.classList.add('dragging');
        if(!dragItem.classList.contains('dragged'))
            dragItem.classList.add('dragged');
    })

    dragItem.addEventListener('dragend', e => {
        e.preventDefault();
        marker.style.left = (e.pageX) + "px";
        marker.style.top = (e.pageY) + "px";
        console.log("X: " + e.pageX + "px")
        console.log("Y: " + e.pageY + "px")
        dragItem.classList.remove('dragging');
    })
})

function selectMarker(btn) {
    if(btn.classList.contains("selected-marker")) {
        btn.classList.remove("selected-marker");
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

function toggleColor(btn) {
    var color = btn.id;
    const colorBtns = document.querySelector(".color-grid").querySelectorAll("button");
    colorBtns.forEach(colorBtn => {
        if(colorBtn.classList.contains("selected-color"))
            colorBtn.classList.remove("selected-color")
    })
    btn.classList.add("selected-color");
}

var drawing = false;
const canvas = riftmap.getContext('2d');
riftmap.addEventListener('mousedown', e => {
    drawing = true;
    console.log("drawing true");
})

riftmap.addEventListener('mouseup', e => {
    drawing = false;
    console.log("drawing false");
})

riftmap.addEventListener('mousemove', e => {
    var mousePos = getMousePos(e);
    var posX = mousePos.x;
    var posY = mousePos.y;
    draw(posX, posY)
})

function getMousePos(e) {
    console.log("X: " + e.clientX + " Y: " + e.clientY);
    return {
        x: e.clientX,
        y: e.clientY
    }
}

function draw(posX, posY) {
    if(drawing) {
        canvas.fillStyle = "blue";
        canvas.fillRect(posX, posY, 10, 10);
        console.log("Drew Rectangle at: " + posX + " " + posY);
    }
}