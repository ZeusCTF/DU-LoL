const statContainer = document.querySelector(".container-profile-stats");

const API_KEY = "RGAPI-a78424e2-ebbd-4592-b565-45f814aea25f";

var soloQueueMatches = new Array();
var flexQueueMatches = new Array();

//used for website user's data analysis
const currentPlayer = {
    //general
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
    "weekLosses": 0,

    //gold/item stats
    "consumablesPurchased": 0,
    "itemsPurchased": 0,
    "goldEarned": 0,
    "goldSpent": 0,

    "item0": 0,
    "item1": 0,
    "item2": 0,
    "item3": 0,
    "item4": 0,
    "item5": 0,
    "item6": 0,

    "summoner1Casts": 0,
    "summoner2Casts": 0,
    "summoner1Id": 0,
    "summoner2Id": 0,

    //combat stats/micro
    "totalDamageTaken": 0,
    "damageSelfMitigated": 0,
    "magicDamageTaken": 0,
    "physicalDamageTaken": 0,
    "trueDamageTaken": 0,
    "totalDamageShieldedOnTeammates": 0,
    "totalHeal": 0,
    "totalHealsOnTeammates": 0,
    "totalUnitsHealed": 0,

    "totalDamageDealt": 0,
    "totalDamageDealtToChampions": 0,
    "magicDamageDealt": 0,
    "magicDamageDealtToChampions": 0,
    "physicalDamageDealt": 0,
    "physicalDamageDealtToChampions": 0,
    "trueDamageDealt": 0,
    "trueDamageDealtToChampions": 0,

    "timeCCingOthers": 0,
    "totalTimeCCDealt": 0,

    "spell1Casts": 0,
    "spell2Casts": 0,
    "spell3Casts": 0,
    "spell4Casts": 0,

    "firstBloodAssist": false,
    "firstBloodKill": false,
    "doubleKills": 0,
    "tripleKills": 0,
    "quadraKills": 0,
    "pentaKills": 0,

    "longestTimeSpentLiving": 0,
    "totalTimeSpentDead": 0,
    "neutralMinionsKilled": 0,
    "totalMinionsKilled": 0,


    //macro stats (objs, turrets, vision)
        //objs
    "baronKills": 0,
    "dragonKills": 0,
    "objectivesStolen": 0,
    "objectivesStolenAssists": 0,

        //turrets
    "damageDealtToBuildings": 0,
    "damageDealtToTurrets": 0,
    "firstTowerAssists": false,
    "firstTowerKill": false,
    "inhibitorKills": 0,
    "inhibitorTakedowns": 0,
    "inhibitorsLost": 0,
    "turretKills": 0,
    "turretTakedowns": 0,


        //vision
    "detectorWardsPlaced": 0,
    "visionScore": 0,
    "visionWardsBoughtInGame": 0,
    "wardsKilled": 0,
    "wardsPlaced": 0,


    //pings
    "needVisionPings": 0,
    "visionClearedPings": 0,
    "enemyMissingPings": 0,
    "enemyVisionPings": 0,
    "commandPings": 0,
    "basicPings": 0,
    "baitPings": 0,
    "dangerPings": 0,
    "onMyWayPings": 0,
    "allInPings": 0,
    "assistMePings": 0,
    "pushPings": 0,
    "holdPings": 0
}

//player objects for each match
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

    updatePings(needVision, visionCleared, enemyVision, command, basic, bait, danger, 
        onMyWay, allIn, assistMe, push, enemyMissing, hold) {
            this.needVisionPings = needVision;
            this.visionClearedPings = visionCleared;
            this.enemyVisionPings = enemyVision;
            this.commandPings = command;
            this.basicPings = basic;
            this.baitPings = bait;
            this.dangerPings = danger;
            this.onMyWayPings = onMyWay;
            this.allInPings = allIn;
            this.assistMePings = assistMe;
            this.pushPings = push;
            this.enemyMissingPings = enemyMissing;
            this.holdPings = hold;
    }

}

