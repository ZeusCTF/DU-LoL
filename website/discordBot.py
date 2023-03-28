import requests
from discord import SyncWebhook

webhook = SyncWebhook.from_url("https://discord.com/api/webhooks/1082433482409656331/JUeDGxTLnoEOKFbJssJUEa6D5UOfi3lVIjYcRbDuKTKFCxUPpZmou6fo1u73fEdquEZQ")


def send_announcement(msg):
    try:
        webhook.send(msg, username="DU LoL API")
        print("Announcement sent")
    except:
        print("Could not send announcement")