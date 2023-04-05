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

    //ddragon is case sensitive and uses different names for some champions
    //FiddleSticks - Fiddlesticks, Wukong - MonkeyKing
    renameImgSrcs();

    //calculate win/loss for solo queue games played in the last 7 days
    updateWeeklySoloQueue();

    //display game date (month/day/year or < 24 hours ago), 
    //game length (min:sec), game win (Win/Loss)
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
    
    const dispGameDates = document.querySelectorAll(".dispGameDate");
    const dispGameLengths = document.querySelectorAll(".dispGameLength");
    const dispGameWins = document.querySelectorAll(".dispGameWin");

    const gameEndTimes = document.querySelectorAll(".RAPIgameEndTimestamp");
    const gameDurations = document.querySelectorAll(".RAPIgameDuration");
    const gameWinBools = document.querySelectorAll(".RAPIwin");
        
    //utlize same loop since all stats appear in same containers, thus having
    //equal indices
    for(var i = 0; i < KDAs.length; i++) {
        //referenced in multiple calculations
        const gameLengthSec = parseInt(gameDurations[i].innerText);

        //traverses all KDAs, calculated avg KDA, then sets KDA display to calculation
        const KDAstring = KDAs[i].innerText;
        const KDAsplit = KDAstring.split(' / ');
        var avgKDA = (parseInt(KDAsplit[0]) + parseInt(KDAsplit[2])) / parseInt(KDAsplit[1]);
        avgKDA = Math.round(avgKDA * 100) / 100;
        avgKDAs[i].innerHTML = "KDA: " + avgKDA.toString();

        //traverses all totalCS displays.  Calculate cs/minute based off of game
        //length, hidden in stats container for JS pull
        const totalCS = parseInt(totalCSs[i].innerText);
        const gameLengthMin = Math.round((gameLengthSec/60) * 100) / 100;
        const CSPerMin = Math.round((totalCS/gameLengthMin) * 100) / 100;
        totalCSPMs[i].innerHTML = "(" + CSPerMin + ")";

        //traverses all gameEndTimes, converts from Unix to m/d/y then updates
        //all dispGameDate
        const endDate = convertEndGameTimestamp(parseInt(gameEndTimes[i].innerText));
        dispGameDates[i].innerHTML = "" + endDate;

        //traverses all gameDurationTimes, converts from Unix to m:s then updates
        //all dispGameDuration
        const gameDur = convertGameDurationTimestamp(parseInt(gameDurations[i].innerText));
        console.log(gameDur);
        dispGameLengths[i].innerHTML = "Length: " + gameDur;

        //traverses all gameWinBools, converts "True" to "Win" and 
        //"False" to "Loss" then updates dispGameWins
        if(gameWinBools[i].innerText == "True") {
            dispGameWins[i].innerHTML = "Win";
            dispGameWins[i].style.color = "green";
        } else if (gameWinBools[i].innerText = "False") {
            dispGameWins[i].innerHTML = "Loss";
            dispGameWins[i].style.color = "red";
        } 
        else {
            dispGameWins[i].innerHTML = "Unknown";
        }
    }

}

function renameImgSrcs() {
    const imgs = document.querySelectorAll("img");
    imgs.forEach(img => {
        if(img.src == "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/FiddleSticks.png") {
            img.src = "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Fiddlesticks.png"
        } else if (img.src == "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/Wukong.png") {
            img.src = "http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/MonkeyKing.png"
        }
    })
}

function updateWeeklySoloQueue() {
    const gameEndTimes = document.querySelectorAll(".RAPIgameEndTimestamp");
    const winBools = document.querySelectorAll(".RAPIwin");
    const currentTime = Date.now();

    var totalGames = 0, wins = 0, losses = 0;

    for (var i = 0; i < gameEndTimes.length; i++) {
        var gameDifMill = currentTime - parseInt(gameEndTimes[i].innerText);
        console.log("Current time: " + currentTime + " " + currentTime.toString());
        console.log("End game time: " + parseInt(gameEndTimes[i].innerText))
        console.log("gameDifMill" + gameDifMill);
        if(winBools[i].innerText == "True" && gameDifMill < 604800000) {
            wins++;
        } else if (winBools[i].innerText == "False" && gameDifMill < 604800000) {
            losses++;
        }
    }
    console.log("Wins: " + wins + " Losses: " + losses);

    let progBar = document.querySelector(".sq-progress-bar");
    let sqAmount = document.getElementById("sqAmount");
    let sqWinLoss = document.getElementById("sqWinLoss");

    totalGames = wins + losses;

    progWidth = (totalGames / 20)*100;
    progBar.style.width = progWidth + "%";

    sqAmount.innerHTML = totalGames + " / 20 games played";
    
    sqWinLoss.innerHTML = wins + " Wins / " + losses + " Losses";
}



function convertEndGameTimestamp(UNIX_timestamp) {
    //Unix = seconds
    const endGameStamp = new Date(UNIX_timestamp);
    const endGameTime = endGameStamp.getTime();
    //currentTime = milliseconds
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    var date = "";

    console.log("End Game: " + endGameTime + " Current Time: " + currentTime);

    //TODO: implement < 24 hours, format to X hours ago... instead of m/d/y

    // if((currentTime - endGameTime) < 86400) {
    //     const difDate = new Date(currentTime - endGameTime);
    //     var hours = difDate.getHours();
    //     date = hours + " hours ago";
    // } else {
    //     var month = endGameStamp.getMonth()+1;
    //     var day = endGameStamp.getDate();
    //     var year = endGameStamp.getFullYear();
    //     date = month + "/" + day + "/" + year;
    // }

    var month = endGameStamp.getMonth()+1;
    var day = endGameStamp.getDate();
    var year = endGameStamp.getFullYear();
    date = month + "/" + day + "/" + year;

    return date;
}

function convertGameDurationTimestamp(UNIX_timestamp) {
    const minutes = Math.floor(UNIX_timestamp / 60);
    var seconds = UNIX_timestamp - minutes * 60 + "";
    if(seconds.length < 2) {
        seconds = "0" + seconds;
    }

    var duration = minutes + ":" + seconds;

    return duration;
}