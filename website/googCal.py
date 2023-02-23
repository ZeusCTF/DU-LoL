from __future__ import print_function

import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']


def pullEvent():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '/Users/barryallen/CodingProjects/DU-LoL/website/credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)
        # Call the Calendar API
        now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
        print('Getting the upcoming 10 events')
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                              maxResults=10, singleEvents=True,
                                              orderBy='startTime').execute()
        events = events_result.get('items', [])

        if not events:
            
            return 'No upcoming events found.'

        eventList = []

        #https://developers.google.com/calendar/api/v3/reference/events#resource get events
        # Prints the start and name of the next 10 events
        for event in events:
            date = event['start'].get('dateTime', event['start'].get('date'))
            summary = event['summary']
            link = event['htmlLink']
            try:
                location = event['location']
            except:
                location = "unknown location"
            
            try:
                description = event['description']
            except:
                description = "unknown description"

            print("link")
            print(link)
            print(location)
            print(description)


            dateRes = isinstance(date, str)
            sumRes = isinstance(summary, str)

            print(dateRes)
            print(sumRes)

            newEvent = {
                "date": date,
                "sum": summary,
                "desc": description,
                "link": link,
                "location": location
            }

            summary2 = newEvent.get('desc')
            sumRes2 = isinstance(summary2, str)
            print(sumRes2)

            eventList.append(newEvent)

            print(event['summary'], event['start'].get('date'))
            print("Summary: " + summary)
            print("Date: " + date)
            print(eventList)
            return eventList
        
    except HttpError as error:
        print('An error occurred: %s' % error)

def addEvent(summary, startTime, endTime):
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                '/Users/barryallen/CodingProjects/DU-LoL/website/credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)
        event = {
            'summary': f'{summary}',
            'start': {
                'date': f'{startTime}'
            },
            'end': {
                            #this format 2023-02-16T17:00:00-07:00
                'date': f'{endTime}'
            }}

        event = service.events().insert(calendarId='primary', body=event).execute()
        print('Event created: %s' % (event.get('htmlLink')))
    except HttpError as error:
        print('An error occurred: %s' % error)
#addEvent('testycles', '2023-02-16', '2023-02-17')
pullEvent()