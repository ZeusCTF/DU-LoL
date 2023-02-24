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
                'C:/xampp/htdocs/flask testing/client_secret.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)
        # Call the Calendar API
        now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
        print("Current time: " + now)
        print('Getting the upcoming 10 events')
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                              timeMax='2999-01-01T00:00:00Z',
                                              maxResults=10, singleEvents=True,
                                              orderBy='startTime').execute()
        events = events_result.get('items', [])

        if not events:
            
            return 'No upcoming events found.'

        eventList = []

        #https://developers.google.com/calendar/api/v3/reference/events#resource get events
        # Prints the start and name of the next 10 events
        for event in events:
            startDate = event['start'].get('dateTime', event['start'].get('date'))
            beforeYr = startDate[5:]
            year = startDate[0:4]
            dispStartDate = beforeYr + "-" + year

            endDate = event['end'].get('dateTime', event['end'].get('date'))
            beforeYr = endDate[5:]
            year = endDate[0:4]
            endDate = beforeYr + "-" + year

            #summary = title
            title = event['summary']
            link = event['htmlLink']
            try:
                location = event['location']
            except:
                location = "unknown location"
            
            try:
                description = event['description']
            except:
                description = "unknown description"

            try:
                startTime = event['start'].get('dateTime')
                if startTime == "None":
                    startTime = "unknown start time"
            except:
                startTime = "unknown start time"

            try:
                endTime = event['end'].get('dateTime')
                if endTime == "None":
                    endTime = "unknown start time"   
            except:
                endTime = "unknown end time"



            print("link")
            print(link)
            print(location)
            print(description)
            print(startTime)

            newEvent = {
                "startDate": startDate,
                "endDate": endDate,
                "title": title,
                "desc": description,
                "link": link,
                "location": location,
                "startTime": startTime,
                "endTime": endTime
            }

            print("retrieved new event:")
            print(newEvent)

            eventList.append(newEvent)

        print("Finished event list:")    
        print(eventList)
        return eventList
        
    except HttpError as error:
        print('An error occurred: %s' % error)

def addEvent(newEvent):

    print("googCal Add Event Call")

    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'C:/xampp/htdocs/flask testing/client_secret.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('calendar', 'v3', credentials=creds)

        summary = newEvent.get('title')
        startDate = newEvent.get('startDate')
        endDate = newEvent.get('endDate')
        startTime = newEvent.get('startTime')
        endTime = newEvent.get('endTime')
        location = newEvent.get('location')
        eventDetails = newEvent.get('eventDetails')

        print("string testing")
        monthDay = startDate[5:]
        year = startDate[0:5]

        startDateTime = year + monthDay + "T" + startTime + ":00-07:00"
        print(startDate)

        monthDay = endDate[5:]
        year = endDate[0:5]

        endDateTime = year + monthDay + "T" + endTime + ":00-07:00"

        print(endDate)
        print(startTime)
        print(endTime)
        print(startDateTime)

        event = {
            'summary': summary,
            'location': location,
            'description': eventDetails,
            'start': {
                'dateTime': startDateTime,
            },
            'end': {
                'dateTime': endDateTime,
            }
        }


        event = service.events().insert(calendarId='primary', body=event).execute()
        print('Event created: %s' % (event.get('htmlLink')))
    except HttpError as error:
        print('An error occurred: %s' % error)
#addEvent('testycles', '2023-02-16', '2023-02-17')
pullEvent()