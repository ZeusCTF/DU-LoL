#Code sourced from google calendar API quickstart, some adjustments made

from __future__ import print_function
from datetime import datetime

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']

#Pulls events listed in the DUAPI calendar
def pullEvent():
    creds=None
    if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                './website/credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    service = build('calendar', 'v3', credentials=creds)
            # Call the Calendar API
    page_token = None
    totalEvents = list()

    while True:
        nowDate = datetime.today().strftime('%Y-%m-%d')
        nowTime = datetime.today().strftime("%H:%M:%S")
        curDateTime = (nowDate + "T" + nowTime + "Z")

        events = service.events().list(calendarId='primary', singleEvents="true", timeMin=curDateTime, orderBy='startTime', pageToken=page_token).execute()
        for event in events['items']:
            #this format 2023-02-16T17:00:00-00:00
            startDateTime = event['start'].get('dateTime')
            startDateTime = str(startDateTime)

            startTime = startDateTime[11:16]
            startDate = startDateTime[0:10]

            endDateTime = event['end'].get('dateTime')
            endDateTime = str(endDateTime)

            endTime = endDateTime[11:16]
            endDate = endDateTime[0:10]

            eventInfo = {
                "summary": (event['summary']),
                "startDate": startDate,
                "startTime": startTime,
                "endDate": endDate,
                "endTime": endTime,
                "desc": (event['description']),
                "location": (event['location']),
                "url": (event['htmlLink'])
            }
            totalEvents.append(eventInfo)
        page_token = events.get('nextPageToken')
        if not page_token:
            return totalEvents
        
def addEvent(summary, startDate, endDate, startTime, endTime, location, eventDetails):
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                './website/credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        #build dateTime strings, time will have to be updated to match daylight savings 
        startDateTime = f'{startDate}' + "T" + f'{startTime}' + ":00-04:00"

        endDateTime = f'{endDate}' + "T" + f'{endTime}' + ":00-04:00"

        service = build('calendar', 'v3', credentials=creds)
        event = {
            'summary': f'{summary}',
            'description': f'{eventDetails}',
            'location': f'{location}',
            'start': {
                #this format 2023-02-16T17:00:00-00:00
                'dateTime': startDateTime,
                'timeZone': 'America/Detroit'
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'America/Detroit'
            }}

        event = service.events().insert(calendarId='primary', body=event).execute()
        pass
    except:
        pass