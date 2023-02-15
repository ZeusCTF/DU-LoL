function selectLinks(linkID) {
    console.log("link clicked");
    let links = document.querySelectorAll(".nav-link");
    for(var i = 0; i < links.length; i++)
    {
        if(links[i].id == linkID)
            links[i].style.backgroundColor = "var(--blackTrans)";
    }
}
