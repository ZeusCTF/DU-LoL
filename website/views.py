from flask import Blueprint, render_template, request, session, redirect, url_for
from flask_login import login_required, current_user
from .models import Announcement, User, Roster
from . import db
from .googCal import pullEvent


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
        new_announcement = Announcement(data=announcement, team=current_user.playerTeam)
        db.session.add(new_announcement)
        db.session.commit()
    #user=current_user allows us to reference the current user
    return render_template("announcements.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin)

@views.route('/roster', methods=['GET', 'POST'])
@login_required
def roster():
    #build coach's roster
    if request.method == 'POST':
        #getting member uid data from the request
        member1 = request.form.get('member1')
        member2 = request.form.get('member2')
        member3 = request.form.get('member3')
        member4 = request.form.get('member4')
        member5 = request.form.get('member5')
        
        #creates a db object to enter into the db
        new_roster = Roster(coach=current_user.id, member1=member1, member2=member2, member3=member3, member4=member4, member5=member5)
        db.session.add(new_roster)
        db.session.commit()

    rosterIDs = [2, 2, 1, 1, 1]
    #replace hard coded rosterID list with roster tables that have coach name match
    #coachRost = db.select(Roster.member1, Roster.member2, Roster.member3, Roster.member4, Roster.member5).where(Roster.coach == current_user.id)
    #for member in coachRost:
    #    rosterIDs.append(member.id)
    rosterPlayers = list()
    for pid in rosterIDs:
        tempPlayer = User.query.get(pid)
        player = {
            "id": tempPlayer.id,
            "firstName": tempPlayer.firstName,
            "lastName": tempPlayer.lastName,
            "sumName": tempPlayer.ign,
            "team": tempPlayer.playerTeam
        }
        rosterPlayers.append(player)
    #start session to hold roster with player objects
    session['roster_data'] = rosterPlayers
    return render_template("roster.html", user=current_user, acc=current_user.userName, rost=rosterPlayers)

@views.route('/LoL')
@login_required
def DULoL():
    return render_template("LoL.html", user=current_user, acc=current_user.userName, events=[pullEvent()])

@views.route('/vods')
@login_required
def vods():
    return render_template("vods.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin)

@views.route('/schedule')
@login_required
def schedule():
    return render_template("schedule.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, events=[pullEvent()])

@views.route('/LoLCoach/<int:pid>')
@login_required
def LoLCoach(pid):
    uid = pid
    index = 0
    currentRoster = session.get("roster_data", None)
    for player in currentRoster:
        if player.get(id) == uid:
            break
        else:
            index = index + 1

    return render_template("LoLCoach.html", user=current_user, acc=current_user.userName, player=currentRoster[index-1])