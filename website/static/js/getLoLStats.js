const statContainer = document.querySelector(".container-profile-stats");

const API_KEY = "";

var soloQueueMatches = new Array();
var flexQueueMatches = new Array();

const currentPlayer = {
    "ign": "",
    "profileIconId": 1,
    "summonerName": "",
    "summonerLevel": 1,
    "id": "",
    "puuid": "",
    "soloRank": "",
    "soloTier": "",
    "soloLP": 0,
    "flexRank": "",
    "flexTier": "",
    "flexLP": 0,
    "weekWins": 0,
    "weekLosses": 0
}

class playerObj {
    puuid = "";
    profileIcon = "";
    ign = "";
    summonerLevel = 0;
    champName = "";
    champLevel = 0;
    teamPosition = "";
    kills = 0;
    deaths = 0;
    assists = 0;

    constructor(puuid, profileIcon, ign, summonerLevel, champName, champLevel, teamPosition, 
                    kills, deaths, assists) {
        this.puuid = puuid;
        this.profileIcon = profileIcon;
        this.ign = ign;
        this.summonerLevel = summonerLevel;
        this.champName = champName;
        this.champLevel = champLevel;
        this.teamPosition = teamPosition;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
    }
}

async function getPlayer() {
    currentPlayer.ign = document.getElementById("ign").innerHTML;

    console.log("Player IGN: " + currentPlayer.ign);
    //add formatting for replace spaces with URL jargon
    playerURLIGN = currentPlayer.ign.replace(" ", "%20")
    console.log("URL Player IGN: " + playerURLIGN);

    //set up API call
    const APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerURLIGN + "?api_key=" + API_KEY;
    console.log("APICallString: " + APICallString);

    //make API call
    const playerResponse = await fetch(APICallString);
    let playerData = await playerResponse.json();
    console.log("Player Data: " + playerData);

    //handle API call

    //build up currentPlayer object with necessary data
    currentPlayer.profileIconId = playerData.profileIconId;
    currentPlayer.summonerName = playerData.summonerName;
    currentPlayer.summonerLevel = playerData.summonerLevel;
    currentPlayer.id = playerData.id;
    currentPlayer.puuid = playerData.puuid;

    //set summoner icon
    let sumIconImg = document.getElementById("sumIcon");
    sumIconImg.src = ("http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/" + currentPlayer.profileIconId + ".png");

    //set summoner name
    let sumName = document.getElementById("sumName");
    sumName.innerHTML = currentPlayer.ign;
    
    //set summoner level
    let sumLevel = document.getElementById("sumLevel");
    sumLevel.innerHTML = currentPlayer.summonerLevel;

    //get summoner rank info
    getSummonerRankInfo(currentPlayer.id);

    //get summoner match history
    getMatchHistoryIds(currentPlayer.puuid)

}

async function getSummonerRankInfo(id) {
    const APICallString = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY;

    console.log("APICallString: " + APICallString);

    const matchResponse = await fetch(APICallString);
    let rankData = await matchResponse.json();
    console.log(rankData);

    rankData.forEach(rankQueue => {
        //get solo/duo rank information object
        if(rankQueue.queueType == "RANKED_SOLO_5x5") {
            currentPlayer.soloTier = rankQueue.tier;
            currentPlayer.soloRank = rankQueue.rank;
            currentPlayer.soloLP = rankQueue.leaguePoints;

            console.log("Solo 5v5 detected");
            console.log(currentPlayer.soloTier);
            console.log(currentPlayer.soloRank);
            console.log(currentPlayer.soloLP);

            let srcURL = "../static/images/emblem-" + currentPlayer.soloTier.toLowerCase() + ".png";
            let soloQueueRankImgFullSrc = srcURL;
            document.getElementById("soloRankIcon").src = soloQueueRankImgFullSrc;

            document.getElementById("soloRank").innerText = currentPlayer.soloTier;
            document.getElementById("soloLP").innerText = currentPlayer.soloLP;
            //soloQueueRank.innerHTML = currentPlayer.soloTier + ": " + currentPlayer.soloRank + " " + currentPlayer.soloLP + " LP";
        }

        //get flex rank information object
        if(rankQueue.queueType == "RANKED_FLEX_SR") {
            currentPlayer.flexTier = rankQueue.tier;
            currentPlayer.flexRank = rankQueue.rank;
            currentPlayer.flexLP = rankQueue.leaguePoints;

            console.log("Flex rank detected");
            console.log(currentPlayer.flexTier);
            console.log(currentPlayer.flexRank);
            console.log(currentPlayer.flexLP);

            let srcURL = "../static/images/emblem-" + currentPlayer.flexTier.toLowerCase() + ".png";
            let flexQueueRankImgFullSrc = srcURL;
            document.getElementById("flexRankIcon").src = flexQueueRankImgFullSrc;

            document.getElementById("flexRank").innerText = currentPlayer.flexTier;
            document.getElementById("flexLP").innerText = currentPlayer.flexLP;

            //flexQueueRank.innerHTML = currentPlayer.flexTier + ": " + currentPlayer.flexRank  + " " + currentPlayer.flexLP + " LP";
        }
    })

}

async function getMatchHistoryIds(puuid) {
    console.log("Finding match history ID's with puuid: " + puuid);
    var APICallString = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=20&api_key=" + API_KEY;
    console.log("APICallString: " + APICallString);

    const fetchMatchList = await fetch(APICallString);
    let matchList = await fetchMatchList.json();
    console.log(matchList);

    readMatchIDs(matchList);

    //read solo queue
    
}


