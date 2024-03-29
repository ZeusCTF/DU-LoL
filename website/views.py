from flask import Blueprint, render_template, request, session, redirect, url_for, jsonify
from flask_login import login_required, current_user
from .models import Announcement, User, Roster
from . import db
from .googCal import pullEvent, addEvent
from .discordBot import send_announcement
import json



#setting up gen blueprint for the app
views = Blueprint('views', __name__)

@views.route('/')
def landing():
    return render_template("landing.html", user=current_user)

#have to be logged in to access the homepage
@views.route('/announcements', methods=['GET','POST'])
@login_required
def announcements():
    if request.method == 'POST':
        announcement = request.form.get('announcementMsg')
        new_announcement = Announcement(data=announcement, team=current_user.playerTeam, authorName=current_user.firstName + " " + current_user.lastName, author=current_user.id)
        db.session.add(new_announcement)
        db.session.commit()

        #discord bot is not working correctly at the moment.  Commenting this out until a solution is found
        #send_announcement(announcement)

    #user=current_user allows us to reference the current user
    return render_template("announcements.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin)

@views.route('/delete-announcements', methods=['POST'])
@login_required
def delete_announcements():
    announcement = json.loads(request.data)
    print(announcement)
    announcementId = announcement['deleteID']
    print(announcementId)
    announcement = Announcement.query.get(announcementId)
    print(announcement)
    if announcement:
        if announcement.author == current_user.id:
            db.session.delete(announcement)
            db.session.commit()

    return jsonify({}) 

@views.route('/roster', methods=['GET', 'POST'])
@login_required
def roster():
    #build coach's roster
    if request.method == 'POST':
        #getting member uid data from the request
        name = request.form.get('rosterName')
        member1 = request.form.get('member1')
        member2 = request.form.get('member2')
        member3 = request.form.get('member3')
        member4 = request.form.get('member4')
        member5 = request.form.get('member5')
        
        #creates a db object to enter into the db
        new_roster = Roster(name=name, member1=member1, member2=member2, member3=member3, member4=member4, member5=member5, coach=current_user.id)
        db.session.add(new_roster)
        db.session.commit()

    #playerIDs in roster
    rosterIDs = []
    #Roster UID's
    rosterUIDs = []
    rosterNames = list()
    #replace hard coded rosterID list with roster tables that have coach name match
    coachRosters = Roster.query.all()
    if coachRosters:
        for roster in coachRosters:
            if(roster.coach == current_user.id):
                rosterNames.append(roster.name)
                rosterUIDs.append(roster.id)

                idList = [roster.member1, roster.member2, roster.member3, roster.member4, roster.member5]
                rosterIDs.append(idList)

    rosterPlayers = list()
    currentRoster = list()
    rosterIndex = 0
    for rostidlist in rosterIDs:
        for id in rostidlist:
            tempPlayer = User.query.get(id)
            player = {
                "id": tempPlayer.id,
                "roster": rosterNames[rosterIndex],
                "rosterID":rosterUIDs[rosterIndex],
                "firstName": tempPlayer.firstName,
                "lastName": tempPlayer.lastName,
                "sumName": tempPlayer.ign,
                "team": tempPlayer.playerTeam
            }
            currentRoster.append(player)
        rosterPlayers.append(currentRoster)
        rosterIndex += 1    
        currentRoster = []

    for name in rosterNames:
        print(name)
    print("test completed")
    #start session to hold roster with player objects
    session['roster_data'] = rosterPlayers
    return render_template("roster.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, rostList=rosterPlayers)

@views.route('/delete-roster', methods=['POST'])
@login_required
def delete_roster():
    roster = json.loads(request.data)
    print(roster)
    rosterId = roster['deleteID']
    print(rosterId)
    roster = Roster.query.get(rosterId)
    print(roster)
    if roster:
        if roster.coach == current_user.id:
            db.session.delete(roster)
            db.session.commit()

    return jsonify({}) 

@views.route('update-user', methods=['POST'])
@login_required
def update_user():
    updateInfo = json.loads(request.data)
    print(updateInfo)
    userId = updateInfo['userId']
    print("userId: " + userId)
    value = updateInfo['newValue']
    print("Value: " + value)
    element = updateInfo['targetElem']
    print("Element: " + element)
    user = User.query.get(userId)
    if user:
        if element == 'isAdmin':
            if not user.userName == 'alee38' or user.userName == 'supersecretadminaccount':
                if value == 'true':
                    value = True
                elif value == 'false':
                    value = False
                user.isAdmin = value
                db.session.commit()
                print("Successfully updated user obj")

    return jsonify({})



@views.route('/LoL')
@login_required
def DULoL():
    return render_template("LoL.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, events=pullEvent())

@views.route('/schedule', methods=['GET','POST'])
@login_required
def schedule():
    if request.method == 'POST':
        summary = request.form.get('summary')
        startDate = request.form.get('startDate')
        endDate = request.form.get('endDate')
        startTime = request.form.get('startTime')
        endTime = request.form.get('endTime')
        location = request.form.get('location')
        eventDetails = request.form.get('eventDetails')
        addEvent(summary, startDate, endDate, startTime, endTime, location, eventDetails)
        return redirect(url_for('views.schedule'))
    else:
        return render_template("schedule.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, events=pullEvent())

@views.route('/profile')
@login_required
def profile():
    if current_user.isAdmin == 1:
        adminUsers = list()
        baseUsers = list()
        allUsers = User.query.all()
        for user in allUsers:
            if user.isAdmin == 0:
                baseUsers.append(user)
            elif user.isAdmin == 1:
                adminUsers.append(user)
        return render_template("profile.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, allusers=allUsers, admins=adminUsers, users=baseUsers)
    return render_template("profile.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin)

@views.route('/contact')
def contact():
    return render_template("contact.html", user=current_user)