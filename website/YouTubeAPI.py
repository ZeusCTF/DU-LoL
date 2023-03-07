import requests
import json
import pprint

def gatherVideos():
    r = requests.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLUzkJoFm5OFqgVgJ16DrwJp8GdEn5Ezgn&maxResults=3&order=date&key=AIzaSyB297x7ugH4cce5TBt1C_uGOLep7kXKCk0')
    ytURL = 'https://www.youtube.com/watch?v='

    vidLinks = []
#UCTHMPvX_wADl18GLtYRxjUQ - project
#UCaxSQhSboBlHxBkPJOpCvTQ - DU
    resp = r.json()

    x = json.dumps(resp)
    y = json.loads(x)

    pprint.pprint(y)

    for num in range(0,50):
        try:
            #thumbnail urls
            print(y["items"][num]['snippet']['thumbnails']['high']['url'])
            #title
            print(y["items"][num]['snippet']['title'])
            #videoSrc
            print(str(y["items"][num]['snippet']['resourceId']['videoId']))

            video = {
                "thumbURL": y["items"][num]['snippet']['thumbnails']['high']['url'],
                "title": y["items"][num]['snippet']['title'],
                "videoSRC": ytURL + str(y["items"][num]['snippet']['resourceId']['videoId'])
            }

            print("Video found:")
            print(video)

            vidLinks.append(video)
        except:
            print("error finding video")
    
    print("Found the following videos:")
    print(vidLinks)
    return vidLinks

    


gatherVideos()