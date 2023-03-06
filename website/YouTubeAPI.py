import requests
import json
import pprint


def gatherVideos():
    r = requests.get('https://youtube.googleapis.com/youtube/v3/search?channelId=UCTHMPvX_wADl18GLtYRxjUQ&maxResults=10&order=date&key=AIzaSyB297x7ugH4cce5TBt1C_uGOLep7kXKCk0')
    ytURL = 'https://www.youtube.com/watch?v='

    vidLinks = []


    resp = r.json()

    x = json.dumps(resp)
    y = json.loads(x)

    for num in range(0,11):
        try:
            #print(y["items"][num]['id']['videoId'])
            vidLinks.append(ytURL + str(y["items"][num]['id']['videoId']))
        except:
            break
    return vidLinks
#gatherVideos()

def gatherVideos():
    r = requests.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCTHMPvX_wADl18GLtYRxjUQ&maxResults=10&order=date&key=AIzaSyB297x7ugH4cce5TBt1C_uGOLep7kXKCk0')
    ytURL = 'https://www.youtube.com/watch?v='

    vidLinks = []


    resp = r.json()

    x = json.dumps(resp)
    y = json.loads(x)

    for num in range(0,11):
        try:
            #print(y["items"][num]['id']['videoId'])
            vidLinks.append(ytURL + str(y["items"][num]['id']['videoId']))
        except:
            break
    #print(vidLinks)

    #json response but pretty
    #pprint.pprint(y)

    #thumbnail urls
    #print(y["items"][0]['snippet']['thumbnails']['default']['url'])

    #title
    #print(y["items"][0]['snippet']['title'])


gatherVideos()