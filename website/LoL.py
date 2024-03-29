
from flask import render_template, Blueprint
from flask_login import login_required, current_user
from .models import User
from .googCal import pullEvent


#setting up League-specific blueprint for the app
LoL = Blueprint('LoL', __name__)

#routing for League Events
@LoL.route('/LoL')
@login_required
def DULoL():
    return render_template("LoL.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, events=pullEvent())

#routing for League coach information
@LoL.route('/LoLCoach/<int:pid>')
@login_required
def LoLCoach(pid):
    uid = pid
    selectedPlayer = User.query.get(uid)

    return render_template("LoLCoach.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin, player=selectedPlayer)