import requests
import json
import pprint

def gatherVideos():
    r = requests.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCTHMPvX_wADl18GLtYRxjUQ&maxResults=3&order=date&key=AIzaSyB297x7ugH4cce5TBt1C_uGOLep7kXKCk0')
    ytURL = 'https://www.youtube.com/watch?v='

    vidLinks = []
#UCTHMPvX_wADl18GLtYRxjUQ - personal
#UCaxSQhSboBlHxBkPJOpCvTQ - DU
    resp = r.json()

    x = json.dumps(resp)
    y = json.loads(x)

    for num in range(0,11):
        try:

            video = {
                "thumbURL": y["items"][num]['snippet']['thumbnails']['high']['url'],
                "title": y["items"][num]['snippet']['title'],
                "videoSRC": ytURL + str(y["items"][num]['id']['videoId'])
            }

            vidLinks.append(video)

            pprint.pprint(y)

            #print(y["items"][num]['id']['videoId'])
            #vidLinks.append(ytURL + str(y["items"][num]['id']['videoId']))

            #thumbnail urls
            #print(y["items"][num]['snippet']['thumbnails']['default']['url'])

            #title
            #print(y["items"][num]['snippet']['title'])
        except:
            break
    
    print(vidLinks)
    return vidLinks

    


gatherVideos()