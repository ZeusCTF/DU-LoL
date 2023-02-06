from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user
from .models import Announcement, User
from . import db



#setting up gen blueprint for the app
views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
#have to be logged in to access the homepage
@login_required
def index():
    if request.method == 'POST':
        announcement = request.form.get('announcement')
        new_announcement = Announcement(data=announcement, user_id=current_user.id)
        db.session.add(new_announcement)
        db.session.commit()
    #user=current_user allows us to reference the current user
    return render_template("home.html", user=current_user, acc=current_user.userName, adminStatus=current_user.isAdmin)


