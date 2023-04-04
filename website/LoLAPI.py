from flask import jsonify
import requests
import json

devkey = "RGAPI-82725493-3db3-4f6d-9d78-cde5148a9683"

def buildPlayerProfile(ign):
    #returns player info - puuid, sumId, summoner name, summoner level, etc.
    #returns account ranked info - solo/flex rank, lp 
    profileInfo = getPlayerProfileInfo(ign)
    #returns list of match history ID's to parse through match history ID API
    matchHistoryIDs = getmatchHistoryIds(profileInfo["puuid"])
    soloQueueList = []
    flexQueueList = []
    soloLobbyPlayerInfo = []
    flexLobbyPlayerInfo = []

    #return match data for lobby ID & sort into soloQueueList & flexQueueList
    for i in range(len(matchHistoryIDs)):
        #get match data
        lobby = readMatchID(matchHistoryIDs[i])
        #print("Lobby to verify: ", lobby)
        if(lobby['info']['queueId'] == 420 and len(soloQueueList) < 10):
            soloQueueList.append(lobby)
        elif(lobby['info']['queueId'] == 440 and len(flexQueueList) < 10):
            flexQueueList.append(lobby)

    #get match data from lists
    for match in soloQueueList:
        #nest each solo lobby list into soloLobbyPlayerInfo
        soloLobbyPlayerInfo.append(getLobbyPlayerInfo(match))
    
    for match in flexQueueList:
        #nest each flex lobby list into flexLobbyPlayerInfo
        flexLobbyPlayerInfo.append(getLobbyPlayerInfo(match))

    #add all dictionaries to main dictionary, return for placement in Flask template
    playerProfile = {
        "profile": profileInfo,
        "soloQueue": {
            "matchList": soloQueueList,
            "curPlayerInfo": parsePlayerInfo(soloQueueList, ign),
            #list of x number of lobbies each containing a 10 player dictionaries of rankInfo
            "lobbyPlayerInfo": soloLobbyPlayerInfo,
        },
        "flexQueue": {
            "matchList": flexQueueList,
            "curPlayerInfo": parsePlayerInfo(flexQueueList, ign),
            "lobbyPlayerInfo": flexLobbyPlayerInfo,
        },
    }

    #for i in range(3):
    #   print("curPlayerLobbyInfo: ", parsePlayerInfo(lobbyList, ign))

    return playerProfile


def getPlayerProfileInfo(ign):
    #parse ign into URL string
    playerURLIGN = ign.replace(" ", "%20")
    #Call Riot API by summoner name
    IGNRequest = requests.get('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + playerURLIGN + '?api_key=' + devkey)
    #loads the response as json so it can be parsed
    resp = IGNRequest.json()
    x = json.dumps(resp)
    IGNData = json.loads(x)
    print(IGNData)
    #Build dictionary to return relevant data
    playerInfo = {
        "puuid": IGNData["puuid"],
        "id": IGNData["id"],
        "ign": IGNData["name"],
        "profileIconID": getProfileIconSrc(IGNData["profileIconId"]),
        "summonerLevel": IGNData["summonerLevel"],
        "rankStats": getPlayerRankStats(IGNData["id"])
    }
    #return dictionary
    return playerInfo

def getProfileIconSrc(profileIconID):
    #return parsed string correlating with ddragon documentation
    return "http://ddragon.leagueoflegends.com/cdn/13.3.1/img/profileicon/" + str(profileIconID) + ".png"

def getPlayerRankStats(sumId):
    #Call Riot API by player unique ID
    RankRequest = requests.get('https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + sumId + '?api_key=' + devkey)
    #loads the response as json so it can be parsed
    resp = RankRequest.json()
    x = json.dumps(resp)
    RankData = json.loads(x)

    print("Account Ranked Data: ", RankData)

    rankInfo = {
        "solo": {
            "rankIcon": "../static/images/emblem-iron.png",
            "rank": "Iron",
            "tier": "IV",
            "lp": "0",

        },
        "flex": {
            "rankIcon": "../static/images/emblem-iron.png",
            "rank": "Iron",
            "tier": "IV",
            "lp": "0",
        }
    }

    #returns dictionary of relevant data for each queue type
    #verify pulling the correct queuetype\
    for queueType in RankData:
        if(queueType['queueType'] == "RANKED_SOLO_5x5"):
            rankInfo['solo']['rankIcon'] = getRankIconSrc(queueType['tier'])
            rankInfo['solo']['rank'] = queueType['tier'].capitalize()
            rankInfo['solo']['tier'] = queueType['rank']
            rankInfo['solo']['lp'] = queueType['leaguePoints']
        elif(queueType['queueType'] == "RANKED_FLEX_SR"):
            rankInfo['flex']['rankIcon'] = getRankIconSrc(queueType['tier'])
            rankInfo['flex']['rank'] = queueType['tier'].capitalize()
            rankInfo['flex']['tier'] = queueType['rank']
            rankInfo['flex']['lp'] = queueType['leaguePoints']

    return rankInfo

def getRankIconSrc(tier):
    #returns src link to local images
    return "../static/images/emblem-" + str(tier).lower() + ".png"

def getmatchHistoryIds(puuid):
    #Call Riot API for match data by player unique ID.  Set to pull last 4 player matches (all game modes)
    MatchRequest = requests.get('https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/' + puuid + '/ids?start=0&count=4&api_key=' + devkey)
    #loads the response as json so it can be parsed
    resp = MatchRequest.json()
    x = json.dumps(resp)
    matchIDData = json.loads(x)

    #return JSON file
    return matchIDData

def readMatchID(matchID):
    #Call Riot API by player unique ID
    MatchRequest = requests.get('https://americas.api.riotgames.com/lol/match/v5/matches/' + matchID + '?api_key=' + devkey)
    #loads the response as json so it can be parsed
    resp = MatchRequest.json()
    x = json.dumps(resp)
    matchData = json.loads(x)

    #returns JSON
    return matchData

def parsePlayerInfo(lobbyList, ign):
    #print("ign: ", ign)

    #list containing all match data of requested ign in lobbyList
    playerInfoList = [ ]

    for lobby in lobbyList:
        #print("Reading Lobby: ", lobby)
        #print("Reading Lobby Participants", lobby['info']['participants'])
        for participant in lobby['info']['participants']:
            if(participant['summonerName'] == ign):
                #print(participant['summonerName'])
                playerInfoList.append(participant)
    
    #returns reduced JSON as list
    return playerInfoList

def getLobbyPlayerInfo(match):
    print("reached getlobbyplayerinfo")
    #List of account API calls, len 10, each lobby participant, dictionary items {'id': '', 'accId': '', etc.}
    playerAccLobbyInfo = []
    for player in match['info']['participants']:
        print("Sending for account info: ", player['summonerName'])
        playerAccLobbyInfo.append(getPlayerProfileInfo(player['summonerName']))
    
    return playerAccLobbyInfo