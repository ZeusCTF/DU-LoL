function toggleDropdown(itemsId) {
    document.getElementById(itemsId).classList.toggle("display-items");
}

//meant for lobby/stat containers to simulate stat container being nested in lobby summary
function toggleDropdown(itemsId, btn) {
    //toggle the indicated lobby or stats container
    const selectedContainer = document.getElementById(itemsId)
    selectedContainer.classList.toggle("display-items");

    //ensure stats container is hidden if lobby summary is hidden
    if(itemsId.includes("lobby")) {
        if(!(selectedContainer.classList.contains("display-items"))) {
            //retrieves game ID
            itemsId = itemsId.split("lobby")[0];
            //hide stats container
            document.getElementById(itemsId+"statsContainer").classList.remove("display-items");
            //reset stats toggle btn icon
            const statBtn = document.getElementById(itemsId+"toggLobbyStatsDrpdwn").querySelector("i");
            statBtn.classList.remove("fa-caret-down");
            statBtn.classList.remove("fa-caret-up");
            statBtn.classList.add("fa-caret-down");
        }
    }

    //update down arrow icon to up arrow icon
    const icon = btn.querySelector("i");
    icon.classList.toggle("fa-caret-down");
    icon.classList.toggle("fa-caret-up");
}