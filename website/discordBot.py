import requests
from discord import SyncWebhook

webhook = SyncWebhook.from_url("https://discord.com/api/webhooks/1079227234038054922/rF9xFR5ApP9gvdT0y9YO1yjGOdYQie7WsP1Nt3l0NNICmDp0uwOcCGWWoA3aEDNY6jkA")


def send_announcement(msg):
    webhook.send(msg, username="DU LoL API")
    print("Announcement sent")