async function readMatchIDs(matchList)
{
    var soloQueueTracker = 0;
    var flexQueueTracker = 0;

    for(const matchID of matchList) {
        //get match data from match ID
        APICallString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY;
        console.log("APICallString: " + APICallString);

        const fetchMatchObj = await fetch(APICallString);
        let matchData = await fetchMatchObj.json();
        console.log(matchData);

        if(matchData.info.queueId == 420) {
            console.log("Found solo queue game");
            if(soloQueueTracker < 10)
            {
                soloQueueMatches[soloQueueTracker] = matchData;
                soloQueueTracker++;
                
            } else {
                console.log("Max solo queue games reached");
            }
            
        } else if(matchData.info.queueId == 440) {
            console.log("Found flex queue game");
            if(flexQueueTracker < 10)
            {
                flexQueueMatches[flexQueueTracker] = matchData;
                flexQueueTracker++;
            } else {
                console.log("Max flex queue games reached");
            }
        }
    }
    
    //building solo queue lobbies
    for(let i = 0; i < soloQueueMatches.length; i++)
    {
        buildLobbyContainer(soloQueueMatches[i], "Solo Queue");
    }

    //building solo queue lobbies
    for(let i = 0; i < flexQueueMatches.length; i++)
    {
        buildLobbyContainer(flexQueueMatches[i], "Flex Queue");
    }
}

function buildLobbyContainer(matchData, queueType) {
    //pull match data that's wanted
    let gameID = matchData.info.gameId;
    let lobbyParticipants = matchData.info.participants;


    //get containers to put in display
    if (queueType == "Solo Queue")
        historyWrapper = document.getElementById("soloQueueWrapper");
    if (queueType == "Flex Queue")
        historyWrapper = document.getElementById("flexQueueWrapper");

    //container to insert each match into
    let div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    //convert data to html
    //game ID
    let gameIdContainer = document.createElement("div");
    gameIdContainer.style.width = "90%";
    gameIdContainer.style.marginLeft = "auto";
    gameIdContainer.style.marginRight = "auto";
    gameIdContainer.style.color = "var(--black)";
    gameIdContainer.style.fontSize = "1.5rem";
    gameIdContainer.style.fontWeight = "600";
    let gameIDDisplay = document.createElement("p");

    gameIDDisplay.innerHTML = queueType;

    gameIDDisplay.innerHTML += ": " + gameID;
    

    gameIdContainer.append(gameIDDisplay);

    //game participants
    let participantContainer = document.createElement("div");
    participantContainer.classList.add("container-history-participants");

    lobbyParticipants.forEach(player => {
        //build 10 player objects
        const part = new playerObj(player.puuid, player.profileIcon, player.summonerName, 
            player.summonerLevel, player.championName, player.champLevel, player.teamPosition, player.kills, player.deaths,
            player.assists);

        console.log("Created player: " + player.puuid, player.profileIcon, player.summonerName, 
            player.championName, player.champLevel, player.teamPosition, player.kills, player.deaths,
            player.assists);
        //compile data information for display
        //summoner icons
        let participantPfp = document.createElement("img");
        participantPfp.src = "http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/" + part.profileIcon + ".png";
        //match info
        let participantWrapper = document.createElement("div");
        participantWrapper.classList.add("wrapper-lobby-player-information");
        

        let participant = document.createElement("p");
        participant.innerHTML = part.ign;
        let champStats = document.createElement("p");
        champStats.innerHTML = (part.champName + " lvl: " + part.champLevel);
        
        let position = document.createElement("p");
        position.innerHTML = part.teamPosition;

        let kda = document.createElement("p");
        kda.innerHTML = (part.kills + "/" + part.deaths + "/" + part.assists);

        participantWrapper.append(participant);
        participantWrapper.append(champStats);
        participantWrapper.append(position);
        participantWrapper.append(kda);

        let playerWrapper = document.createElement("div");
        playerWrapper.classList.add("wrapper-lobby-player-desc");

        playerWrapper.append(participantPfp)
        playerWrapper.append(participantWrapper);

        //check win/loss for current player profile
        if(player.puuid == currentPlayer.puuid) {
            if(player.win) {
                if(queueType == "Solo Queue"){
                    currentPlayer.weekWins += 1;
                }
                gameIdContainer.style.backgroundColor = "green";
            } else{
                if(queueType == "Solo Queue"){
                    currentPlayer.weekLosses += 1;
                }
                gameIdContainer.style.backgroundColor = "red";
            }
        }
        updateWeeklySQTracker();
        console.log("Calculated win-loss: " + currentPlayer.weekWins + " " + currentPlayer.weekLosses);

        //compile data
        let playerContainer = document.createElement("div");
        playerContainer.classList.add("container-match-player");
        
        playerContainer.append(playerWrapper);
        
        //display data
        participantContainer.append(playerWrapper);
    })

    //place created items into list item
    div.appendChild(gameIdContainer);
    div.appendChild(participantContainer);

    //insert built list item into history wrapper
    historyWrapper.append(div);
}

function updateWeeklySQTracker() {
    var totalGames = 0;

    //pull locations of elements to update
    let progBar = document.querySelector(".sq-progress-bar");
    let sqAmount = document.getElementById("sqAmount");
    let sqWinLoss = document.getElementById("sqWinLoss");

    totalGames = currentPlayer.weekWins + currentPlayer.weekLosses;

    progWidth = (totalGames / 20)*100;
    progBar.style.width = progWidth + "%";

    sqAmount.innerHTML = totalGames + " / 20 games played";
    
    sqWinLoss.innerHTML = currentPlayer.weekWins + " Wins / " + currentPlayer.weekLosses + " Losses";
}