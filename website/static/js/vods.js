//search for vods
const search = document.getElementById("vodSearch");

search.onkeyup = function() {
    displayAllVods();
    queryVods(search.value);
}

//loads all champ images onto the page
function displayAllVods() {
    const videoWrappers = document.querySelectorAll(".video-wrapper");
    videoWrappers.forEach(videoWrapper => {
        if(videoWrapper.classList.contains("hide-vod")) {
            videoWrapper.classList.remove("hide-vod");
        }
    })
}

//hide champs whose substring does not match the current search input
function queryVods(input) {
    const videoWrappers = document.querySelectorAll(".video-wrapper");
    videoWrappers.forEach(videoWrapper => {
        let vodTitle = videoWrapper.querySelector(".video-wrapper-info").querySelector("h3").innerText;
        console.log(vodTitle);
        if(!(vodTitle.toLowerCase().includes(input.toLowerCase())))
        {
            console.log("hiding: " + vodTitle);
            videoWrapper.classList.add("hide-vod");
        }
    });
}