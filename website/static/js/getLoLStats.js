const statContainer = document.querySelector(".container-profile-stats");

const API_KEY = "RGAPI-495c6905-df51-4f0f-bf3d-22d956786dea";

const currentPlayer = {
    "ign": "",
    "profileIconId": 1,
    "summonerName": "",
    "summonerLevel": 1,
    "id": "",
    "puuid": "",
    "soloRank": "",
    "soloTier": "",
    "flexRank": "",
    "flexTier": ""
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

            console.log("Solo 5v5 detected");
            console.log(currentPlayer.soloTier);
            console.log(currentPlayer.soloRank);
        }

        //get flex rank information object
        if(rankQueue.queueType == "RANKED_FLEX_SR") {
            currentPlayer.flexTier = rankQueue.tier;
            currentPlayer.flexRank = rankQueue.rank;

            console.log("Flex rank detected");
            console.log(currentPlayer.flexTier);
            console.log(currentPlayer.flexRank);
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

    //read matches
    for(var i = 0; i < matchList.length; i++)
    {
        readMatchID(matchList[i]);
    }
}


async function readMatchID(matchID)
{
    //get match data from match ID
    APICallString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY;
    console.log("APICallString: " + APICallString);

    const fetchMatchObj = await fetch(APICallString);
    let matchData = await fetchMatchObj.json();
    console.log(matchData);

    //pull match data that's wanted
    let gameID = matchData.info.gameId;
    let lobbyParticipants = matchData.info.participants;

    //get containers to put in display
    const historyWrapper = document.querySelector(".wrapper-match-history");

    //li to insert each match into ul
    let div = document.createElement("div");

    //convert data to html
    //game ID
    let gameIdContainer = document.createElement("div");
    let gameIDDisplay = document.createElement("p");

    gameIDDisplay.innerHTML = "Game ID: " + gameID;
    gameIDDisplay.classList.add("class");

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
        let participant = document.createElement("p");
        participant.innerHTML = (part.ign + " " + part.champName + " " + part.champLevel + " " + 
            part.teamPosition + " " + part.kills + " " + part.deaths + " " + part.assists);
        
        //compile data
        let playerContainer = document.createElement("div");
        playerContainer.classList.add("container-match-player")
        playerContainer.append(participantPfp);
        playerContainer.append(participant);
        //display data
        participantContainer.append(playerContainer);
    })

    //place created items into list item
    div.appendChild(gameIdContainer);
    div.appendChild(participantContainer);

    //insert built list item into history wrapper
    historyWrapper.append(div);
}

