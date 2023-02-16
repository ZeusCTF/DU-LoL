const statContainer = document.querySelector(".container-profile-stats");

const API_KEY = "";

let playerIGN = document.getElementById("ign").innerHTML;

async function getPlayer() {

    console.log("Player IGN: " + playerIGN);
    //add formatting for replace spaces with URL jargon
    playerIGN = playerIGN.replace(" ", "%20")
    console.log("URL Player IGN: " + playerIGN);

    //set up API call
    const APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerIGN + "?api_key=" + API_KEY;

    console.log("APICallString: " + APICallString);
    const playerResponse = await fetch(APICallString);
    let playerData = await playerResponse.json();
    console.log("Player Data: " + playerData);
    console.log("Player puuid: " + playerData.puuid);

    //handle API call

    //set summoner icon
    let sumIconImg = document.getElementById("sumIcon");
    sumIconImg.src = ("http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/" + playerData.profileIconId + ".png");

    //set summoner name
    let sumName = document.getElementById("sumName");
    sumName.innerHTML = playerData.name;
    
    //set summoner level
    let sumLevel = document.getElementById("sumLevel");
    sumLevel.innerHTML = playerData.summonerLevel;

    //get summoner rank info
    getSummonerRankInfo(playerData.id);

    //get summoner match history
    const matchHistoryIds = getMatchHistoryIds(playerData.puuid)

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
            let tier = rankQueue.tier;
            let rank = rankQueue.rank;

            console.log("Solo 5v5 detected");
            console.log(tier);
            console.log(rank);
        }

        //get flex rank information object
        if(rankQueue.queueType == "RANKED_FLEX_SR") {
            let tier = rankQueue.tier;
            let rank = rankQueue.rank;

            console.log("Flex rank detected");
            console.log(tier);
            console.log(rank);
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

    for(var i = 0; i < matchList.length; i++)
    {
        APICallString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchList[i] + "?api_key=" + API_KEY;
        console.log("APICallString: " + APICallString);

        const fetchMatchObj = await fetch(APICallString);
        let matchData = await fetchMatchObj.json();
        console.log(matchData);
    }
}