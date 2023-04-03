function loadGoldGraph(canvasId, matchInfo) {
  //Global variable that controls the fontsize of all text on all charts  
  Chart.defaults.font.size = 8;
  if(window.innerWidth > 768) {
    Chart.defaults.font.size = 12;
  } else if(window.innerWidth > 1028) {
    Chart.defaults.font.size = 16;
  }

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
                borderWidth: 1,
                borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
                label: "Total Gold Earned"
            },
            {
                data: spentGold,
                backgroundColor: [" #ffd91a "],
                borderWidth: 1,
                borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
                label: "Spent Gold"
            }
        ]
      },
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
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

function loadGoldPieGraph(canvasId, matchInfo, teamToParse) {
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

    var blankCanvas;
    var chartTitle = "Pie Chart";
    var color = "White";

    if(teamToParse == "blue") {
      //remove last half of lists (red team)
      labelList.splice(5, labelList.length);
      totalGold.splice(5,totalGold.length);
      spentGold.splice(5,spentGold.length);
      //select blue team canvas to draw chart onto
      blankCanvas = document.getElementById(canvasId+"blueGoldPieGraph");
      chartTitle = "Blue Team Gold Income per Player";
      color = "#038cfc";
    } else if(teamToParse == "red") {
      //remove first half of lists(blue team)
      labelList.splice(0, 5);
      totalGold.splice(0, 5);
      spentGold.splice(0, 5);
      //select red team canvas to draw chart onto
      blankCanvas = document.getElementById(canvasId + "redGoldPieGraph")
      chartTitle = "Red Team Gold Income per Player";
      color = "red";
    }

    //create chart of type ' ', using labelList and data
    new Chart(blankCanvas, {
      type: 'pie',
      data: {
        labels: labelList,
        datasets: [
            {
                data: totalGold,
                backgroundColor: ["#d13434", "#d18334", "#34d134", "#d1d134", "#038cfc"],
                borderWidth: 1,
                borderColor: ["#ffffff"],
                label: "Total Gold Earned"
            },
            {
                data: spentGold,
                backgroundColor: ["#d13434", "#d18334", "#34d134", "#d1d134", "#038cfc"],
                borderWidth: 1,
                borderColor: ["#ffffff"],
                label: "Spent Gold"
            }
        ]
      },
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        plugins: {
          legend: {
              display: true,
              labels: {
                color: "white",
              },
              title: {
                display: true,
                fontSize: 18,
                color: color,
                text: chartTitle
              },
              position: "bottom"
          }
        },
        scales: {
          y: {
            ticks: {
              display: false,
              color: "white",
              beginAtZero: false
            }
          },
          x: {
            ticks: {
              display: false,
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
    
    //push player's total damage data into data lists
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
              borderWidth: 1,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Total Damage to Champions"
          },
          {
              data: physicalDamage,
              backgroundColor: ["#d18334"],
              borderWidth: 1,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Total Physical Damage to Champions"
          },
          {
            data: magicDamage,
            backgroundColor: ["#34d134"],
            borderWidth: 1,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Total Magic Damage to Champions"
          },
          {
            data: trueDamage,
            backgroundColor: ["#d1d134"],
            borderWidth: 1,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Total True Damage to Champions"
          }
      ]
    },
    options: { 
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
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

function loadDamagePieGraph(canvasId, matchInfo, teamToParse) {
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
      
      //push player's total damage data into data lists
      totalDamage.push(player.totalDamageDealtToChampions);
      physicalDamage.push(player.physicalDamageDealtToChampions);
      magicDamage.push(player.magicDamageDealtToChampions);
      trueDamage.push(player.trueDamageDealtToChampions);
    });

    var blankCanvas;
    var chartTitle = "Pie Chart";
    var color = "White";

    if(teamToParse == "blue") {
      //remove last half of lists (red team)
      labelList.splice(5, labelList.length);
      totalDamage.splice(5, totalDamage.length);
      physicalDamage.splice(5, physicalDamage.length);
      magicDamage.splice(5, magicDamage.length);
      trueDamage.splice(5, trueDamage.length);
      //select blue team canvas to draw chart onto
      blankCanvas = document.getElementById(canvasId+"blueDamagePieGraph");
      chartTitle = "Blue Team Damage to Champions per Player";
      color = "#038cfc";
    } else if(teamToParse == "red") {
      //remove first half of lists(blue team)
      labelList.splice(0, 5);
      totalDamage.splice(0, 5);
      physicalDamage.splice(0, 5);
      magicDamage.splice(0, 5);
      trueDamage.splice(0, 5);
      //select red team canvas to draw chart onto
      blankCanvas = document.getElementById(canvasId + "redDamagePieGraph")
      chartTitle = "Red Team Damage to Champions per Player";
      color = "red";
    }

    //create chart of type ' ', using labelList and data
    new Chart(blankCanvas, {
      type: 'pie',
      data: {
        labels: labelList,
        datasets: [
          {
            data: totalDamage,
            backgroundColor: ["#d13434", "#d18334", "#34d134", "#d1d134", "#038cfc"],
            borderWidth: 1,
            borderColor: ["#ffffff"],
            label: "Total Damage to Champions"
        }
        ]
      },
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x',
        plugins: {
          legend: {
              display: true,
              labels: {
                color: "white",
              },
              title: {
                display: true,
                fontSize: 18,
                color: color,
                text: chartTitle
              },
              position: "bottom"
          }
        },
        scales: {
          y: {
            ticks: {
              display: false,
              color: "white",
              beginAtZero: false
            }
          },
          x: {
            ticks: {
              display: false,
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
              borderWidth: 1,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Kills"
          },
          {
              data: deaths,
              backgroundColor: ["#d13434"],
              borderWidth: 1,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Deaths"
          },
          {
            data: assists,
            backgroundColor: ["#d1d134"],
            borderWidth: 1,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Assists"
          }
      ]
    },
    options: { 
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
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
              borderWidth: 1,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Vision Score"
          },
          {
              data: wardsPlaced,
              backgroundColor: ["#d18334"],
              borderWidth: 1,
              borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
              label: "Wards Placed"
          },
          {
            data: wardsKilled,
            backgroundColor: ["#34d134"],
            borderWidth: 1,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Wards Killed"
          },
          {
            data: visionWardsBoughtInGame,
            backgroundColor: ["#d1d134"],
            borderWidth: 1,
            borderColor: ["#1207e8", "#1207e8", "#1207e8", "#1207e8", "#1207e8", "#b31b55", "#b31b55", "#b31b55", "#b31b55", "#b31b55"],
            label: "Vision Wards Purchased"
          }
      ]
    },
    options: { 
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'x',
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