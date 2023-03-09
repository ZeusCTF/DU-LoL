import requests
import json
import pprint

def gatherVideos():
    r = requests.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLUzkJoFm5OFqgVgJ16DrwJp8GdEn5Ezgn&maxResults=10&order=date&key=AIzaSyB297x7ugH4cce5TBt1C_uGOLep7kXKCk0')
    ytURL = 'https://www.youtube.com/watch?v='

    vidLinks = []
#UCTHMPvX_wADl18GLtYRxjUQ - project
#UCaxSQhSboBlHxBkPJOpCvTQ - DU
    resp = r.json()

    x = json.dumps(resp)
    y = json.loads(x)

    #pprint.pprint(y)

    #max results is set to 10 in the api call, adjusting range to match
    for num in range(0,10):
        try:
            #thumbnail urls
            #print(y["items"][num]['snippet']['thumbnails']['high']['url'])
            #title
            #print(y["items"][num]['snippet']['title'])
            #videoSrc
            #print(str(y["items"][num]['snippet']['resourceId']['videoId']))

        #creates a 'video' dictionary
            video = {
                "thumbURL": y["items"][num]['snippet']['thumbnails']['high']['url'],
                "title": y["items"][num]['snippet']['title'],
                "videoSRC": ytURL + str(y["items"][num]['snippet']['resourceId']['videoId'])
            }

            print("Video found:")
            print(video)

            vidLinks.append(video)
        except:
            pass
            #I'm not sure this is needed, I figured the necessary amoount of boxes would be returned, and if there weren't any videos to be found, then they just wouldn't show
            #we can talk about this though

            #print("error finding video, or video does not exist")
    
    #I think this is kinda redundant, if you are already printing the video dictionaries above
    print("Found the following videos:")
    for vid in vidLinks:
        print(vid['title'])
    
    return vidLinks

    


gatherVideos()