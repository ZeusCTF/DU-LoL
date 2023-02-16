const statContainer = document.querySelector(".container-profile-stats");

const API_KEY = "";

const playerIGN = document.getElementById("ign").innerHTML;

async function getPlayer() {

    //set up API call
    const APICallString = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerIGN + "?api_key=" + API_KEY;

    const response = await fetch(APICallString);
    let data = await response.json();
    console.log(data);

    //handle API call

    //set summoner icon
    let sumIconImg = document.getElementById("sumIcon");
    sumIconImg.src = ("http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/" + data.profileIconId + ".png");

    //set summoner name
    let sumName = document.getElementById("sumName");
    sumName.innerHTML = data.name;
    
    //set summoner level
    let sumLevel = document.getElementById("sumLevel");
    sumLevel.innerHTML = data.summonerLevel;
}