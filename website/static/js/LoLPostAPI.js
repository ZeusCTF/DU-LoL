function cleanAPI() {
    //find empty item slots and remove the broken src
    cleanItems();

    //find empty trinket slots and remove the broken src
    cleanTrinkets();

    //color code red team and blue team in the full lobby summaries
    colorCodeFullLobby();

    //color code current player summary to green for win, red for loss
    colorCodePlayerSummary();

    //calculated avg KDA & CS per minute.  Populates the calculations into correct location in HTML
    setCurPlayerSummary();
}

function cleanItems() {
    const itemGrids = document.querySelectorAll(".item-grid");
    itemGrids.forEach(itemGrid => {
        const itemImgs = itemGrid.querySelectorAll("img");
        itemImgs.forEach(itemImg => {
            if(itemImg.src == "http://ddragon.leagueoflegends.com/cdn/13.4.1/img/item/0.png") {
                itemImg.src = "";
                itemImg.style.width = "100%";
                itemImg.style.height = "100%";
            }
        })
    })
}

function cleanTrinkets() {
    const trinketConts = document.querySelectorAll(".item-trinket");
    trinketConts.forEach(trinketCont => {
        const trinketImgs = trinketCont.querySelectorAll("img");
        trinketImgs.forEach(trinketImg => {
            if(trinketImg.src == "http://ddragon.leagueoflegends.com/cdn/13.4.1/img/item/0.png") {
                trinketImg.src = "";
                trinketImg.style.height = trinketImg.offsetWidth + "px";
            }
        })
    })
}

function colorCodeFullLobby() {
    const summaryLobbies = document.querySelectorAll(".container-match-summary-lobby");
    summaryLobbies.forEach(summaryLobby => {
        playerWrappers = summaryLobby.querySelectorAll(".wrapper-player-summary");
        var wrapperCounter = 0;
        playerWrappers.forEach(playerWrapper => {
            wrapperCounter++;
            if(wrapperCounter < 6 )
                playerWrapper.style.backgroundColor = "blue";
            else {
                playerWrapper.style.backgroundColor = "var(--red)";
                playerWrapper.style.color = "white";
            }
        })
    })
}

function colorCodePlayerSummary() {
    var win = "";
    const matchSummaryConts = document.querySelectorAll(".container-match-summary");
    matchSummaryConts.forEach(matchSummaryCont => {
        const playerSummaryCont = matchSummaryCont.querySelector(".container-match-summary-curplayer");
        const gameWin = matchSummaryCont.querySelector(".RAPIwin");
        if(gameWin.innerHTML == "True")
            playerSummaryCont.style.backgroundColor = "green";
        else if(gameWin.innerHTML == "False")
            playerSummaryCont.style.backgroundColor = "var(--red)";
    })
}

function setCurPlayerSummary() {
    const KDAs = document.querySelectorAll(".curPlayer-summary-KDA");
    const avgKDAs = document.querySelectorAll(".curPlayer-summary-KDA-avg")
    
    const totalCSs = document.querySelectorAll(".curPlayer-summary-cs");
    const totalCSPMs = document.querySelectorAll(".curPlayer-summary-cs-per-min");
    const gameDurations = document.querySelectorAll(".RAPIgameDuration");
    
    //utlize same loop since all stats appear in same containers, thus having
    //equal indices
    for(var i = 0; i < KDAs.length; i++) {
        //traverses all KDAs, calculated avg KDA, then sets KDA display to calculation
        const KDAstring = KDAs[i].innerText;
        const KDAsplit = KDAstring.split(' / ');
        var avgKDA = (parseInt(KDAsplit[0]) + parseInt(KDAsplit[2])) / parseInt(KDAsplit[1]);
        avgKDA = Math.round(avgKDA * 100) / 100;
        avgKDAs[i].innerHTML = "KDA: " + avgKDA.toString();

        //traverses all totalCS displays.  Calculate cs/minute based off of game
        //length, hidden in stats container for JS pull
        const totalCS = parseInt(totalCSs[i].innerText);
        const gameLengthSec = parseInt(gameDurations[i].innerText);
        const gameLengthMin = Math.round((gameLengthSec/60) * 100) / 100;
        const CSPerMin = Math.round((totalCS/gameLengthMin) * 100) / 100;
        totalCSPMs[i].innerHTML = "(" + CSPerMin + ")";
    }

}