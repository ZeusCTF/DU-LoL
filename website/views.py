from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from .models import Announcement, User
from . import db



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
    return render_template("LoL.html", user=current_user, acc=current_user.userName)

@views.route('/vods')
@login_required
def vods():
    return render_template("vods.html", user=current_user, acc=current_user.userName)