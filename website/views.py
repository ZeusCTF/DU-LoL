from flask import Blueprint, render_template, request, session, redirect, url_for
from flask_login import login_required, current_user
from .models import Announcement, User
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

@views.route('/roster')
@login_required
def roster():
        #replace hard coded rosterID list with roster db column in user
    rosterID = [1, 1, 1, 1, 1]
    roster = list()
    for id in rosterID:
        user = User.query.get(id)
        player = {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "sumName": user.ign,
            "team": user.playerTeam,
        }
        roster.append(player)
    #start session to hold roster with player objects
    session['roster_data'] = roster
    return render_template("roster.html", user=current_user, acc=current_user.userName, rost=roster)

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