async function getPlayer() {
    currentPlayer.ign = document.getElementById("ign").innerHTML;

    //console.log("Player IGN: " + currentPlayer.ign);
    //add formatting for replace spaces with URL jargon
    playerURLIGN = currentPlayer.ign.replace(" ", "%20")
    //console.log("URL Player IGN: " + playerURLIGN);

    //set up API call
    const APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerURLIGN + "?api_key=" + API_KEY;
    //console.log("APICallString: " + APICallString);

    //make API call
    const playerResponse = await fetch(APICallString);
    let playerData = await playerResponse.json();
    //console.log("Player Data: " + playerData);

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

//display current solo/flex rank + lp, summoner level.  Adjust images to match
async function getSummonerRankInfo(id) {
    const APICallString = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + "?api_key=" + API_KEY;

    //console.log("APICallString: " + APICallString);

    const matchResponse = await fetch(APICallString);
    let rankData = await matchResponse.json();
    //console.log(rankData);

    rankData.forEach(rankQueue => {
        //get solo/duo rank information object
        if(rankQueue.queueType == "RANKED_SOLO_5x5") {
            currentPlayer.soloTier = rankQueue.tier;
            currentPlayer.soloRank = rankQueue.rank;
            currentPlayer.soloLP = rankQueue.leaguePoints;

            //console.log("Solo 5v5 detected");
            //console.log(currentPlayer.soloTier);
            //console.log(currentPlayer.soloRank);
            //console.log(currentPlayer.soloLP);

            let srcURL = "../static/images/emblem-" + currentPlayer.soloTier.toLowerCase() + ".png";
            let soloQueueRankImgFullSrc = srcURL;
            document.getElementById("soloRankIcon").src = soloQueueRankImgFullSrc;

            document.getElementById("soloRank").innerText = currentPlayer.soloTier + " " + currentPlayer.soloRank;
            document.getElementById("soloLP").innerText = currentPlayer.soloLP;
            //soloQueueRank.innerHTML = currentPlayer.soloTier + ": " + currentPlayer.soloRank + " " + currentPlayer.soloLP + " LP";
        }

        //get flex rank information object
        if(rankQueue.queueType == "RANKED_FLEX_SR") {
            currentPlayer.flexTier = rankQueue.tier;
            currentPlayer.flexRank = rankQueue.rank;
            currentPlayer.flexLP = rankQueue.leaguePoints;

            //console.log("Flex rank detected");
            //console.log(currentPlayer.flexTier);
            //console.log(currentPlayer.flexRank);
            //console.log(currentPlayer.flexLP);

            let srcURL = "../static/images/emblem-" + currentPlayer.flexTier.toLowerCase() + ".png";
            let flexQueueRankImgFullSrc = srcURL;
            document.getElementById("flexRankIcon").src = flexQueueRankImgFullSrc;

            document.getElementById("flexRank").innerText = currentPlayer.flexTier + " " + currentPlayer.flexRank;
            document.getElementById("flexLP").innerText = currentPlayer.flexLP;

            //flexQueueRank.innerHTML = currentPlayer.flexTier + ": " + currentPlayer.flexRank  + " " + currentPlayer.flexLP + " LP";
        }
    })

}

async function getMatchHistoryIds(puuid) {
    //console.log("Finding match history ID's with puuid: " + puuid);
    var APICallString = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=30&api_key=" + API_KEY;
    //console.log("APICallString: " + APICallString);

    const fetchMatchList = await fetch(APICallString);
    let matchList = await fetchMatchList.json();
    //console.log(matchList);

    readMatchIDs(matchList);
}


async function readMatchIDs(matchList)
{
    var soloQueueTracker = 0;
    var flexQueueTracker = 0;

    for(const matchID of matchList) {
        //get match data from match ID
        APICallString = "https://americas.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY;
        //console.log("APICallString: " + APICallString);

        const fetchMatchObj = await fetch(APICallString);
        let matchData = await fetchMatchObj.json();
        //console.log(matchData);

        if(matchData.info.queueId == 420) {
            //console.log("Found solo queue game");
            if(soloQueueTracker < 10)
            {
                soloQueueMatches[soloQueueTracker] = matchData;
                soloQueueTracker++;
                
            } //else {
              //  console.log("Max solo queue games reached");
            //}
            
        } else if(matchData.info.queueId == 440) {
            //console.log("Found flex queue game");
            if(flexQueueTracker < 10)
            {
                flexQueueMatches[flexQueueTracker] = matchData;
                flexQueueTracker++;
            } //else {
           //     console.log("Max flex queue games reached");
           // }
        }
    }
    
    //building solo queue lobbies
    for(let i = 0; i < soloQueueMatches.length; i++)
    {
        buildLobbyContainer(soloQueueMatches[i], "Solo Queue");
    }

    //building flex queue lobbies
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
    gameIdContainer.classList.add("container-match-id");
    let gameIDDisplay = document.createElement("h3");

    gameIDDisplay.innerHTML = queueType;

    gameIDDisplay.innerHTML += ": " + gameID;
    

    gameIdContainer.append(gameIDDisplay);

    var gameStart = matchData.info.gameCreation;
    //console.log("Game Start: " + gameStart);
    var currentTime = Date.now();
    var gameDifMill = currentTime - gameStart;
    //console.log("Current Time: " + currentTime);
    //console.log("Game was played " + gameDifMill + " milliseconds ago");

    const startDateTime = new Date(gameStart);
    const gameDate = document.createElement("p");
    gameDate.innerHTML = "" + startDateTime.toString();
    gameIdContainer.append(gameDate);

    //console.log("Time Played: " + startDateTime);

    //game participants
    let participantContainer = document.createElement("div");
    participantContainer.classList.add("container-history-participants");

    lobbyParticipants.forEach(player => {
        //build 10 player objects
        const part = new playerObj(player.puuid, player.profileIcon, player.summonerName, 
            player.summonerLevel, player.championName, player.champLevel, player.teamPosition, player.kills, player.deaths,
            player.assists);

        //console.log("Created player: " + player.puuid, player.profileIcon, player.summonerName, 
        //    player.championName, player.champLevel, player.teamPosition, player.kills, player.deaths,
        //    player.assists);
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
                if(queueType == "Solo Queue" && (gameDifMill < 604800000)) {
                    currentPlayer.weekWins += 1;
                }
                gameIdContainer.style.backgroundColor = "green";
            } else {
                if(queueType == "Solo Queue" && (gameDifMill < 604800000)) {
                    currentPlayer.weekLosses += 1;
                }
                gameIdContainer.style.backgroundColor = "red";
            }

            //highlight player in lobby display
            playerWrapper.style.border = "2px solid var(--white)";

            //gather player stats
                //gold/item stats
            currentPlayer.consumablesPurchased = player.consumablesPurchased;
            currentPlayer.itemsPurchased = player.itemsPurchased;
            currentPlayer.goldEarned = player.goldEarned;
            currentPlayer.goldSpent = player.goldSpent;

            currentPlayer.item0 = player.item0;
            currentPlayer.item1 = player.item1;
            currentPlayer.item2 = player.item2;
            currentPlayer.item3 = player.item3;
            currentPlayer.item4 = player.item4;
            currentPlayer.item5 = player.item5;
            currentPlayer.item6 = player.item6;

            currentPlayer.summoner1Casts = player.summoner1Casts;
            currentPlayer.summoner2Casts = player.summoner2Casts;
            currentPlayer.summoner1Id = player.summoner1Id;
            currentPlayer.summoner2Id = player.summoner2Id;

                //combat stats/micro
            currentPlayer.totalDamageTaken = player.totalDamageTaken;
            currentPlayer.damageSelfMitigated = player.damageSelfMitigated;
            currentPlayer.magicDamageTaken = player.magicDamageTaken;
            currentPlayer.physicalDamageTaken = player.physicalDamageTaken;
            currentPlayer.trueDamageTaken = player.trueDamageTaken;
            currentPlayer.totalDamageShieldedOnTeammates = player.totalDamageShieldedOnTeammates;
            currentPlayer.totalHeal = player.totalHeal;
            currentPlayer.totalHealsOnTeammates = player.totalHealsOnTeammates;
            currentPlayer.totalUnitsHealed = player.totalUnitsHealed;

            currentPlayer.totalDamageDealt = player.totalDamageDealt;
            currentPlayer.totalDamageDealtToChampions = player.totalDamageDealtToChampions;
            currentPlayer.magicDamageDealt = player.magicDamageDealt;
            currentPlayer.magicDamageDealtToChampions = player.magicDamageDealtToChampions;
            currentPlayer.physicalDamageDealt = player.physicalDamageDealt;
            currentPlayer.physicalDamageDealtToChampions = player.physicalDamageDealtToChampions;
            currentPlayer.trueDamageDealt = player.trueDamageDealt;
            currentPlayer.trueDamageDealtToChampions = player.trueDamageDealtToChampions;

            currentPlayer.timeCCingOthers = player.timeCCingOthers;
            currentPlayer.totalTimeCCDealt = player.totalTimeCCDealt;

            currentPlayer.spell1Casts = player.spell1Casts;
            currentPlayer.spell2Casts = player.spell2Casts;
            currentPlayer.spell3Casts = player.spell3Casts;
            currentPlayer.spell4Casts = player.spell4Casts;

            currentPlayer.firstBloodAssist = player.firstBloodAssist;
            currentPlayer.firstBloodKill = player.firstBloodKill;
            currentPlayer.doubleKills = player.doubleKills;
            currentPlayer.tripleKills = player.tripleKills;
            currentPlayer.quadraKills = player.quadraKills;
            currentPlayer.pentaKills = player.pentaKills;

            currentPlayer.longestTimeSpentLiving = player.longestTimeSpentLiving;
            currentPlayer.totalTimeSpentDead = player.totalTimeSpentDead;
            currentPlayer.neutralMinionsKilled = player.neutralMinionsKilled;
            currentPlayer.totalMinionsKilled = player.totalMinionsKilled;


                //macro stats

                    //objs
            currentPlayer.baronKills = player.baronKills;
            currentPlayer.dragonKills = player.dragonKills;
            currentPlayer.objectivesStolen = player.objectivesStolen;
            currentPlayer.objectivesStolenAssists = player.objectivesStolenAssists;

                    //turrets
            currentPlayer.damageDealtToBuildings = player.damageDealtToBuildings;
            currentPlayer.damageDealtToTurrets = player.damageDealtToTurrets;
            currentPlayer.firstTowerAssists = player.firstTowerAssist;
            currentPlayer.firstTowerKill = player.firstTowerKill;
            currentPlayer.inhibitorKills = player.inhibitorKills;
            currentPlayer.inhibitorTakedowns = player.inhibitorTakedowns;
            currentPlayer.inhibitorsLost = player.inhibitorsLost;
            currentPlayer.turretKills = player.turretKills;
            currentPlayer.turretTakedowns = player.turretTakedowns;

                    //vision
            currentPlayer.detecorWardsPlaced = player.detecorWardsPlaced;
            currentPlayer.visionScore = player.visionScore;
            currentPlayer.visionWardsBoughtInGame = player.visionWardsBoughtInGame;
            currentPlayer.wardsKilled = player.wardsKilled;
            currentPlayer.wardsPlaced = player.wardsPlaced;

                //pings
            currentPlayer.needVisionPings = player.needVisionPings;
            currentPlayer.visionClearedPings = player.visionClearedPings;
            currentPlayer.enemyVisionPings = player.enemyVisionPings;
            currentPlayer.commandPings = player.commandPings;
            currentPlayer.basicPings = player.basicPings;
            currentPlayer.baitPings = player.baitPings;
            currentPlayer.dangerPings = player.dangerPings;
            currentPlayer.pushPings = player.pushPings;
            currentPlayer.enemyMissingPings = player.enemyMissingPings;
            currentPlayer.holdPings = player.holdPings;
            currentPlayer.onMyWayPings = player.onMyWayPings;
            currentPlayer.allInPings = player.allInPings;
            currentPlayer.assistMePings = player.assistMePings;

            //console.log("Updated current player ping data");
        }
        updateWeeklySQTracker();
        //console.log("Calculated win-loss: " + currentPlayer.weekWins + " " + currentPlayer.weekLosses);

        //compile summoner data into container
        let playerContainer = document.createElement("div");
        playerContainer.classList.add("container-match-player");
        
        playerContainer.append(playerWrapper);
        
        //display summoner's data
        participantContainer.append(playerWrapper);
    })

    //items for stats container

    //macro stats
    let macroStatsContainer = document.createElement("div");
    macroStatsContainer.classList.add("container-macro-stats");

    let macroHeaderWrapper = document.createElement("div");
    macroHeaderWrapper.classList.add("wrapper-stats-header");

    let macroHeader = document.createElement("p");
    macroHeader.innerHTML = "Macro Stats";

    macroHeaderWrapper.append(macroHeader);

    //gold/item stats
    let incomeWrapper = document.createElement("div");
    incomeWrapper.classList.add("wrapper-stats-section");

    let incomeHeaderWrapper = document.createElement("div");
    incomeHeaderWrapper.classList.add("wrapper-stats-header");

    incomeWrapper.append(incomeHeaderWrapper);

    let incomeHeader = document.createElement("p");
    incomeHeader.innerHTML = "Gold & Item Stats";

    incomeHeaderWrapper.append(incomeHeader);

    let incomeStatsWrapper = document.createElement("div");
    incomeStatsWrapper.classList.add("wrapper-stats-income");

    incomeWrapper.append(incomeStatsWrapper);

    let consumablesPurchased = document.createElement("p");
    consumablesPurchased.innerHTML = "Consumables Purchased: " + currentPlayer.consumablesPurchased;
    let itemsPurchased = document.createElement("p");
    itemsPurchased.innerHTML = "Items Purchased: " + currentPlayer.itemsPurchased;
    let goldEarned = document.createElement("p");
    goldEarned.innerHTML = "Gold Earned: " + currentPlayer.goldEarned;
    let goldSpent = document.createElement("p");
    goldSpent.innerHTML = "Gold Spent: " + currentPlayer.goldSpent;

    incomeStatsWrapper.append(consumablesPurchased);
    incomeStatsWrapper.append(itemsPurchased);
    incomeStatsWrapper.append(goldEarned);
    incomeStatsWrapper.append(goldSpent);

    let itemsWrapper = document.createElement("div");
    itemsWrapper.classList.add("wrapper-item-display");

    for (var i = 0; i < 7; i++) {
        let item = document.createElement("img");

        var itemID = -1;
        switch (i) {
            case 0:
                itemID = currentPlayer.item0;
                break;
            case 1:
                itemID = currentPlayer.item1;
                break;
            case 2:
                itemID = currentPlayer.item2;
                break;
            case 3:
                itemID = currentPlayer.item3;
                break;
            case 4:
                itemID = currentPlayer.item4;
                break;
            case 5:
                itemID = currentPlayer.item5;
                break;
            case 6:
                itemID = currentPlayer.item6;
                break;
        }

        if(itemID != -1 && itemID != 0)
        {
            item.src = "http://ddragon.leagueoflegends.com/cdn/13.4.1/img/item/" + itemID + ".png";
            itemsWrapper.append(item);
        }
    }

    incomeStatsWrapper.append(itemsWrapper);

    let summonerSpellInfoWrapper = document.createElement("div");
    summonerSpellInfoWrapper.classList.add("wrapper-summoner-spell-info");

    for(var i = 0; i < 2; i++)
    {
        let summonerSpellWrapper = document.createElement("div");
        summonerSpellWrapper.classList.add("wrapper-summoner-spells");

        var sumSpellId = 0;
        if(i == 0) 
            sumSpellId = currentPlayer.summoner1Id;
        else if (i==1) 
            sumSpellId = currentPlayer.summoner2Id;

        let summonerIcon = document.createElement("img");
        summonerIcon.src = getSummonerSpellIcon(sumSpellId);

        var sumSpellCasts = 0;
        if( i == 0)
            sumSpellCasts = currentPlayer.summoner1Casts;
        if ( i == 1 )
            sumSpellCasts = currentPlayer.summoner2Casts;

        let summonerUses = document.createElement("p");
        summonerUses.innerHTML = "Summoner Casts: " + sumSpellCasts;

        summonerSpellWrapper.append(summonerIcon);
        summonerSpellWrapper.append(summonerUses);

        summonerSpellInfoWrapper.append(summonerSpellWrapper);
    }
    
    incomeStatsWrapper.append(summonerSpellInfoWrapper);

    //combat stats/micro
    let combatWrapper = document.createElement("div");
    combatWrapper.classList.add("wrapper-stats-section");

    let combatHeaderWrapper = document.createElement("div");
    combatHeaderWrapper.classList.add("wrapper-stats-header");

    combatWrapper.append(combatHeaderWrapper);

    let combatHeader = document.createElement("p");
    combatHeader.innerHTML = "Combat & Micro Stats";

    combatHeaderWrapper.append(combatHeader);

    let combatStatsWrapper = document.createElement("div");
    combatStatsWrapper.classList.add("wrapper-stats-combat");

    combatWrapper.append(combatStatsWrapper);

    let totalDamageTaken = document.createElement("p");
    totalDamageTaken.innerHTML = "Total Damage Taken: " + currentPlayer.totalDamageTaken;
    let damageSelfMitigated = document.createElement("p");
    damageSelfMitigated.innerHTML = "Damage Self Mitigated: " + currentPlayer.damageSelfMitigated;
    let magicDamageTaken = document.createElement("p");
    magicDamageTaken.innerHTML = "Magic Damage Taken: " + currentPlayer.magicDamageTaken;
    let physicalDamageTaken = document.createElement("p");
    physicalDamageTaken.innerHTML = "Physical Damage Taken: " + currentPlayer.physicalDamageTaken;
    let trueDamageTaken = document.createElement("p");
    trueDamageTaken.innerHTML = "True Damage Taken: " + currentPlayer.trueDamageTaken;
    let totalDamageShieldedOnTeammates = document.createElement("p");
    totalDamageShieldedOnTeammates.innerHTML = "Total Damage Shielded on Teammates: " + currentPlayer.totalDamageShieldedOnTeammates;
    let totalHeal = document.createElement("p");
    totalHeal.innerHTML = "Total Heal: " + currentPlayer.totalHeal;
    let totalHealsOnTeammates = document.createElement("p");
    totalHealsOnTeammates.innerHTML = "Total Heals on Teammates: " + currentPlayer.totalHealsOnTeammates;
    let totalUnitsHealed = document.createElement("p");
    totalUnitsHealed.innerHTML = "Total Units Healed: " + currentPlayer.totalUnitsHealed;

    combatStatsWrapper.append(totalDamageTaken);
    combatStatsWrapper.append(damageSelfMitigated);
    combatStatsWrapper.append(magicDamageTaken);
    combatStatsWrapper.append(physicalDamageTaken);
    combatStatsWrapper.append(trueDamageTaken);
    combatStatsWrapper.append(totalDamageShieldedOnTeammates);
    combatStatsWrapper.append(totalHeal);
    combatStatsWrapper.append(totalHealsOnTeammates);
    combatStatsWrapper.append(totalUnitsHealed);

    let totalDamageDealt = document.createElement("p");
    totalDamageDealt.innerHTML = "Total Damage Dealt: " + currentPlayer.totalDamageDealt;
    let totalDamageDealtToChampions = document.createElement("p");
    totalDamageDealtToChampions.innerHTML = "Total Damage Dealt to Champions: " + currentPlayer.totalDamageDealtToChampions;
    let magicDamageDealt = document.createElement("p");
    magicDamageDealt.innerHTML = "Total Magic Damage Dealt: " + currentPlayer.magicDamageDealt;
    let magicDamageDealtToChampions = document.createElement("p");
    magicDamageDealtToChampions.innerHTML = "Total Magic Damage Dealt to Champions: " + currentPlayer.magicDamageDealtToChampions;
    let physicalDamageDealt = document.createElement("p");
    physicalDamageDealt.innerHTML = "Total Physical Damage Dealt: " + currentPlayer.physicalDamageDealt;
    let physicalDamageDealtToChampions = document.createElement("p");
    physicalDamageDealtToChampions.innerHTML = "Total Physical Damage Dealt to Champions: " + currentPlayer.physicalDamageDealtToChampions;
    let trueDamageDealt = document.createElement("p");
    trueDamageDealt.innerHTML = "Total True Damage Dealt: " + currentPlayer.trueDamageDealt;
    let trueDamageDealtToChampions = document.createElement("p");
    trueDamageDealtToChampions.innerHTML = "Total True Damage Dealt to Champions: " + currentPlayer.trueDamageDealtToChampions;

    combatStatsWrapper.append(totalDamageDealt);
    combatStatsWrapper.append(totalDamageDealtToChampions);
    combatStatsWrapper.append(magicDamageDealt);
    combatStatsWrapper.append(magicDamageDealtToChampions);
    combatStatsWrapper.append(physicalDamageDealt);
    combatStatsWrapper.append(physicalDamageDealtToChampions);
    combatStatsWrapper.append(trueDamageDealt);
    combatStatsWrapper.append(trueDamageDealtToChampions);

    let timeCCingOthers = document.createElement("p");
    timeCCingOthers.innerHTML = "Time CCing Others: " + currentPlayer.timeCCingOthers;
    let totalTimeCCDealt = document.createElement("p");
    totalTimeCCDealt.innerHTML = "Total Time CC Dealt: " + currentPlayer.totalTimeCCDealt;

    combatStatsWrapper.append(timeCCingOthers);
    combatStatsWrapper.append(totalTimeCCDealt);

    let spell1Casts = document.createElement("p");
    spell1Casts.innerHTML = "Spell 1 Casts: " + currentPlayer.spell1Casts;
    let spell2Casts = document.createElement("p");
    spell2Casts.innerHTML = "Spell 2 Casts: " + currentPlayer.spell2Casts;
    let spell3Casts = document.createElement("p");
    spell3Casts.innerHTML = "Spell 3 Casts: " + currentPlayer.spell3Casts;
    let spell4Casts = document.createElement("p");
    spell4Casts.innerHTML = "Spell 4 Casts: " + currentPlayer.spell4Casts;

    combatStatsWrapper.append(spell1Casts);
    combatStatsWrapper.append(spell2Casts);
    combatStatsWrapper.append(spell3Casts);
    combatStatsWrapper.append(spell4Casts);

    let firstBloodKill = document.createElement("p");
    firstBloodKill.innerHTML = "First Blood Kill: " + currentPlayer.firstBloodKill;
    let firstBloodAssist = document.createElement("p");
    firstBloodAssist.innerHTML = "First Blood Assist: " + currentPlayer.firstBloodAssist;
    let doubleKills = document.createElement("p");
    doubleKills.innerHTML = "Double Kills: " + currentPlayer.doubleKills;
    let tripleKills = document.createElement("p");
    tripleKills.innerHTML = "Triple Kills: " + currentPlayer.tripleKills;
    let quadraKills = document.createElement("p");
    quadraKills.innerHTML = "Quadra Kills: " + currentPlayer.quadraKills;
    let pentakills = document.createElement("p");
    pentakills.innerHTML = "Penta Kills: " + currentPlayer.pentaKills;

    combatStatsWrapper.append(firstBloodKill);
    combatStatsWrapper.append(firstBloodAssist);
    combatStatsWrapper.append(doubleKills);
    combatStatsWrapper.append(tripleKills);
    combatStatsWrapper.append(quadraKills);
    combatStatsWrapper.append(pentakills);

    let longestTimeSpentLiving = document.createElement("p");
    longestTimeSpentLiving.innerHTML = "Longest Time Spent Living: " + currentPlayer.longestTimeSpentLiving;
    let totalTimeSpentDead = document.createElement("p");
    totalTimeSpentDead.innerHTML = "Total Time Spent Dead: " + currentPlayer.totalTimeSpentDead;
    let neutralMinionsKilled = document.createElement("p");
    neutralMinionsKilled.innerHTML = "Neutral Minions Killed: " + currentPlayer.neutralMinionsKilled;
    let totalMinionsKilled = document.createElement("p");
    totalMinionsKilled.innerHTML = "Total Minions Killed: " + currentPlayer.totalMinionsKilled;

    combatStatsWrapper.append(longestTimeSpentLiving);
    combatStatsWrapper.append(totalTimeSpentDead);
    combatStatsWrapper.append(neutralMinionsKilled);
    combatStatsWrapper.append(totalMinionsKilled);

    //objectives data container
    let objsWrapper = document.createElement("div");
    objsWrapper.classList.add("wrapper-stats-section");

    let objsHeaderWrapper = document.createElement("div");
    objsHeaderWrapper.classList.add("wrapper-stats-header");

    let objsHeader = document.createElement("p");
    objsHeader.innerHTML = "Objective Macro";

    objsHeaderWrapper.append(objsHeader);

    let objsStatsWrapper = document.createElement("div");
    objsStatsWrapper.classList.add("wrapper-stats-obj");

    let baronKills = document.createElement("p");
    baronKills.innerHTML = "Baron Kills: " + currentPlayer.baronKills;

    let dragonKills = document.createElement("p");
    dragonKills.innerHTML = "Dragon Kills: " + currentPlayer.dragonKills;

    let objectivesStolen = document.createElement("p");
    objectivesStolen.innerHTML = "Objectives Stolen: " + currentPlayer.objectivesStolen;

    let objectivesStolenAssists = document.createElement("p");
    objectivesStolenAssists.innerHTML = "Objectives Stolen Assist: " + currentPlayer.objectivesStolenAssists;

    objsStatsWrapper.append(baronKills);
    objsStatsWrapper.append(dragonKills);
    objsStatsWrapper.append(objectivesStolen);
    objsStatsWrapper.append(objectivesStolenAssists);

    objsWrapper.append(objsHeaderWrapper);
    objsWrapper.append(objsStatsWrapper);

    //turrets data
    let turretsWrapper = document.createElement("div");
    turretsWrapper.classList.add("wrapper-stats-section");

    let turretsHeaderWrapper = document.createElement("div");
    turretsHeaderWrapper.classList.add("wrapper-stats-header")

    turretsWrapper.append(turretsHeaderWrapper);

    let turretsHeader = document.createElement("p");
    turretsHeader.innerHTML = "Structure Stats";

    turretsHeaderWrapper.append(turretsHeader);

    let turretStatsWrapper = document.createElement("div");
    turretStatsWrapper.classList.add("wrapper-stats-turret");

    turretsWrapper.append(turretStatsWrapper);

    let damageToBuildings = document.createElement("p");
    damageToBuildings.innerHTML = "Damage Dealt to Buildings: " + currentPlayer.damageDealtToBuildings;

    let damageToTurrets = document.createElement("p");
    damageToTurrets.innerHTML = "Damage Dealt to Turrets: " + currentPlayer.damageDealtToTurrets;

    let firstTowerAssists = document.createElement("p");
    firstTowerAssists.innerHTML = "First Tower Assists: " + currentPlayer.firstTowerAssists;

    let firstTowerKill = document.createElement("p");
    firstTowerKill.innerHTML = "First Tower Kills: " + currentPlayer.firstTowerKill;

    let inhibitorKills = document.createElement("p");
    inhibitorKills.innerHTML = "Inhibitor Kills: " + currentPlayer.inhibitorKills;

    let inhibitorTakedowns = document.createElement("p");
    inhibitorTakedowns.innerHTML = "Inhibitor Takedowns: " + currentPlayer.inhibitorTakedowns;

    let inhibitorsLost = document.createElement("p");
    inhibitorsLost.innerHTML = "Inhibitors Lost: " + currentPlayer.inhibitorsLost;

    let turretKills = document.createElement("p");
    turretKills.innerHTML = "Turret Kills: " + currentPlayer.turretKills;

    let turretTakedowns = document.createElement("p");
    turretTakedowns.innerHTML = "Turret Takedowns: " + currentPlayer.turretTakedowns;

    turretStatsWrapper.append(damageToBuildings);
    turretStatsWrapper.append(damageToTurrets);
    turretStatsWrapper.append(firstTowerAssists);
    turretStatsWrapper.append(firstTowerKill);
    turretStatsWrapper.append(inhibitorKills);
    turretStatsWrapper.append(inhibitorTakedowns);
    turretStatsWrapper.append(inhibitorsLost);
    turretStatsWrapper.append(turretKills);
    turretStatsWrapper.append(turretTakedowns);

    //vision data
    let visionWrapper = document.createElement("div");
    visionWrapper.classList.add("wrapper-stats-section");
    
    let visionHeaderWrapper = document.createElement("div");
    visionHeaderWrapper.classList.add("wrapper-stats-header");

    visionWrapper.append(visionHeaderWrapper);

    let visionHeader = document.createElement("p");
    visionHeader.innerHTML = "Vision Macro";

    visionHeaderWrapper.append(visionHeader);

    let visionStatsWrapper = document.createElement("div");
    visionStatsWrapper.classList.add("wrapper-stats-vision");
    
    visionWrapper.append(visionStatsWrapper);

    let detectorWardsPlaced = document.createElement("p");
    detectorWardsPlaced.innerHTML = "Detector Wards Placed: " + currentPlayer.detectorWardsPlaced;

    let visionScore = document.createElement("p");
    visionScore.innerHTML = "Vision Score: " + currentPlayer.visionScore;

    let visionWardsBoughtInGame = document.createElement("p");
    visionWardsBoughtInGame.innerHTML = "Vision Wards Bought In Game: " + currentPlayer.visionWardsBoughtInGame;

    let wardsKilled = document.createElement("p");
    wardsKilled.innerHTML = "Wards Killed: " + currentPlayer.wardsKilled;

    let wardsPlaced = document.createElement("p");
    wardsPlaced.innerHTML = "Detector Wards Placed: " + currentPlayer.wardsPlaced;

    visionStatsWrapper.append(detectorWardsPlaced);
    visionStatsWrapper.append(visionScore);
    visionStatsWrapper.append(visionWardsBoughtInGame);
    visionStatsWrapper.append(wardsKilled);
    visionStatsWrapper.append(wardsPlaced);


    //append all macro wrappers into one container
    macroStatsContainer.append(macroHeaderWrapper);
    macroStatsContainer.append(objsWrapper);
    macroStatsContainer.append(turretsWrapper);
    macroStatsContainer.append(visionWrapper);


    //ping stats
    let pingStatsContainer = document.createElement("div");
    pingStatsContainer.classList.add("container-ping-stats");

    let pingsHeaderWrapper = document.createElement("div");
    pingsHeaderWrapper.classList.add("wrapper-stats-header");

    let pingsHeader = document.createElement("h2");
    pingsHeader.innerHTML = "Pings";

    pingsHeaderWrapper.append(pingsHeader);

    let pingWrapper = document.createElement("div");
    pingWrapper.classList.add("wrapper-ping-stats");

    let needVision = document.createElement("p");
    needVision.innerHTML = "Need Vision Pings: " + currentPlayer.needVisionPings;

    let visionCleared = document.createElement("p");
    visionCleared.innerHTML = "Vision Cleared Pings: " + currentPlayer.visionClearedPings;

    let enemyVision = document.createElement("p");
    enemyVision.innerHTML = "Enemy Vision Pings: " + currentPlayer.enemyVisionPings;

    let commandPings = document.createElement("p");
    commandPings.innerHTML = "Command Pings: " + currentPlayer.commandPings;

    let basicPings = document.createElement("p");
    basicPings.innerHTML = "Basic Pings: " + currentPlayer.basicPings;

    let baitPings = document.createElement("p");
    baitPings.innerHTML = "Bait Pings: " + currentPlayer.baitPings;

    let dangerPings = document.createElement("p");
    dangerPings.innerHTML = "Danger Pings: " + currentPlayer.dangerPings;

    let pushPings = document.createElement("p");
    pushPings.innerHTML = "Push Pings: " + currentPlayer.pushPings;

    let enemyMissingPings = document.createElement("p");
    enemyMissingPings.innerHTML = "Enemy Missing Pings: " + currentPlayer.enemyMissingPings;

    let holdPings = document.createElement("p");
    holdPings.innerHTML = "Hold Pings: " + currentPlayer.holdPings;

    let onMyWayPings = document.createElement("p");
    onMyWayPings.innerHTML = "On My Way Pings: " + currentPlayer.onMyWayPings;

    let allInPings = document.createElement("p");
    allInPings.innerHTML = "All In Pings: " + currentPlayer.allInPings;

    let assistMePings = document.createElement("p");
    assistMePings.innerHTML = "Assist me Pings: " + currentPlayer.assistMePings;

    //add ping stats to ping wrapper
    pingWrapper.append(needVision);
    pingWrapper.append(visionCleared);
    pingWrapper.append(enemyVision);
    pingWrapper.append(commandPings);
    pingWrapper.append(basicPings);
    pingWrapper.append(baitPings);
    pingWrapper.append(dangerPings);
    pingWrapper.append(pushPings);
    pingWrapper.append(enemyMissingPings);
    pingWrapper.append(holdPings);
    pingWrapper.append(onMyWayPings);
    pingWrapper.append(allInPings);
    pingWrapper.append(assistMePings);

    //add header/wrappers to ping stats container
    pingStatsContainer.append(pingsHeaderWrapper);
    pingStatsContainer.append(pingWrapper);
    

    //builds player stats container for the match
    let statsContainer = document.createElement("div");
    statsContainer.classList.add("container-match-stats");
    statsContainer.id = gameID + "stats";

    //header + toggle stats display
    let statsHeaderWrapper = document.createElement("div");
    statsHeaderWrapper.classList.add("wrapper-stats-main-header");

    statsHeaderWrapper.innerHTML = "<h3>Player Stats</h3><button class = 'toggle-stats-dropdown-button'><i class='fa-solid fa-caret-down'></i></button>";
    statsToggleButton = statsHeaderWrapper.querySelector('button');
    statsToggleButton.id = gameID;
    statsToggleButton.addEventListener('click', function() {

        //update dropdown icon to close icon
        const icon = this.querySelector('i');
        icon.classList.toggle("fa-caret-down");
        icon.classList.toggle("fa-caret-up");

        //find selected stats container and set maxheight to fit-content
        const gameID = this.id;
        //console.log("gameID from button: " + gameID);
        const containerID = gameID + "stats";
        //console.log("Searching for container by ID: " + containerID);
        try {
            const statsContainer = document.getElementById(containerID);
            statsContainer.classList.toggle("display-match-stats");
            //console.log("toggled match stats for container: " + containerID);
        } catch (e) {
            //console.log("could not locate stat containers: " + e);
        }
    })
    


    statsHeaderWrapper.append(statsToggleButton);

    //place stat sub-containers into stats container
    statsContainer.append(statsHeaderWrapper);
    statsContainer.append(incomeWrapper);
    statsContainer.append(macroStatsContainer);
    statsContainer.append(combatWrapper);
    statsContainer.append(pingStatsContainer);

    //place created items into full match info container
    div.appendChild(gameIdContainer);
    div.appendChild(participantContainer);
    div.appendChild(statsContainer);

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

function getSummonerSpellIcon(sumId) {
    var sumSpellLink = "../static/images/sum-spells/"
    switch (sumId) {
        case 21:
            sumSpellLink = sumSpellLink + "barrier.webp";
            break;
        case 1:
            sumSpellLink = sumSpellLink + "cleanse.webp";
            break;
        case 14:
            sumSpellLink = sumSpellLink + "ignite.webp";
            break;
        case 3:
            sumSpellLink = sumSpellLink + "exhaust.webp";
            break;
        case 4:
            sumSpellLink = sumSpellLink + "flash.webp";
            break;
        case 6:
            sumSpellLink = sumSpellLink + "ghost.webp";
            break;
        case 7:
            sumSpellLink = sumSpellLink + "heal.webp";
            break;
        case 13:
            sumSpellLink = sumSpellLink + "clarity.webp";
            break;
        case 11:
            sumSpellLink = sumSpellLink + "smite.webp";
            break;
        case 12:
            sumSpellLink = sumSpellLink + "teleport.webp";
            break;
    }

    //console.log("Summoner Spell Icon Link: " + sumSpellLink);
    return sumSpellLink;
}