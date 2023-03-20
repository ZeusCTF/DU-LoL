const dragItems = document.querySelectorAll(".player-marker");
const riftmap = document.querySelector(".container-sr");

dragItems.forEach(dragItem => {
    dragItem.addEventListener('dragstart', () => {
        dragItem.classList.add('dragging');
        if(!dragItem.classList.contains('dragged'))
            dragItem.classList.add('dragged');
    })

    dragItem.addEventListener('dragend', e => {
        e.preventDefault();
        dragItem.classList.remove('dragging');
        dragItem.style.left = (e.pageX-10) + "px";
        dragItem.style.top = (e.pageY-10) + "px";
        console.log("X: " + e.pageX + "px")
        console.log("Y: " + e.pageY + "px")
    })
})

function selectMarker(btn) {
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