import requests
from discord import SyncWebhook

webhook = SyncWebhook.from_url("https://discord.com/api/webhooks/1081629724347998379/vChyTHHtk-kZkgnjEk7iHvTJXBk-LIXdFK_N9_pthhmAmW4UDnvWMxbrUALXdYoCrtq3")


def send_announcement(msg):
    webhook.send(msg, username="DU LoL API")
    print("Announcement sent")