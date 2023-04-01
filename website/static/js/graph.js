function loadGoldGraph(canvasId, matchInfo) {
    //create labels based off summoner names
    var labelList = [];
    //data to be displayed on graph
    var totalGold = [];
    var spentGold = [];

    //parse match info to find individual player info
    const participants = matchInfo.info.participants;

    //traverse each player data
    participants.forEach(player => {
      //push summoner name into label list
      labelList.push(player.summonerName);
      
      //push player's total gold income into data list
      totalGold.push(player.goldEarned);
      spentGold.push(player.goldSpent);
    });

    //select canvas to draw chart onto
    const blankCanvas = document.getElementById(canvasId+"goldGraph");

    //create chart of type ' ', using labelList and data
    new Chart(blankCanvas, {
      type: 'bar',
      data: {
        labels: labelList,
        datasets: [
            {
                data: totalGold,
                backgroundColor: ["#febf0f"],
                borderWidth: 2,
                borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
                label: "Total Gold Earned"
            },
            {
                data: spentGold,
                backgroundColor: [" #ffd91a "],
                borderWidth: 2,
                borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
                label: "Spent Gold"
            }
        ]
      },
      options: { 
        responsive: true,
        plugins: {
          legend: {
              display: true,
              labels: {
                color: "white",
              },
              title: {
                display: true,
                fontSize: 18,
                color: "white",
                text: "Gold Income per Player"
              },
              position: "bottom"
          }
        },
        scales: {
          y: {
            ticks: {
              color: "white",
              beginAtZero: false
            }
          },
          x: {
            ticks: {
              color: "white",
              beginAtZero: true
            }
          }
        }
    }
  });
}

function loadDamageGraph(canvasId, matchInfo) {
  //create labels based off summoner names
  var labelList = [];
  //data to be displayed on graph
  var totalDamage = [];
  var physicalDamage = [];
  var magicDamage = [];
  var trueDamage = [];

  //parse match info to find individual player info
  const participants = matchInfo.info.participants;

  //traverse each player data
  participants.forEach(player => {
    //push summoner name into label list
    labelList.push(player.summonerName);
    
    //push player's total gold income into data list
    totalDamage.push(player.totalDamageDealtToChampions);
    physicalDamage.push(player.physicalDamageDealtToChampions);
    magicDamage.push(player.magicDamageDealtToChampions);
    trueDamage.push(player.trueDamageDealtToChampions);
  });

  //select canvas to draw chart onto
  const blankCanvas = document.getElementById(canvasId+"damageGraph");

  //create chart of type ' ', using labelList and data
  new Chart(blankCanvas, {
    type: 'bar',
    data: {
      labels: labelList,
      datasets: [
          {
              data: totalDamage,
              backgroundColor: ["#d13434"],
              borderWidth: 2,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Total Damage to Champions"
          },
          {
              data: physicalDamage,
              backgroundColor: ["#d18334"],
              borderWidth: 2,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Total Physical Damage to Champions"
          },
          {
            data: magicDamage,
            backgroundColor: ["#34d134"],
            borderWidth: 2,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Total Magic Damage to Champions"
          },
          {
            data: trueDamage,
            backgroundColor: ["#d1d134"],
            borderWidth: 2,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Total True Damage to Champions"
          }
      ]
    },
    options: { 
      responsive: true,
      plugins: {
        legend: {
            display: true,
            labels: {
              color: "white",
            },
            title: {
              display: true,
              fontSize: 18,
              color: "white",
              text: "Damage to Champions"
            },
            position: "bottom"
        }
      },
      scales: {
        y: {
          ticks: {
            color: "white",
            beginAtZero: false
          }
        },
        x: {
          ticks: {
            color: "white",
            beginAtZero: true
          }
        }
      }
  }
});
}

function loadKDAGraph(canvasId, matchInfo) {
  //create labels based off summoner names
  var labelList = [];
  //data to be displayed on graph
  var kills = [];
  var deaths = [];
  var assists = [];

  //parse match info to find individual player info
  const participants = matchInfo.info.participants;

  //traverse each player data
  participants.forEach(player => {
    //push summoner name into label list
    labelList.push(player.summonerName);
    
    //push player's total gold income into data list
    kills.push(player.kills);
    deaths.push(player.deaths);
    assists.push(player.assists);
  });

  //select canvas to draw chart onto
  const blankCanvas = document.getElementById(canvasId+"KDAGraph");

  //create chart of type ' ', using labelList and data
  new Chart(blankCanvas, {
    type: 'bar',
    data: {
      labels: labelList,
      datasets: [
          {
              data: kills,
              backgroundColor: ["#34d134"],
              borderWidth: 2,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Kills"
          },
          {
              data: deaths,
              backgroundColor: ["#d13434"],
              borderWidth: 2,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Deaths"
          },
          {
            data: assists,
            backgroundColor: ["#d1d134"],
            borderWidth: 2,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Assists"
          }
      ]
    },
    options: { 
      responsive: true,
      plugins: {
        legend: {
            display: true,
            labels: {
              color: "white",
            },
            title: {
              display: true,
              fontSize: 18,
              color: "white",
              text: "KDA"
            },
            position: "bottom"
        }
      },
      scales: {
        y: {
          ticks: {
            color: "white",
            beginAtZero: false
          }
        },
        x: {
          ticks: {
            color: "white",
            beginAtZero: true
          }
        }
      }
  }
});
}

function loadVisionGraph(canvasId, matchInfo) {
  //create labels based off summoner names
  var labelList = [];
  //data to be displayed on graph
  var visionScore = [];
  var wardsPlaced = [];
  var wardsKilled = [];
  var visionWardsBoughtInGame = [];
  //sight wards are a depracated item and will always be 0.  Don't need to pull

  //parse match info to find individual player info
  const participants = matchInfo.info.participants;

  //traverse each player data
  participants.forEach(player => {
    //push summoner name into label list
    labelList.push(player.summonerName);
    
    //push player's total gold income into data list
    visionScore.push(player.visionScore);
    wardsPlaced.push(player.wardsPlaced);
    wardsKilled.push(player.wardsKilled);
    visionWardsBoughtInGame.push(player.visionWardsBoughtInGame);
  });

  //select canvas to draw chart onto
  const blankCanvas = document.getElementById(canvasId+"visionGraph");

  //create chart of type ' ', using labelList and data
  new Chart(blankCanvas, {
    type: 'bar',
    data: {
      labels: labelList,
      datasets: [
          {
              data: visionScore,
              backgroundColor: ["#d13434"],
              borderWidth: 2,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Vision Score"
          },
          {
              data: wardsPlaced,
              backgroundColor: ["#d18334"],
              borderWidth: 2,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Wards Placed"
          },
          {
            data: wardsKilled,
            backgroundColor: ["#34d134"],
            borderWidth: 2,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Wards Killed"
          },
          {
            data: visionWardsBoughtInGame,
            backgroundColor: ["#d1d134"],
            borderWidth: 2,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Vision Wards Purchased"
          }
      ]
    },
    options: { 
      responsive: true,
      plugins: {
        legend: {
            display: true,
            labels: {
              color: "white",
            },
            title: {
              display: true,
              fontSize: 18,
              color: "white",
              text: "Vision"
            },
            position: "bottom"
        }
      },
      scales: {
        y: {
          ticks: {
            color: "white",
            beginAtZero: false
          }
        },
        x: {
          ticks: {
            color: "white",
            beginAtZero: true
          }
        }
      }
  }
});
}