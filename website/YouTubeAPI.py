import requests
import json

#uses the YT API to get a list of videos uploaded to a playlist
def gatherVideos():
    #YT API url, returns a dict
    r = requests.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLUzkJoFm5OFqgVgJ16DrwJp8GdEn5Ezgn&maxResults=10&order=date&key=AIzaSyB297x7ugH4cce5TBt1C_uGOLep7kXKCk0')
    #this is to combine with the video ID links, to create a clickable URL for the user
    ytURL = 'https://www.youtube.com/watch?v='

    vidLinks = []
#UCTHMPvX_wADl18GLtYRxjUQ - project

#loads the response as json so it can be parsed
    resp = r.json()
    x = json.dumps(resp)
    y = json.loads(x)

    #range can be adjusted, but needs to match the maxResults value in the URL above
    for num in range(0,10):
        try:
        #creates a 'video' dictionary
            video = {
                #accesses the largest thumbnail URL
                "thumbURL": y["items"][num]['snippet']['thumbnails']['high']['url'],
                #accesses the video title
                "title": y["items"][num]['snippet']['title'],
                #accesses the video id
                "videoSRC": ytURL + str(y["items"][num]['snippet']['resourceId']['videoId'])
            }

            vidLinks.append(video)
        except:
            pass
        
    return vidLinks